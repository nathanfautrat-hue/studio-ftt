/* Rive Bowl · tout ce qui rend le site « vivant », sans librairie (mécanique relevée sur cravburgers.shop, cf.
   G:/Studio FTT/CRM/rive-bowl-docs/analyse-animations-crav.md) :
   1. titres qui arrivent mot par mot (taille 0, penchés, gros rebond) ; 2. tampons et étiquettes en texte qui « poppent » ;
   3. ingrédients qui volent autour du grand titre au défilement ; 4. bowl qui se compose au défilement ;
   5. ingrédients qui se baladent sur un chemin en pointillés ; 6. titre de l'onglet qui change.
   Filet de sécurité : rien n'est caché tant que ce script n'a pas tourné, et « réduire les animations » montre tout, immobile.
   Studio FTT, 06/11/2026. */
(function () {
  'use strict';

  /* ================= RÉGLAGES (repris de CRAV, à ajuster ici) ================= */
  var MOTS = { retard: 55, depuisBas: [18, 40], rotation: 16 };     // ms entre deux mots, décalage vertical (px), rotation max (°)
  var LETTRES = { retard: 30 };                                     // ms entre deux lettres (titres en lettres)
  var SEUIL_TITRES = '0px 0px -12% 0px';                           // le titre part quand son haut atteint 88 % de l'écran
  var SEUIL_AUTOCOLLANTS = '0px 0px -30% 0px';                     // 70 % de l'écran
  var ONGLET = ['On prépare…', 'On découpe…', 'On compose…', 'On sert…', 'Bon appétit !'];
  var ONGLET_VITESSE = 1500;                                        // ms (CRAV : 800 ms)
  /* ============================================================================ */

  var reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var racine = document.documentElement;
  if (!('IntersectionObserver' in window)) return;
  racine.classList.add('vivant');                                   // les états de départ ne s'appliquent qu'avec cette classe

  // GSAP (cdnjs, balises defer) : s'il est là, les parties animées passent par lui (bloc « VERSION GSAP » en bas du fichier)
  var G = !reduit && !!(window.gsap && window.ScrollTrigger && window.SplitText);
  var animsGsap = [];
  if (G) { gsap.registerPlugin(ScrollTrigger, SplitText); racine.classList.add('gsap'); }

  /* Garde-temps : rien ne doit rester caché si l'animation ne démarre pas (onglet ouvert en arrière-plan, aperçu de lien,
     économie d'énergie : requestAnimationFrame et l'horloge de GSAP s'arrêtent). Toutes les 200 ms, en setTimeout :
     un élément du 1er écran encore caché après 600 ms, ou un titre plus bas resté caché 1 s après son arrivée à l'écran,
     est affiché en entier, sans animation. Le garde s'arrête tout seul quand tout est affiché. */
  var gardes = [], minuteurGarde = null, depart = Date.now();
  function garde(el, forcer, fini) {
    if (!el) return;
    var r = el.getBoundingClientRect();
    gardes.push({ el: el, forcer: forcer, fini: fini, premier: r.top < window.innerHeight && r.bottom > 0, vu: 0 });
    if (!minuteurGarde) minuteurGarde = setTimeout(verifierGardes, 200);
  }
  function verifierGardes() {
    var h = window.innerHeight, maintenant = Date.now();
    gardes = gardes.filter(function (g) {
      try { if (g.fini && g.fini()) return false; } catch (e) {}
      if (g.premier) { if (maintenant - depart < 600) return true; }
      else {
        var r = g.el.getBoundingClientRect(), dedans = r.bottom > 0 && r.top < h;
        if (!dedans) { g.vu = 0; return true; }
        if (!g.vu) { g.vu = maintenant; return true; }
        if (maintenant - g.vu < 1000) return true;
      }
      try { g.forcer(); } catch (e) {}
      return false;
    });
    minuteurGarde = gardes.length ? setTimeout(verifierGardes, 200) : null;
  }
  // les animations CSS du 1er écran (photos en éventail…) : si elles n'avancent pas, on les termine
  if (!reduit) document.querySelectorAll('.eventail img').forEach(function (img) {
    garde(img, function () { img.getAnimations().forEach(function (a) { a.finish(); }); },
      function () { return img.getAnimations().every(function (a) { return a.playState === 'finished' || a.currentTime > 200; }); });
  });

  function hasard(a, b) { return a + Math.random() * (b - a); }
  function unefois(el, marge, fn) {
    var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); fn(); } }, { rootMargin: marge });
    io.observe(el);
  }

  /* ---------- 1. Titres mot par mot (ou lettre par lettre avec data-vivant="lettres") ---------- */
  function decouper(el, parLettre) {
    // on découpe seulement les nœuds de texte : les balises internes (mot manuscrit, em, br) restent en place
    var n = 0, marcheur = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), textes = [];
    while (marcheur.nextNode()) textes.push(marcheur.currentNode);
    textes.forEach(function (t) {
      // on ne coupe QUE sur les espaces normales : l'espace insécable garde « ! ? : ; » collés au mot d'avant (jamais seuls sur une ligne)
      var morceaux = parLettre ? Array.from(t.nodeValue) : t.nodeValue.split(/([ \t\n\r]+)/);
      var frag = document.createDocumentFragment();
      morceaux.forEach(function (m) {
        if (!m) return;
        if (/^\s+$/.test(m)) { frag.appendChild(document.createTextNode(m)); return; }
        var s = document.createElement('span');
        s.className = 'mot';
        s.textContent = m;
        s.style.setProperty('--d', (n * (parLettre ? LETTRES.retard : MOTS.retard)) + 'ms');
        s.style.setProperty('--y', hasard(MOTS.depuisBas[0], MOTS.depuisBas[1]).toFixed(0) + 'px');
        s.style.setProperty('--r', hasard(-MOTS.rotation, MOTS.rotation).toFixed(1) + 'deg');
        frag.appendChild(s); n++;
      });
      t.parentNode.replaceChild(frag, t);
    });
    return n;
  }
  /* La taille des grands titres s'adapte : si un mot est plus large que la colonne (ex. « restaurant » à 320 px),
     on réduit le titre jusqu'à ce qu'il tienne, sans jamais le couper. Marche aussi sans animation. */
  var grands = [].slice.call(document.querySelectorAll('.t-l, .t-xl, .t-case'));
  function ajuster() {
    grands.forEach(function (el) {
      el.style.fontSize = '';
      var ow = el.style.overflowWrap; el.style.overflowWrap = 'normal';
      var taille = parseFloat(getComputedStyle(el).fontSize), essais = 0;
      while (el.scrollWidth > el.clientWidth + 1 && taille > 22 && essais < 30) { taille *= 0.94; el.style.fontSize = taille.toFixed(1) + 'px'; essais++; }
      el.style.overflowWrap = ow;
    });
  }
  var titres = document.querySelectorAll('.t-l, .t-xl, [data-vivant]');
  var hautEcran = window.innerHeight;
  titres.forEach(function (el) {
    if (el.closest('.tiroir, .fiche, .une')) return;              // le carrousel anime ses titres lui-même (plus bas)
    if (reduit || G) return;
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    decouper(el, el.getAttribute('data-vivant') === 'lettres');
    el.classList.add('mots-attente');
    // titre déjà à l'écran au chargement : il rebondit tout de suite et il est entièrement visible en moins de 0,3 s
    if (el.getBoundingClientRect().top < hautEcran) {
      el.querySelectorAll('.mot').forEach(function (m, n) { m.style.setProperty('--d', Math.min(n * 25, 100) + 'ms'); });
      void el.offsetWidth;
      el.classList.add('mots-partis');
      var derniers = el.querySelectorAll('.mot');
      garde(el, function () { derniers.forEach(function (m) { m.style.transition = 'none'; }); },
        function () { return !derniers.length || getComputedStyle(derniers[derniers.length - 1]).opacity === '1'; });
      return;
    }
    unefois(el, SEUIL_TITRES, function () { el.classList.add('mots-partis'); });
    garde(el, function () { el.querySelectorAll('.mot').forEach(function (m) { m.style.transition = 'none'; }); el.classList.add('mots-partis'); },
      function () { return el.classList.contains('mots-partis'); });
  });
  ajuster();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajuster);
  var largeurAjustee = window.innerWidth;
  window.addEventListener('resize', function () { if (window.innerWidth !== largeurAjustee) { largeurAjustee = window.innerWidth; ajuster(); } });
  // les titres du carrousel : ils rebondissent à chaque changement de photo
  var une = document.querySelector('.une');
  if (une && !reduit) {
    une.querySelectorAll('.diapo .t').forEach(function (t) { t.setAttribute('aria-label', t.textContent.replace(/\s+/g, ' ').trim()); decouper(t, false); t.classList.add('mots-attente'); });
    new MutationObserver(function (liste) {
      liste.forEach(function (m) {
        var d = m.target;
        if (!d.classList || !d.classList.contains('diapo')) return;
        var t = d.querySelector('.t');
        if (!t) return;
        if (d.classList.contains('actif')) { t.classList.remove('mots-partis'); void t.offsetWidth; t.classList.add('mots-partis'); }
      });
    }).observe(une, { subtree: true, attributes: true, attributeFilter: ['class'] });
    var premier = une.querySelector('.diapo.actif .t');
    if (premier) requestAnimationFrame(function () { premier.classList.add('mots-partis'); });
  }

  /* ---------- 2. Tampons (sur-titres) et étiquettes en texte (.badge-texte) : « pop » penché, en quinconce ---------- */
  if (!reduit) {
    document.querySelectorAll('.sur, .etiquette span, .badge-texte').forEach(function (el) {
      if (el.closest('.tiroir, .fiche')) return;
      el.style.setProperty('--r0', hasard(-15, 15).toFixed(1) + 'deg');
      el.classList.add('tampon-attente');
      unefois(el, SEUIL_AUTOCOLLANTS, function () { el.classList.add('tampon-parti'); });
      garde(el, function () { el.style.transition = 'none'; el.classList.add('tampon-parti'); }, function () { return el.classList.contains('tampon-parti'); });
    });
  }

  /* ---------- outil commun : avancement d'une section pendant le défilement (0 → 1), sans écouteur de scroll ---------- */
  var paliers = []; for (var k = 0; k <= 100; k++) paliers.push(k / 100);
  function suivre(el, fn) {
    var raf = 0;
    function calcul() {
      raf = 0;
      var r = el.getBoundingClientRect(), h = window.innerHeight;
      var p = (h - r.top) / (r.height + h);                       // 0 quand la section entre par le bas, 1 quand elle sort par le haut
      fn(Math.min(1, Math.max(0, p)));
    }
    new IntersectionObserver(function () { if (!raf) raf = requestAnimationFrame(calcul); }, { threshold: paliers }).observe(el);
    // l'observateur ne se déclenche qu'aux paliers de visibilité : pour une section plus haute que l'écran, on relance aussi pendant le défilement
    if (true) {                                                   // (aussi pour les blocs plus petits que l'écran : sinon plus rien ne bouge quand ils sont entièrement visibles)
      var dedans = false;
      new IntersectionObserver(function (e) { dedans = e[0].isIntersecting; if (dedans) boucle(); }).observe(el);
      var y = -1;
      function boucle() { if (!dedans) return; if (window.scrollY !== y) { y = window.scrollY; calcul(); } requestAnimationFrame(boucle); }
    }
    calcul();
  }

  /* ---------- 3. Ingrédients qui volent autour du grand titre (seuils comme CRAV : ils poppent puis repartent si on remonte) ---------- */
  document.querySelectorAll('.envolee').forEach(function (sec) {
    var ing = [].slice.call(sec.querySelectorAll('.ingredient'));
    if (reduit) { ing.forEach(function (i) { i.classList.add('la'); }); return; }
    sec.classList.add('envolee--vivante');
    ing.forEach(function (i) { i.style.setProperty('--r0', hasard(-15, 15).toFixed(1) + 'deg'); i.style.setProperty('--r1', hasard(-12, 12).toFixed(1) + 'deg'); });
    suivre(sec, function (p) {
      ing.forEach(function (i, n) {
        var seuil = 0.12 + n * (0.5 / ing.length);                // de 12 % à 62 % de l'avancement
        i.classList.toggle('la', p > seuil);
      });
    });
  });

  /* ---------- 3 bis. Le grand bowl du bloc sapin grossit un peu au défilement (0,9 → 1,08) ---------- */
  document.querySelectorAll('.faits').forEach(function (sec) {
    var bol = sec.querySelector('.faits__bol');
    if (!bol || reduit || G) return;
    suivre(sec, function (p) { bol.style.setProperty('--echelle', (0.9 + 0.18 * p).toFixed(3)); });
  });

  /* ---------- 4. Le bowl qui se compose au défilement (présentation, rien à cliquer) ---------- */
  document.querySelectorAll('.compose').forEach(function (sec) {
    var couches = [].slice.call(sec.querySelectorAll('.compose__couche')), etapes = [].slice.call(sec.querySelectorAll('.compose__etapes li'));
    if (reduit) { couches.forEach(function (c) { c.classList.add('la'); }); etapes.forEach(function (e) { e.classList.add('faite'); }); sec.classList.add('compose--fini'); return; }
    sec.classList.add('compose--vivant');
    suivre(sec.querySelector('.compose__piste') || sec, function (p) {
      // la piste fait plusieurs écrans de haut : la scène reste collée pendant que les couches tombent
      var q = Math.min(1, Math.max(0, (p - 0.18) / 0.62));
      couches.forEach(function (c) { c.classList.toggle('la', q >= parseFloat(c.dataset.a || 0)); });
      var actif = -1;
      etapes.forEach(function (e, n) { var a = parseFloat(e.dataset.a || 0); e.classList.toggle('faite', q >= a); if (q >= a) actif = n; });
      etapes.forEach(function (e, n) { e.classList.toggle('en-cours', n === actif); });
      sec.classList.toggle('compose--fini', q >= 0.98);
    });
  });

  /* ---------- 4 bis. « Une histoire dans chaque couche » : sans GSAP, le bowl est simplement là (le mouvement est dans la version GSAP) ---------- */

  /* ---------- 4 ter. « À emporter » : la piste de cartes glisse vers la gauche pendant qu'on descend ---------- */
  document.querySelectorAll('.emporter').forEach(function (sec) {
    if (reduit || G) return;
    var piste = sec.querySelector('.emporter__piste'), fenetre = sec.querySelector('.emporter__fenetre');
    sec.classList.add('emporter--vif');
    var course = 0;
    function mesurer() { course = Math.max(0, piste.scrollWidth - fenetre.clientWidth); }
    mesurer();
    if (window.ResizeObserver) new ResizeObserver(mesurer).observe(fenetre);
    suivre(sec, function () {
      // 0 quand le haut du bloc arrive au milieu de l'écran (la 1re carte est bien vue), 1 quand le bloc est presque passé
      var r = sec.getBoundingClientRect();
      var t = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / (r.height * 0.9)));
      piste.style.setProperty('--x', (-course * t).toFixed(1) + 'px');
    });
  });

  /* ---------- 4 quinquies. Dernier appel : le grand bowl grossit doucement (0,85 → 1,1) ---------- */
  document.querySelectorAll('.dernier__bol').forEach(function (bol) {
    if (reduit || G) return;
    suivre(bol.parentNode, function (p) { bol.style.setProperty('--echelle', (0.85 + 0.25 * p).toFixed(3)); });
  });

  /* ---------- 4 sexies. Pied de page : 4 ingrédients détourés tombent sur « RIVE BOWL » ---------- */
  var marque = document.querySelector('.pied__marque'), tombes = null;   // (plus d'ingrédients sur RIVE BOWL : retour de Nathan du 06/11)

  /* ---------- 5. Les ingrédients qui se baladent sur le chemin en pointillés ---------- */
  document.querySelectorAll('.trajet').forEach(function (sec) {
    var liste = sec.querySelector('.trajet__etapes'), etapes = [].slice.call(sec.querySelectorAll('.trajet__etapes li'));
    var svg = sec.querySelector('.trajet__chemin'), trace = svg && svg.querySelector('path.trace'), fait = svg && svg.querySelector('path.fait');
    var vehicules = [].slice.call(sec.querySelectorAll('.trajet__vehicule'));
    if (!liste || !svg || !trace) return;
    var L = 0, points = [];
    function dessiner() {
      var b = liste.getBoundingClientRect(), W = b.width, H = b.height;
      var tel = W < 700;
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      // le chemin serpente entre les étapes : à gauche puis à droite sur ordinateur, le long du bord gauche sur téléphone
      points = etapes.map(function (e, n) {
        var r = e.getBoundingClientRect();
        var y = r.top - b.top + r.height / 2;
        var x = tel ? 26 : (n % 2 === 0 ? W * 0.5 + 60 : W * 0.5 - 60);   // le chemin passe juste à côté de chaque carte
        return [x, y];
      });
      var d = 'M' + points[0][0] + ' ' + Math.max(0, points[0][1] - 60);
      var px = points[0][0], py = Math.max(0, points[0][1] - 60);
      points.forEach(function (pt) {
        var my = (py + pt[1]) / 2, ecart = tel ? 22 : 0;
        // grandes courbes en S : tangente verticale en haut et en bas de chaque virage
        d += ' C' + (px + ecart) + ' ' + my + ' ' + (pt[0] - ecart) + ' ' + my + ' ' + pt[0] + ' ' + pt[1];
        px = pt[0]; py = pt[1];
      });
      trace.setAttribute('d', d); fait.setAttribute('d', d);
      L = trace.getTotalLength();
      fait.style.strokeDasharray = L + ' ' + L;
      // à quelle longueur du chemin se trouve chaque étape (pour la faire apparaître quand les ingrédients passe)
      etapes.forEach(function (e, n) {
        var lo = 0, hi = L, cible = points[n][1];
        for (var i = 0; i < 24; i++) { var mid = (lo + hi) / 2; if (trace.getPointAtLength(mid).y < cible) lo = mid; else hi = mid; }
        e.dataset.l = lo;
      });
    }
    function placer(t) {
      // les ingrédients se suivent en file indienne et roulent un peu en avançant
      var ecart = Math.min(80, L / 12), tete = L * t;
      vehicules.forEach(function (v, k) {
        var l = tete - k * ecart;
        if (l <= 0) { v.style.opacity = '0'; return; }
        var p = trace.getPointAtLength(Math.min(L, l));
        v.style.opacity = '1';
        v.style.transform = 'translate(' + p.x.toFixed(1) + 'px,' + p.y.toFixed(1) + 'px) translate(-50%,-50%) rotate(' + (l * 0.6).toFixed(1) + 'deg)';
      });
      fait.style.strokeDashoffset = L - tete;
      etapes.forEach(function (e) { e.classList.toggle('la', tete >= parseFloat(e.dataset.l) - 30); });
    }
    dessiner();
    if (window.ResizeObserver) new ResizeObserver(function () { dessiner(); }).observe(liste);
    if (reduit) { placer(1); sec.classList.add('trajet--fini'); return; }
    sec.classList.add('trajet--vivant');
    if (G) {
      animsGsap.push(function () {
        var etat = { t: 0 }, loin = 0;
        placer(0);
        ScrollTrigger.create({ trigger: liste, start: 'top 85%', end: 'bottom 45%', onUpdate: function (s) {
          if (s.progress <= loin) return;
          loin = s.progress;
          gsap.to(etat, { t: loin, duration: 0.6, ease: 'power2.out', overwrite: true, onUpdate: function () { placer(etat.t); } });
        } });
        garde(liste, function () { placer(1); }, function () { return loin > 0; });
      });
      return;
    }
    suivre(liste, function (p) { placer(Math.min(1, Math.max(0, (p - 0.15) / 0.6))); });
  });

  /* ---------- 7. Vagues vivantes entre les sections (mécanique CRAV « jelly ») ----------
     Entre deux blocs de couleurs différentes, une vague SVG remplace le trait droit. Ses points ondulent doucement,
     elle s'étire quand on défile (×1,5 sur ordinateur, ×1,2 sur téléphone) puis revient en place avec un petit rebond.
     Chaque vague a sa propre forme. L'animation ne tourne que si la vague est à l'écran. */
  var VAGUE = { haut: 26, hautTel: 16, etirement: 1.5, etirementTel: 1.2, vitesse: 0.0009 };
  var principal = document.querySelector('main');
  var blocs = [];
  if (principal) {
    [].forEach.call(principal.children, function (e) { if (e.offsetHeight > 40 && !/^(P|SPAN|A)$/.test(e.tagName)) blocs.push(e); });
    var suite = principal.nextElementSibling;
    while (suite) { if (suite.offsetHeight > 20 && !/SCRIPT|DIALOG/.test(suite.tagName)) blocs.push(suite); suite = suite.nextElementSibling; }
  }
  var fondPage = getComputedStyle(document.body).backgroundColor;
  function sansCouleur(e) { return e.hasAttribute('data-soie') || e.matches('.une, .p-une, .fr-une, .mj-une'); }
  function couleur(e) {
    var c = getComputedStyle(e).backgroundColor;
    return (!c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent') ? fondPage : c;
  }
  var vagues = [];
  function graine(n) { var x = Math.sin(n * 91.7 + 13.1) * 43758.5453; return x - Math.floor(x); }
  function creerVague(hote, teinte, enHaut, n) {
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg'), p = document.createElementNS(ns, 'path');
    svg.setAttribute('class', 'vague-vive ' + (enHaut ? 'vague-vive--haut' : 'vague-vive--bas'));
    svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('preserveAspectRatio', 'none');
    p.setAttribute('fill', teinte); svg.appendChild(p);
    var cs = getComputedStyle(hote);
    if (cs.position === 'static') hote.style.position = 'relative';
    // la vague ne doit jamais recouvrir un texte : le bloc garde au moins sa hauteur + une marge de ce côté
    var besoin = (window.innerWidth < 861 ? VAGUE.hautTel : VAGUE.haut) * 1.5 + 16;
    if (enHaut && parseFloat(cs.paddingTop) < besoin) hote.style.paddingTop = besoin + 'px';
    if (!enHaut && parseFloat(cs.paddingBottom) < besoin) hote.style.paddingBottom = besoin + 'px';
    hote.appendChild(svg);
    var crêtes = 3 + Math.floor(graine(n) * 4);                      // de 3 à 6 crêtes : chaque vague a sa forme
    var pts = []; for (var i = 0; i <= crêtes * 2; i++) pts.push({ ph: graine(n * 7 + i) * 6.28, v: 0.6 + graine(n * 3 + i) * 0.8, a: 0.55 + graine(n * 5 + i) * 0.45 });
    var v = { svg: svg, p: p, pts: pts, enHaut: enHaut, s: 1, vs: 0, vue: false };
    new IntersectionObserver(function (e) {
      v.vue = e[0].isIntersecting;
      if (v.vue) relancer(); else if (!G) { v.s = 1; v.vs = 0; svg.style.transform = ''; }   // hors écran : elle reprend sa forme de repos
    }).observe(svg);
    vagues.push(v); return v;
  }
  function dessinerVague(v, t) {
    var tel = window.innerWidth < 861, H = tel ? VAGUE.hautTel : VAGUE.haut, W = 1000, n = v.pts.length - 1, ys = [];
    for (var i = 0; i <= n; i++) {
      var q = v.pts[i], creux = i % 2 === 0;                         // alternance creux / crête, chaque point respire un peu
      var y = (creux ? 0.78 : 0.22) * H + Math.sin(t * VAGUE.vitesse * q.v + q.ph) * H * 0.16 * q.a;
      ys.push(y);
    }
    // courbe lisse qui passe par tous les points (Catmull-Rom → Bézier)
    var X = function (i) { return i * W / n; }, d = 'M0 ' + ys[0].toFixed(1);
    for (var j = 0; j < n; j++) {
      var y0 = ys[Math.max(0, j - 1)], y1 = ys[j], y2 = ys[j + 1], y3 = ys[Math.min(n, j + 2)];
      d += ' C' + (X(j) + W / n / 6).toFixed(1) + ' ' + (y1 + (y2 - y0) / 6).toFixed(1) + ' ' + (X(j + 1) - W / n / 6).toFixed(1) + ' ' + (y2 - (y3 - y1) / 6).toFixed(1) + ' ' + X(j + 1).toFixed(1) + ' ' + y2.toFixed(1);
    }
    // vague du haut : on remplit au-dessus de la courbe (couleur du bloc d'avant) ; vague du bas : en dessous (couleur du bloc d'après)
    d += v.enHaut ? ' L' + W + ' 0 L0 0 Z' : ' L' + W + ' ' + H + ' L0 ' + H + ' Z';
    v.svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    v.svg.style.height = H + 'px';
    v.p.setAttribute('d', d);
  }
  if (blocs.length > 1) {
    // l'ancienne vague figée (celle qui s'affiche sans JS) ne sert plus : on la retire AVANT de poser les vagues vivantes
    document.querySelectorAll('.vague').forEach(function (e) { e.classList.remove('vague'); });
    for (var b = 1; b < blocs.length; b++) {
      var A = blocs[b - 1], B = blocs[b];
      var cA = sansCouleur(A) ? null : couleur(A), cB = sansCouleur(B) ? null : couleur(B);
      if (cA && cB && cA === cB) continue;                            // même couleur : pas de bord à cacher
      if (cB) creerVague(A, cB, false, b);                           // la couleur du bloc suivant monte en vague dans le bas du bloc courant
      else if (cA) creerVague(B, cA, true, b);                       // bloc suivant en photo ou en soie : la couleur du bloc courant descend en vague dans son haut
      else { A.classList.add('bord-rond-bas'); B.classList.add('bord-rond-haut'); }
    }
    vagues.forEach(function (v) { dessinerVague(v, 0); });
  }

  /* ---------- 8. Photos et cartes légèrement penchées qui suivent le défilement ---------- */
  var flottants = [].slice.call(document.querySelectorAll('.duo__img, .fr-split__img, .damier__photo, .cat__photo, .attentes__bol, .grille li'));
  flottants.forEach(function (e, n) {
    var r = (n % 2 ? 1 : -1) * (1 + graine(n + 40) * 2);           // de 1° à 3°, un sur deux dans l'autre sens
    e.style.setProperty('--penche', r.toFixed(2) + 'deg');
    e.classList.add('penche');
    e._vue = false;
    new IntersectionObserver(function (x) { e._vue = x[0].isIntersecting; if (e._vue) relancer(); }).observe(e);
  });

  /* ---------- boucle commune : ne tourne que si une vague ou une photo est à l'écran ---------- */
  var tourne = false, yPrec = window.scrollY, tPrec = performance.now();
  function relancer() { if (G) return; if (!reduit && !tourne) { tourne = true; tPrec = performance.now(); requestAnimationFrame(boucleVivante); } }
  function boucleVivante(t) {
    var dt = Math.max(1, t - tPrec); tPrec = t;
    var dy = window.scrollY - yPrec; yPrec = window.scrollY;
    var vitesse = Math.min(1, Math.abs(dy) / dt / 2.5);               // 0 à l'arrêt, 1 quand on défile vite
    var tel = window.innerWidth < 861, max = tel ? VAGUE.etirementTel : VAGUE.etirement;
    var actif = false;
    vagues.forEach(function (v) {
      if (!v.vue) return; actif = true;
      var cible = 1 + (max - 1) * vitesse;
      v.vs += (cible - v.s) * 0.18; v.vs *= 0.72; v.s += v.vs;        // ressort : s'étire puis revient avec un petit rebond
      v.svg.style.transform = 'scaleY(' + Math.max(0.85, v.s).toFixed(3) + ')';
      dessinerVague(v, t);
    });
    var h = window.innerHeight;
    flottants.forEach(function (e) {
      if (!e._vue) return; actif = true;
      var r = e.getBoundingClientRect(), centre = (r.top + r.height / 2 - h / 2) / h;     // -0,5 en haut de l'écran, +0,5 en bas
      e.style.transform = 'translate3d(0,' + (centre * -18).toFixed(1) + 'px,0) rotate(calc(var(--penche) + ' + (centre * 1.5).toFixed(2) + 'deg))';
    });
    if (actif) requestAnimationFrame(boucleVivante); else tourne = false;
  }
  if (!reduit) relancer();

  /* ---------- 9. Un petit picto SVG qui « poppe » au bout d'un titre (un seul par page, aucune illustration) ---------- */
  var PICTOS = [
    '<svg viewBox="0 0 40 40"><path d="M20 3c1.6 9 4 11.4 13 13-9 1.6-11.4 4-13 13-1.6-9-4-11.4-13-13 9-1.6 11.4-4 13-13z"/></svg>',        // étoile
    '<svg viewBox="0 0 40 40"><path d="M8 30 18 22M14 10l8 10M30 8l-4 12" stroke-width="5" stroke-linecap="round" fill="none"/></svg>', // éclats
    '<svg viewBox="0 0 40 40"><path d="M4 18c5-6 9-6 14 0s9 6 14 0M4 28c5-6 9-6 14 0s9 6 14 0" stroke-width="4.5" stroke-linecap="round" fill="none"/></svg>' // vague
  ];
  var pictoPose = false;
  [].slice.call(document.querySelectorAll('main .t-l')).forEach(function (t) {
    if (pictoPose || t.closest('.duo, .fr-split, .une, .envolee')) return;   // un seul picto par page, jamais dans un bloc d'images
    pictoPose = true;
    var p = document.createElement('span');
    p.className = 'picto'; p.setAttribute('aria-hidden', 'true');
    p.innerHTML = PICTOS[location.pathname.length % PICTOS.length];
    t.appendChild(p);
    if (reduit) return;
    p.style.setProperty('--r0', hasard(-25, 25).toFixed(1) + 'deg');
    p.classList.add('tampon-attente');
    unefois(t, SEUIL_TITRES, function () { setTimeout(function () { p.classList.add('tampon-parti'); }, 380); });
    garde(t, function () { p.style.transition = 'none'; p.classList.add('tampon-parti'); }, function () { return p.classList.contains('tampon-parti'); });
  });

  /* ---------- 10. Chargement et passage entre les pages (mécanique relevée dans le code de CRAV) ----------
     • 1re page de la visite seulement (sessionStorage) : le bowl se monte sur fond sapin (bol, riz, saumon, avocat, edamame,
       « Prêt ! »), puis l'écran se lève avec un bord en dôme. 1,6 s au total.
     • Ensuite, au clic sur un lien interne : 3 rideaux en dôme (sapin, jaune, corail) montent, « On compose… » au centre,
       la page suivante s'ouvre et les rideaux repartent vers le haut. Environ 1,2 s.
     Rien avec « réduire les animations ». Un petit script dans le <head> couvre l'écran avant le 1er affichage
     (classe premier ou arrivee) ; une animation CSS de secours le découvre seule si ce fichier ne se charge pas. */
  function memoire(cle, valeur) { try { if (valeur === undefined) return sessionStorage.getItem(cle); if (valeur === null) sessionStorage.removeItem(cle); else sessionStorage.setItem(cle, valeur); } catch (e) { return null; } }
  if (!reduit) {
    var COULEURS = ['sapin', 'jaune', 'corail'];
    var rideaux = document.createElement('div');
    rideaux.className = 'rideaux'; rideaux.setAttribute('aria-hidden', 'true');
    rideaux.innerHTML = COULEURS.map(function (c) { return '<span class="rideau rideau--' + c + '"></span>'; }).join('') + '<p class="rideaux__texte">On compose…</p>';
    document.body.appendChild(rideaux);

    if (racine.classList.contains('premier')) {
      var chargement = document.createElement('div');
      chargement.className = 'chargement'; chargement.setAttribute('aria-hidden', 'true');
      // le bowl dessiné à la main façon CRAV (06/11) : bol, riz en dôme, crudités, saumon, avocat, mangue, edamame, sésame ; le bord avant du bol passe devant
      chargement.innerHTML = '<svg class="chargement__bol" viewBox="0 0 400 356" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g class="p-bol"><ellipse cx="200" cy="338" rx="66" ry="11" fill="#E6D8C0" stroke="#022E21" stroke-width="4.5"/><path d="M22 172 C22 280 108 336 200 336 C292 336 378 280 378 172 Z" fill="#FDF8F2"/><clipPath id="rb-cb"><path d="M22 172 C22 280 108 336 200 336 C292 336 378 280 378 172 Z"/></clipPath><g clip-path="url(#rb-cb)"><path d="M10 238 C80 296 320 296 390 238 L390 264 C320 322 80 322 10 264Z" fill="#03A9B5"/><path d="M10 238 C80 296 320 296 390 238" fill="none" stroke="#022E21" stroke-width="3"/><path d="M10 264 C80 322 320 322 390 264" fill="none" stroke="#022E21" stroke-width="3"/><path d="M378 172 C378 280 292 336 200 336 C280 318 346 262 356 178 Z" fill="#022E21" opacity=".15"/></g><path d="M22 172 C22 280 108 336 200 336 C292 336 378 280 378 172 Z" fill="none" stroke="#022E21" stroke-width="4.5" stroke-linejoin="round"/><path d="M50 222 C60 262 90 294 126 310" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".9"/><ellipse cx="200" cy="172" rx="178" ry="66" fill="#F3E7D3" stroke="#022E21" stroke-width="4.5"/><ellipse cx="200" cy="174" rx="160" ry="55" fill="#CDBB9C" stroke="#022E21" stroke-width="3"/></g><g class="p-riz"><path d="M40 178 C42 104 118 50 200 50 C282 50 358 104 360 178 C342 216 280 232 200 232 C120 232 58 216 40 178Z" fill="#FBF7EE"/><clipPath id="rb-cr"><path d="M40 178 C42 104 118 50 200 50 C282 50 358 104 360 178 C342 216 280 232 200 232 C120 232 58 216 40 178Z"/></clipPath><g clip-path="url(#rb-cr)"><path d="M70 236 C210 230 330 200 362 120 L372 240 L60 240Z" fill="#E8E0CF"/></g><g clip-path="url(#rb-cr)" stroke="#D8CEBA" stroke-width="3.4" stroke-linecap="round"><path d="M182.9 150 L189.3 153.6"/><path d="M198.8 157.7 L205.8 154.9"/><path d="M234.9 191.7 L241 188.4"/><path d="M77.5 192.1 L83.5 193.5"/><path d="M336.9 217.5 L344.7 219"/><path d="M96.9 62.4 L103.1 62.6"/><path d="M106.4 101.7 L112.6 97.7"/><path d="M178.7 198.1 L186.6 198.3"/><path d="M196.5 168.8 L203.3 168.5"/><path d="M341.6 221.7 L349 224.9"/><path d="M143.1 98.5 L149.1 96.9"/><path d="M274.5 124.2 L281 127.1"/><path d="M331 200.9 L336.5 197.1"/><path d="M316.8 135.1 L322.8 139.1"/><path d="M72.1 162.1 L78.5 164.4"/><path d="M76 112.3 L82.9 116.8"/><path d="M85.7 101.9 L91.2 99"/><path d="M283.1 88.9 L290.4 89.4"/><path d="M106.1 181.8 L113.2 178.3"/><path d="M84.8 130.2 L91.2 127.8"/><path d="M333.3 192.8 L341.7 190.7"/><path d="M111.9 123 L119.1 126.3"/><path d="M80.1 223.4 L86.5 221.1"/><path d="M276.6 114.7 L282.6 113.2"/><path d="M76.6 156.8 L84 154.4"/><path d="M159.4 132.3 L165.7 136.3"/><path d="M218.8 203.3 L224.8 200.9"/><path d="M316.1 195.1 L322.4 193.1"/><path d="M265.8 215.8 L274 212.6"/><path d="M308.5 159.3 L314.7 158.7"/><path d="M61.4 219.2 L69.2 216.6"/><path d="M125.6 194.7 L132.5 195.5"/><path d="M102.3 179.8 L108.1 176.5"/><path d="M213.9 199.3 L220.7 200.3"/><path d="M319 95.3 L324.7 91.6"/><path d="M180.9 71.3 L187.4 68.5"/><path d="M216.8 82.3 L225.3 80.9"/><path d="M336.5 166.8 L344.1 168.6"/><path d="M91.4 68.2 L98.6 63.3"/><path d="M255.4 220.1 L262 215.7"/><path d="M190.4 180.8 L199.2 178.8"/><path d="M71.8 148.3 L80.1 150.8"/><path d="M265.1 173.9 L273.3 176.9"/><path d="M152.9 170.3 L160.5 174.4"/><path d="M172.3 188 L179.3 191.3"/><path d="M232.6 122.3 L240.4 123.1"/><path d="M73.9 162.4 L81 167.3"/><path d="M262.9 122.6 L270.3 124.8"/><path d="M179 199.5 L186.2 195.5"/><path d="M59.4 158.7 L66 158.5"/><path d="M253.6 140.9 L262.3 142.2"/><path d="M124.8 62.8 L132.6 60.9"/><path d="M109.6 85.9 L116.7 89.7"/><path d="M179.1 207.1 L187 205.4"/><path d="M107.9 129.1 L116 132.3"/><path d="M307.6 122.7 L314.5 123.4"/><path d="M89.8 139.7 L97.7 143.1"/><path d="M258.5 216.7 L264.8 214.9"/><path d="M182.2 106.4 L189 103.9"/><path d="M232.6 141.9 L240.9 140"/><path d="M338.1 135.7 L343.4 132.7"/><path d="M305.1 65.8 L312.6 67.8"/><path d="M141.6 191.6 L146.9 188"/><path d="M183.7 62.7 L189.9 65.4"/><path d="M91.5 67.1 L98.8 68.3"/><path d="M233.8 165.8 L242.1 169.1"/><path d="M250.6 92.8 L257.1 92.6"/><path d="M54 136.6 L60.3 138.3"/><path d="M129.9 115.8 L137.2 117.6"/><path d="M229.3 184.6 L237.6 183.5"/><path d="M315.1 72.2 L322.1 76.4"/><path d="M87.6 133.7 L96.2 135"/><path d="M160.3 151.4 L167.8 155.2"/><path d="M326.5 135.4 L333 136.7"/><path d="M260.8 193.5 L268.8 194.9"/><path d="M112.6 205.1 L120 210.1"/><path d="M206.5 190.6 L215.1 188.7"/><path d="M300.7 118.9 L307.1 115.4"/><path d="M211.6 186 L217.7 185.9"/><path d="M287.2 69.3 L293.3 71.7"/></g><path d="M40 178 C42 104 118 50 200 50 C282 50 358 104 360 178 C342 216 280 232 200 232 C120 232 58 216 40 178Z" fill="none" stroke="#022E21" stroke-width="4.5" stroke-linejoin="round"/></g><g class="p-crudites"><ellipse cx="116" cy="196" rx="56" ry="18" fill="#022E21" opacity=".13"/><path d="M80.3 192.3 Q94.4 182.4 105.6 186.5" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M80.3 192.3 Q94.4 182.4 105.6 186.5" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M80.3 192.3 Q94.4 182.4 105.6 186.5" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M68.4 166.1 Q74.6 165.4 87.2 178.7" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M68.4 166.1 Q74.6 165.4 87.2 178.7" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M68.4 166.1 Q74.6 165.4 87.2 178.7" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M149.3 180.2 Q161.3 180 169.9 193.9" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M149.3 180.2 Q161.3 180 169.9 193.9" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M149.3 180.2 Q161.3 180 169.9 193.9" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M75.2 184.8 Q88.1 185.3 95.4 199.9" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M75.2 184.8 Q88.1 185.3 95.4 199.9" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M75.2 184.8 Q88.1 185.3 95.4 199.9" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M119.4 168.4 Q128.7 167 142.7 179.7" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M119.4 168.4 Q128.7 167 142.7 179.7" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M119.4 168.4 Q128.7 167 142.7 179.7" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M61.2 200.3 Q79.3 192.7 88.3 199.1" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M61.2 200.3 Q79.3 192.7 88.3 199.1" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M61.2 200.3 Q79.3 192.7 88.3 199.1" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M121.1 204 Q134.2 194.5 148.6 198.9" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M121.1 204 Q134.2 194.5 148.6 198.9" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M121.1 204 Q134.2 194.5 148.6 198.9" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M146.2 207 Q150.9 193.1 162.5 193.2" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M146.2 207 Q150.9 193.1 162.5 193.2" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M146.2 207 Q150.9 193.1 162.5 193.2" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M145.7 183.4 Q157 179 168.2 188.5" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M145.7 183.4 Q157 179 168.2 188.5" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M145.7 183.4 Q157 179 168.2 188.5" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M93.2 181.3 Q110.8 176.2 118.7 185.1" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M93.2 181.3 Q110.8 176.2 118.7 185.1" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M93.2 181.3 Q110.8 176.2 118.7 185.1" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M119.9 193 Q134.1 194.7 144.2 210.4" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M119.9 193 Q134.1 194.7 144.2 210.4" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M119.9 193 Q134.1 194.7 144.2 210.4" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M76.3 189 Q87.2 192.5 96.4 210.1" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M76.3 189 Q87.2 192.5 96.4 210.1" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M76.3 189 Q87.2 192.5 96.4 210.1" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M124 171.7 Q132.2 171.8 145.6 185.8" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M124 171.7 Q132.2 171.8 145.6 185.8" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M124 171.7 Q132.2 171.8 145.6 185.8" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M70.7 191.4 Q81.2 192.3 84.4 207.2" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M70.7 191.4 Q81.2 192.3 84.4 207.2" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M70.7 191.4 Q81.2 192.3 84.4 207.2" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M95.2 181.7 Q112.6 169.8 121.1 172" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M95.2 181.7 Q112.6 169.8 121.1 172" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M95.2 181.7 Q112.6 169.8 121.1 172" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M66.4 201.4 Q73.9 184.7 85.4 182" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M66.4 201.4 Q73.9 184.7 85.4 182" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M66.4 201.4 Q73.9 184.7 85.4 182" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M134.5 203.2 Q147.2 196.4 164.5 203.5" fill="none" stroke="#022E21" stroke-width="10.5" stroke-linecap="round"/><path d="M134.5 203.2 Q147.2 196.4 164.5 203.5" fill="none" stroke="#9B4FB0" stroke-width="6" stroke-linecap="round"/><path d="M134.5 203.2 Q147.2 196.4 164.5 203.5" fill="none" stroke="#E3B8EE" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><ellipse cx="288" cy="196" rx="56" ry="18" fill="#022E21" opacity=".13"/><path d="M286 188.5 Q301.7 188.7 311.6 203" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M286 188.5 Q301.7 188.7 311.6 203" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M286 188.5 Q301.7 188.7 311.6 203" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M310.5 173.8 Q327 165.9 339.9 172" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M310.5 173.8 Q327 165.9 339.9 172" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M310.5 173.8 Q327 165.9 339.9 172" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M312.1 176.2 Q323.8 168.6 334.5 175" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M312.1 176.2 Q323.8 168.6 334.5 175" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M312.1 176.2 Q323.8 168.6 334.5 175" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M284.5 177.8 Q299.5 165.4 304.5 167" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M284.5 177.8 Q299.5 165.4 304.5 167" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M284.5 177.8 Q299.5 165.4 304.5 167" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M302.1 171.8 Q312.8 170.1 320.7 182.4" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M302.1 171.8 Q312.8 170.1 320.7 182.4" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M302.1 171.8 Q312.8 170.1 320.7 182.4" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M246.3 165.4 Q251.7 165.1 264 178.7" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M246.3 165.4 Q251.7 165.1 264 178.7" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M246.3 165.4 Q251.7 165.1 264 178.7" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M316.6 205.2 Q330.9 192.9 344.3 194.6" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M316.6 205.2 Q330.9 192.9 344.3 194.6" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M316.6 205.2 Q330.9 192.9 344.3 194.6" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M294 169.2 Q309.2 171.6 313.3 187.9" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M294 169.2 Q309.2 171.6 313.3 187.9" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M294 169.2 Q309.2 171.6 313.3 187.9" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M312.1 184.2 Q318.4 174.6 333.2 179" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M312.1 184.2 Q318.4 174.6 333.2 179" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M312.1 184.2 Q318.4 174.6 333.2 179" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M239.9 179.9 Q251.9 174.6 259.6 183.4" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M239.9 179.9 Q251.9 174.6 259.6 183.4" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M239.9 179.9 Q251.9 174.6 259.6 183.4" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M263.2 175.4 Q271.5 174.9 284.3 188.5" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M263.2 175.4 Q271.5 174.9 284.3 188.5" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M263.2 175.4 Q271.5 174.9 284.3 188.5" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M275.7 204.9 Q280.6 187.5 297 184.2" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M275.7 204.9 Q280.6 187.5 297 184.2" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M275.7 204.9 Q280.6 187.5 297 184.2" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M300.7 209.4 Q308.4 192 319.3 188.6" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M300.7 209.4 Q308.4 192 319.3 188.6" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M300.7 209.4 Q308.4 192 319.3 188.6" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M287.2 180 Q300.4 165.3 302.6 164.5" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M287.2 180 Q300.4 165.3 302.6 164.5" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M287.2 180 Q300.4 165.3 302.6 164.5" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M250.5 186.2 Q259.4 189.2 272.1 206.2" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M250.5 186.2 Q259.4 189.2 272.1 206.2" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M250.5 186.2 Q259.4 189.2 272.1 206.2" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M265.9 183.9 Q278.2 181.8 284.6 193.7" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M265.9 183.9 Q278.2 181.8 284.6 193.7" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M265.9 183.9 Q278.2 181.8 284.6 193.7" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M304 210.2 Q309.3 192.5 324.3 188.9" fill="none" stroke="#022E21" stroke-width="10" stroke-linecap="round"/><path d="M304 210.2 Q309.3 192.5 324.3 188.9" fill="none" stroke="#F58A2B" stroke-width="5.5" stroke-linecap="round"/><path d="M304 210.2 Q309.3 192.5 324.3 188.9" fill="none" stroke="#FFD3A6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></g><g class="p-saumon"><ellipse cx="108" cy="160" rx="66" ry="26" fill="#022E21" opacity=".13"/><g transform="translate(96 112.0) rotate(-8.0)"><rect x="-18" y="-18" width="36" height="36" rx="7" fill="#F47A4E" stroke="#022E21" stroke-width="4.5"/><path d="M-15 15.5 h27 a6 6 0 0 0 6 -6 v-13" fill="#D9573A"/><path d="M-12 -7.2 C-6 -13.2 6 -1.2 12 -7.2" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-12 5 C-6 -1 6 11 12 5" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-12 -10 q6 -3 12 -2" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(130 100.0) rotate(10.0)"><rect x="-19" y="-19" width="38" height="38" rx="7" fill="#F47A4E" stroke="#022E21" stroke-width="4.5"/><path d="M-16 16.5 h29 a6 6 0 0 0 6 -6 v-13.7" fill="#D9573A"/><path d="M-13 -7.6 C-6.3 -13.6 6.3 -1.6 13 -7.6" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-13 5.3 C-6.3 -0.7 6.3 11.3 13 5.3" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-13 -11 q6 -3 12 -2" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(72 140.0) rotate(14.0)"><rect x="-17" y="-17" width="34" height="34" rx="7" fill="#F47A4E" stroke="#022E21" stroke-width="4.5"/><path d="M-14 14.5 h25 a6 6 0 0 0 6 -6 v-12.2" fill="#D9573A"/><path d="M-11 -6.8 C-5.7 -12.8 5.7 -0.8 11 -6.8" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-11 4.8 C-5.7 -1.2 5.7 10.8 11 4.8" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-11 -9 q6 -3 12 -2" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(108 140.0) rotate(-6.0)"><rect x="-20" y="-20" width="40" height="40" rx="7" fill="#F47A4E" stroke="#022E21" stroke-width="4.5"/><path d="M-17 17.5 h31 a6 6 0 0 0 6 -6 v-14.4" fill="#D9573A"/><path d="M-14 -8 C-6.7 -14 6.7 -2 14 -8" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-14 5.6 C-6.7 -0.4 6.7 11.6 14 5.6" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-14 -12 q6 -3 12 -2" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(146 132.0) rotate(12.0)"><rect x="-19" y="-19" width="38" height="38" rx="7" fill="#F47A4E" stroke="#022E21" stroke-width="4.5"/><path d="M-16 16.5 h29 a6 6 0 0 0 6 -6 v-13.7" fill="#D9573A"/><path d="M-13 -7.6 C-6.3 -13.6 6.3 -1.6 13 -7.6" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-13 5.3 C-6.3 -0.7 6.3 11.3 13 5.3" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-13 -11 q6 -3 12 -2" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(84 172.0) rotate(-12.0)"><rect x="-18" y="-18" width="36" height="36" rx="7" fill="#F47A4E" stroke="#022E21" stroke-width="4.5"/><path d="M-15 15.5 h27 a6 6 0 0 0 6 -6 v-13" fill="#D9573A"/><path d="M-12 -7.2 C-6 -13.2 6 -1.2 12 -7.2" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-12 5 C-6 -1 6 11 12 5" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-12 -10 q6 -3 12 -2" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(124 170.0) rotate(6.0)"><rect x="-19" y="-19" width="38" height="38" rx="7" fill="#F47A4E" stroke="#022E21" stroke-width="4.5"/><path d="M-16 16.5 h29 a6 6 0 0 0 6 -6 v-13.7" fill="#D9573A"/><path d="M-13 -7.6 C-6.3 -13.6 6.3 -1.6 13 -7.6" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-13 5.3 C-6.3 -0.7 6.3 11.3 13 5.3" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-13 -11 q6 -3 12 -2" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(156 162.0) rotate(-16.0)"><rect x="-16" y="-16" width="32" height="32" rx="7" fill="#F47A4E" stroke="#022E21" stroke-width="4.5"/><path d="M-13 13.5 h23 a6 6 0 0 0 6 -6 v-11.5" fill="#D9573A"/><path d="M-10 -6.4 C-5.3 -12.4 5.3 -0.4 10 -6.4" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-10 4.5 C-5.3 -1.5 5.3 10.5 10 4.5" fill="none" stroke="#FFE6D8" stroke-width="3.4" stroke-linecap="round"/><path d="M-10 -8 q6 -3 12 -2" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></g></g><g class="p-avocat"><ellipse cx="200" cy="104" rx="74" ry="20" fill="#022E21" opacity=".13"/><g transform="translate(138 98.0) rotate(-16.0)"><path d="M0 0 C18 -30 70 -34 96 -8 C72 12 22 16 0 0Z" fill="#3F7D2E" stroke="#022E21" stroke-width="4.5" stroke-linejoin="round"/><path d="M9 -3 C25 -22 66 -25 86 -8 C66 4 26 8 9 -3Z" fill="#B9DA6C"/><path d="M24 -13 C38 -20 56 -21 68 -16" fill="none" stroke="#EAF5C6" stroke-width="3.4" stroke-linecap="round"/></g><g transform="translate(162 92.0) rotate(-6.0)"><path d="M0 0 C18 -30 70 -34 96 -8 C72 12 22 16 0 0Z" fill="#3F7D2E" stroke="#022E21" stroke-width="4.5" stroke-linejoin="round"/><path d="M9 -3 C25 -22 66 -25 86 -8 C66 4 26 8 9 -3Z" fill="#B9DA6C"/><path d="M24 -13 C38 -20 56 -21 68 -16" fill="none" stroke="#EAF5C6" stroke-width="3.4" stroke-linecap="round"/></g><g transform="translate(186 92.0) rotate(4.0)"><path d="M0 0 C18 -30 70 -34 96 -8 C72 12 22 16 0 0Z" fill="#3F7D2E" stroke="#022E21" stroke-width="4.5" stroke-linejoin="round"/><path d="M9 -3 C25 -22 66 -25 86 -8 C66 4 26 8 9 -3Z" fill="#B9DA6C"/><path d="M24 -13 C38 -20 56 -21 68 -16" fill="none" stroke="#EAF5C6" stroke-width="3.4" stroke-linecap="round"/></g><g transform="translate(210 98.0) rotate(14.0)"><path d="M0 0 C18 -30 70 -34 96 -8 C72 12 22 16 0 0Z" fill="#3F7D2E" stroke="#022E21" stroke-width="4.5" stroke-linejoin="round"/><path d="M9 -3 C25 -22 66 -25 86 -8 C66 4 26 8 9 -3Z" fill="#B9DA6C"/><path d="M24 -13 C38 -20 56 -21 68 -16" fill="none" stroke="#EAF5C6" stroke-width="3.4" stroke-linecap="round"/></g></g><g class="p-mangue"><ellipse cx="292" cy="160" rx="62" ry="26" fill="#022E21" opacity=".13"/><g transform="translate(276 112.0) rotate(8.0)"><rect x="-15" y="-15" width="30" height="30" rx="7" fill="#FFB52A" stroke="#022E21" stroke-width="4.5"/><path d="M-12 12.5 h21 a6 6 0 0 0 6 -6 v-10.8" fill="#EE8A00"/><path d="M-9 -7 q6 -3 12 -2" fill="none" stroke="#FFF1C2" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(306 104.0) rotate(-10.0)"><rect x="-15" y="-15" width="30" height="30" rx="7" fill="#FFB52A" stroke="#022E21" stroke-width="4.5"/><path d="M-12 12.5 h21 a6 6 0 0 0 6 -6 v-10.8" fill="#EE8A00"/><path d="M-9 -7 q6 -3 12 -2" fill="none" stroke="#FFF1C2" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(330 128.0) rotate(14.0)"><rect x="-15" y="-15" width="30" height="30" rx="7" fill="#FFB52A" stroke="#022E21" stroke-width="4.5"/><path d="M-12 12.5 h21 a6 6 0 0 0 6 -6 v-10.8" fill="#EE8A00"/><path d="M-9 -7 q6 -3 12 -2" fill="none" stroke="#FFF1C2" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(290 136.0) rotate(-4.0)"><rect x="-16" y="-16" width="32" height="32" rx="7" fill="#FFB52A" stroke="#022E21" stroke-width="4.5"/><path d="M-13 13.5 h23 a6 6 0 0 0 6 -6 v-11.5" fill="#EE8A00"/><path d="M-10 -8 q6 -3 12 -2" fill="none" stroke="#FFF1C2" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(258 138.0) rotate(18.0)"><rect x="-14" y="-14" width="28" height="28" rx="7" fill="#FFB52A" stroke="#022E21" stroke-width="4.5"/><path d="M-11 11.5 h19 a6 6 0 0 0 6 -6 v-10.1" fill="#EE8A00"/><path d="M-8 -6 q6 -3 12 -2" fill="none" stroke="#FFF1C2" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(318 158.0) rotate(6.0)"><rect x="-15" y="-15" width="30" height="30" rx="7" fill="#FFB52A" stroke="#022E21" stroke-width="4.5"/><path d="M-12 12.5 h21 a6 6 0 0 0 6 -6 v-10.8" fill="#EE8A00"/><path d="M-9 -7 q6 -3 12 -2" fill="none" stroke="#FFF1C2" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(284 166.0) rotate(-12.0)"><rect x="-15" y="-15" width="30" height="30" rx="7" fill="#FFB52A" stroke="#022E21" stroke-width="4.5"/><path d="M-12 12.5 h21 a6 6 0 0 0 6 -6 v-10.8" fill="#EE8A00"/><path d="M-9 -7 q6 -3 12 -2" fill="none" stroke="#FFF1C2" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(252 164.0) rotate(10.0)"><rect x="-13" y="-13" width="26" height="26" rx="7" fill="#FFB52A" stroke="#022E21" stroke-width="4.5"/><path d="M-10 10.5 h17 a6 6 0 0 0 6 -6 v-9.4" fill="#EE8A00"/><path d="M-7 -5 q6 -3 12 -2" fill="none" stroke="#FFF1C2" stroke-width="3" stroke-linecap="round"/></g></g><g class="p-edamame"><ellipse cx="204" cy="190" rx="48" ry="18" fill="#022E21" opacity=".13"/><g transform="translate(175.8 125.5) rotate(-28.9)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(195.2 124.0) rotate(0.2)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(212.4 124.3) rotate(4.3)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(227.7 124.2) rotate(-9.7)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(185.2 140.8) rotate(18.0)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(198.9 140.0) rotate(-31.1)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(218 142.7) rotate(7.2)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(236.6 140.5) rotate(19.7)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(173.6 155.2) rotate(13.9)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(194.4 155.7) rotate(-33.0)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(208.6 154.8) rotate(-17.5)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(228.9 154.8) rotate(30.9)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(186.3 169.2) rotate(-9.7)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(201 169.1) rotate(-6.0)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(220.4 169.4) rotate(7.7)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(232.7 171.3) rotate(31.6)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(174.2 184.0) rotate(-33.3)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(193.2 184.1) rotate(-33.2)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(210 187.7) rotate(-6.4)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(226.4 186.6) rotate(-32.5)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(184.5 199.7) rotate(8.7)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(203.7 199.2) rotate(4.4)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(218.6 199.6) rotate(-18.5)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g><g transform="translate(238 203.0) rotate(-30.3)"><ellipse rx="10.5" ry="8" fill="#7DC243" stroke="#022E21" stroke-width="3.5"/><path d="M-3 5 a8 5.5 0 0 0 9 -3" fill="none" stroke="#4E9A2A" stroke-width="3" stroke-linecap="round"/><circle cx="-3.5" cy="-2.5" r="2.3" fill="#D8F2B5"/></g></g><g class="p-sesame"><ellipse cx="112.9" cy="171.8" rx="4.4" ry="2.5" transform="rotate(16 112.9 171.8)" fill="#1A1A17"/><ellipse cx="194.6" cy="107.4" rx="4.6" ry="2.6" transform="rotate(35 194.6 107.4)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="280" cy="147.7" rx="4.4" ry="2.5" transform="rotate(1 280 147.7)" fill="#1A1A17"/><ellipse cx="131.4" cy="78.4" rx="4.6" ry="2.6" transform="rotate(-15 131.4 78.4)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="222.2" cy="87.4" rx="4.4" ry="2.5" transform="rotate(35 222.2 87.4)" fill="#1A1A17"/><ellipse cx="130.4" cy="109.6" rx="4.6" ry="2.6" transform="rotate(-55 130.4 109.6)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="329.4" cy="178.5" rx="4.4" ry="2.5" transform="rotate(45 329.4 178.5)" fill="#1A1A17"/><ellipse cx="230.1" cy="82.6" rx="4.6" ry="2.6" transform="rotate(-21 230.1 82.6)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="199.4" cy="93.8" rx="4.4" ry="2.5" transform="rotate(54 199.4 93.8)" fill="#1A1A17"/><ellipse cx="165.8" cy="99.1" rx="4.6" ry="2.6" transform="rotate(38 165.8 99.1)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="102.5" cy="204.2" rx="4.4" ry="2.5" transform="rotate(-6 102.5 204.2)" fill="#1A1A17"/><ellipse cx="213.5" cy="124.6" rx="4.6" ry="2.6" transform="rotate(-2 213.5 124.6)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="118.6" cy="83.1" rx="4.4" ry="2.5" transform="rotate(44 118.6 83.1)" fill="#1A1A17"/><ellipse cx="131.1" cy="184.1" rx="4.6" ry="2.6" transform="rotate(-35 131.1 184.1)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="321.9" cy="199.6" rx="4.4" ry="2.5" transform="rotate(31 321.9 199.6)" fill="#1A1A17"/><ellipse cx="268.3" cy="157" rx="4.6" ry="2.6" transform="rotate(28 268.3 157.0)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="101.8" cy="142.8" rx="4.4" ry="2.5" transform="rotate(39 101.8 142.8)" fill="#1A1A17"/><ellipse cx="122.3" cy="203.6" rx="4.6" ry="2.6" transform="rotate(47 122.3 203.6)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="176.5" cy="127.7" rx="4.4" ry="2.5" transform="rotate(-6 176.5 127.7)" fill="#1A1A17"/><ellipse cx="170.3" cy="213.3" rx="4.6" ry="2.6" transform="rotate(-14 170.3 213.3)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="77" cy="90.7" rx="4.4" ry="2.5" transform="rotate(26 77 90.7)" fill="#1A1A17"/><ellipse cx="328.1" cy="145.5" rx="4.6" ry="2.6" transform="rotate(-1 328.1 145.5)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="213.1" cy="179.8" rx="4.4" ry="2.5" transform="rotate(-33 213.1 179.8)" fill="#1A1A17"/><ellipse cx="228.3" cy="153.7" rx="4.6" ry="2.6" transform="rotate(15 228.3 153.7)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="117" cy="101.1" rx="4.4" ry="2.5" transform="rotate(-18 117 101.1)" fill="#1A1A17"/><ellipse cx="311" cy="125.1" rx="4.6" ry="2.6" transform="rotate(12 311 125.1)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="149.7" cy="92" rx="4.4" ry="2.5" transform="rotate(-52 149.7 92.0)" fill="#1A1A17"/><ellipse cx="281.6" cy="183.7" rx="4.6" ry="2.6" transform="rotate(-15 281.6 183.7)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/><ellipse cx="247.7" cy="169.9" rx="4.4" ry="2.5" transform="rotate(48 247.7 169.9)" fill="#1A1A17"/><ellipse cx="319.2" cy="133.4" rx="4.6" ry="2.6" transform="rotate(59 319.2 133.4)" fill="#FFF7E2" stroke="#022E21" stroke-width="1.8"/></g><g class="p-bord"><path d="M22 172 A178 66 0 0 0 378 172 L360 174 A160 55 0 0 1 40 174 Z" fill="#F3E7D3" stroke="#022E21" stroke-width="4.5" stroke-linejoin="round"/><path d="M74 214 C120 232 170 238 200 238" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/></g>' +
        '</svg><p class="chargement__texte"><span class="chargement__prepare">On prépare votre bowl…</span><span class="chargement__pret">Prêt&nbsp;!</span></p>';
      document.body.appendChild(chargement);
      memoire('rb-vu', '1');
      if (G) {
        chargement.classList.add('chargement--gsap');
        racine.classList.remove('premier');
        var cq = function (s) { return chargement.querySelector(s); }, cbol = cq('.chargement__bol');
        var ctl = gsap.timeline({ onComplete: function () { chargement.remove(); } });
        ctl.from([cq('.p-bol'), cq('.p-bord')], { scale: 0, svgOrigin: '200 340', duration: 0.26, ease: 'back.out(2)' }, 0.04)
          .from(cq('.chargement__prepare'), { autoAlpha: 0, y: 10, duration: 0.2 }, 0.04);
        // chaque couche tombe (power1.in), s'écrase en touchant puis rebondit un peu (valeurs CRAV resserrées pour tenir en 1,6 s)
        ['.p-riz', '.p-crudites', '.p-saumon', '.p-avocat', '.p-mangue', '.p-edamame', '.p-sesame'].forEach(function (s, k) {
          var t0 = 0.2 + k * 0.11, el = cq(s);
          ctl.from(el, { autoAlpha: 0, y: -260, rotation: gsap.utils.random(-10, 10), transformOrigin: '50% 100%', duration: 0.24, ease: 'power1.in' }, t0)
            .to(el, { scaleX: 1.08, scaleY: 0.88, transformOrigin: '50% 100%', duration: 0.05 }, t0 + 0.24)
            .to(el, { scaleX: 0.98, scaleY: 1.04, duration: 0.07 }, t0 + 0.29)
            .to(el, { scaleX: 1, scaleY: 1, duration: 0.1 }, t0 + 0.36);
          if (k % 2 === 0) ctl.to(cbol, { keyframes: [{ scaleX: 1.04, scaleY: 0.93, duration: 0.05 }, { scaleX: 0.99, scaleY: 1.02, duration: 0.07 }, { scaleX: 1, scaleY: 1, duration: 0.09 }], transformOrigin: '50% 100%' }, t0 + 0.24);
        });
        ctl.to(cq('.chargement__prepare'), { autoAlpha: 0, duration: 0.15 }, 0.95)
          .fromTo(cq('.chargement__pret'), { autoAlpha: 0, scale: 0.6, rotation: -8 }, { autoAlpha: 1, scale: 1, rotation: -3, duration: 0.28, ease: 'back.out(2.5)' }, 1.0)
          .to(chargement, { yPercent: -110, borderBottomLeftRadius: '50% 22%', borderBottomRightRadius: '50% 22%', duration: 0.4, ease: 'power3.inOut' }, 1.2);
        setTimeout(function () { if (chargement.parentNode) chargement.remove(); }, 1800);   // secours : jamais plus de 1,8 s d'écran couvert
      } else {
        requestAnimationFrame(function () { chargement.classList.add('chargement--parti'); racine.classList.remove('premier'); });
        setTimeout(function () { chargement.remove(); racine.classList.remove('premier'); }, 1700);
      }
    } else if (racine.classList.contains('arrivee')) {
      // on arrive d'une autre page : les rideaux couvrent déjà l'écran, ils repartent vers le haut
      memoire('rb-rideaux', null);
      rideaux.classList.add('rideaux--couvre');
      racine.classList.remove('arrivee');
      var finRideaux = function () { rideaux.classList.remove('rideaux--couvre', 'rideaux--sort'); if (G) gsap.set(rideaux.querySelectorAll('*'), { clearProps: 'all' }); };
      if (G) {
        var rr = [].slice.call(rideaux.querySelectorAll('.rideau')), rtx = rideaux.querySelector('.rideaux__texte');
        gsap.set(rr, { y: 0, yPercent: -15, borderRadius: 0 });
        gsap.timeline({ onComplete: finRideaux })
          .to(rtx, { autoAlpha: 0, scale: 1.3, duration: 0.28, ease: 'power1.in' }, 0)
          .to(rr.slice().reverse(), { yPercent: -130, borderBottomLeftRadius: '50% 18%', borderBottomRightRadius: '50% 18%', duration: 0.6, ease: 'power4.inOut', stagger: 0.06 }, 0.05);
      } else {
        requestAnimationFrame(function () { requestAnimationFrame(function () { rideaux.classList.add('rideaux--sort'); }); });
      }
      setTimeout(finRideaux, 1000);                                     // secours : les rideaux partent même si l'animation ne tourne pas
    }

    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== '_self') return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;   // ancres et liens externes : rien
      if (!/\.html?$|\/$/.test(url.pathname) && url.pathname.indexOf('.') > -1) return; // fichiers (pdf, images…)
      e.preventDefault();
      rideaux.classList.remove('rideaux--sort', 'rideaux--couvre'); void rideaux.offsetWidth;
      if (G) {
        // 3 rideaux en dôme : le centre monte d'abord, puis les bords (bord arrondi qui s'aplatit), 0,07 s d'écart
        rideaux.classList.add('rideaux--couvre');
        gsap.timeline()
          .fromTo(rideaux.querySelectorAll('.rideau'), { y: 0, yPercent: 110, borderTopLeftRadius: '50% 18%', borderTopRightRadius: '50% 18%' },
            { yPercent: -15, borderTopLeftRadius: '0% 0%', borderTopRightRadius: '0% 0%', duration: 0.5, ease: 'power2.out', stagger: 0.07 })
          .fromTo(rideaux.querySelector('.rideaux__texte'), { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.34, ease: 'back.out(2)' }, 0.3);
      } else rideaux.classList.add('rideaux--monte');
      memoire('rb-rideaux', '1');
      setTimeout(function () { location.href = url.href; }, 560);
    });
    // retour arrière depuis le cache du navigateur : on retire les rideaux tout de suite
    window.addEventListener('pageshow', function (e) { if (e.persisted) { rideaux.classList.remove('rideaux--monte', 'rideaux--couvre', 'rideaux--sort'); if (G) gsap.set(rideaux.querySelectorAll('*'), { clearProps: 'all' }); memoire('rb-rideaux', null); } });
  } else {
    racine.classList.remove('premier', 'arrivee');
  }

  /* ================= VERSION GSAP (décision de Nathan du 05/11/2026 : « comme CRAV ») =================
     GSAP 3.15.0 + ScrollTrigger + SplitText, chargés par cdnjs dans chaque page (balises defer).
     Tout est lancé dans gsap.matchMedia() : animations allégées sur téléphone, aucune avec « réduire les animations ».
     Si GSAP ne se charge pas, G vaut false et les parties plus haut gardent l'ancienne mécanique (rien n'est caché sans JS).
     On n'anime que transform et opacity (plus 2 variables CSS de traits SVG et le bord arrondi des rideaux). */
  if (G) {
    var rnd = gsap.utils.random;
    function rotDe(el, nom) { return parseFloat(getComputedStyle(el).getPropertyValue(nom || '--r')) || 0; }

    // 1. Titres : SplitText mot par mot (ou lettre par lettre), chaque mot part de 0, 18 à 40 px plus bas, penché, puis rebondit (CRAV)
    animsGsap.push(function (c) {
      var hautEcran = window.innerHeight, pente = c.tel ? 10 : 16;
      document.querySelectorAll('.t-l, .t-xl, [data-vivant]').forEach(function (el) {
        if (el.closest('.tiroir, .fiche, .une')) return;
        var lettres = el.getAttribute('data-vivant') === 'lettres';
        // mots coupés seulement sur les espaces normales : « suite&nbsp;! » reste UN mot, le « ! » ne peut pas partir seul à la ligne
        var s = SplitText.create(el, { type: lettres ? 'chars' : 'words', tag: 'span', wordsClass: 'mot', charsClass: 'mot', wordDelimiter: { delimiter: /[ \t\n\r]+/, replaceWith: ' ' }, reduceWhiteSpace: false });
        var cibles = lettres ? s.chars : s.words;
        var depart = { scale: 0, transformOrigin: '50% 100%', y: function () { return rnd(18, 40); }, rotation: function () { return rnd(-pente, pente); } };
        var tw;
        if (el.getBoundingClientRect().top < hautEcran) {
          // titre du premier écran : il rebondit tout de suite, visible en moins de 0,3 s
          tw = gsap.from(cibles, Object.assign({ duration: 0.5, ease: 'back.out(2.35)', stagger: 0.02 }, depart));
        } else {
          tw = gsap.from(cibles, Object.assign({
            duration: lettres ? 0.75 : 0.72, ease: lettres ? 'back.out(2.6)' : 'back.out(2.35)', stagger: lettres ? 0.03 : 0.055,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          }, depart));
        }
        garde(el, function () { tw.progress(1); }, function () { return tw.progress() === 1; });
      });
      ajuster();
    });

    // 3 bis et 4 quinquies. Les grands bowls détourés grossissent au défilement (scrub)
    animsGsap.push(function () {
      document.querySelectorAll('.faits__bol').forEach(function (bol) {
        gsap.fromTo(bol, { scale: 0.9 }, { scale: 1.08, ease: 'none', scrollTrigger: { trigger: bol.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      document.querySelectorAll('.dernier__bol').forEach(function (bol) {
        gsap.fromTo(bol, { scale: 0.85 }, { scale: 1.1, transformOrigin: '50% 30%', ease: 'none', scrollTrigger: { trigger: bol.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    });

    // 4 bis. « Une histoire dans chaque couche » : quand la section arrive, le vrai bowl TOMBE (0,32 s power1.in), se redresse
    // (0,45 s back.out(2.5)), s'écrase (×0,88 / ×1,06 puis ×1,03 / ×0,98 puis 1) et fait un petit rebond, comme le burger CRAV.
    // Il retombe si on remonte puis redescend. Plus de section épinglée (retour de Nathan du 06/11).
    animsGsap.push(function (c) {
      document.querySelectorAll('.couches').forEach(function (sec) {
        var bol = sec.querySelector('.couches__bol'), plat = sec.querySelector('.couches__plat');
        if (!bol || !plat) return;
        gsap.set(plat, { autoAlpha: 0 });
        function arriver() {
          gsap.killTweensOf([plat, bol]);
          gsap.timeline()
            .fromTo(plat, { autoAlpha: 1, yPercent: c.tel ? -140 : -200, scale: 0.8, rotation: rnd(-12, 12) }, { yPercent: 0, scale: 1, duration: 0.32, ease: 'power1.in' })
            .to(plat, { rotation: 0, duration: 0.45, ease: 'back.out(2.5)' }, 0.32)
            .to(bol, { scaleX: 1.06, scaleY: 0.88, transformOrigin: '50% 80%', duration: 0.06 }, 0.32)
            .to(bol, { scaleX: 0.98, scaleY: 1.03, duration: 0.08 })
            .to(bol, { scaleX: 1, scaleY: 1, duration: 0.12 })
            .to(plat, { yPercent: -7, duration: 0.18, ease: 'power2.out' }, 0.62)
            .to(plat, { yPercent: 0, duration: 0.45, ease: 'bounce.out' });
        }
        ScrollTrigger.create({ trigger: bol, start: 'top 80%', onEnter: arriver, onLeaveBack: function () { gsap.killTweensOf(plat); gsap.set(plat, { autoAlpha: 0 }); } });
        garde(bol, function () { gsap.killTweensOf(plat); gsap.set(plat, { autoAlpha: 1, yPercent: 0, scale: 1, rotation: 0 }); },
          function () { return gsap.getProperty(plat, 'autoAlpha') > 0.9; });
      });
    });

    // 4 ter. « À emporter » : la piste glisse vers la gauche, liée au défilement (scrub, ease none)
    animsGsap.push(function (c) {
      document.querySelectorAll('.emporter').forEach(function (sec) {
        var piste = sec.querySelector('.emporter__piste'), fenetre = sec.querySelector('.emporter__fenetre');
        sec.classList.add('emporter--vif');
        gsap.to(piste, {
          x: function () { return -Math.max(0, piste.scrollWidth - fenetre.clientWidth); }, ease: 'none',
          scrollTrigger: { trigger: sec, start: 'top 55%', end: 'bottom 10%', scrub: c.tel ? 0.4 : 0.8, invalidateOnRefresh: true }
        });
      });
    });

    // 4 sexies. Pied de page : les 4 ingrédients tombent sur RIVE BOWL, puis sont jonglés en boucle (CRAV), seulement à l'écran
    animsGsap.push(function (c) {
      if (!tombes) return;
      var jongles = [];
      gsap.set(tombes, { autoAlpha: 0 });
      ScrollTrigger.create({ trigger: marque, start: 'top 95%', once: true, onEnter: function () {
        tombes.forEach(function (i, n) {
          var r = rotDe(i, '--rot');
          gsap.fromTo(i, { autoAlpha: 1, y: -240, rotation: r + 200 }, { y: 0, rotation: r, duration: 0.9, ease: 'bounce.out', delay: n * 0.12, onComplete: function () {
            var j = gsap.timeline({ repeat: -1, repeatRefresh: true, delay: rnd(0.2, 0.9) })
              .to(i, { y: function () { return -window.innerHeight * (c.tel ? rnd(0.12, 0.2) : rnd(0.2, 0.32)); }, rotation: function () { return '+=' + rnd(220, 600); }, duration: 0.55, ease: 'power2.out' })
              .to(i, { y: 0, duration: 0.75, ease: 'power2.in' })
              .to({}, { duration: function () { return rnd(0.2, 0.9); } });
            jongles.push(j);
          } });
        });
      } });
      garde(marque, function () { tombes.forEach(function (i) { gsap.killTweensOf(i); gsap.set(i, { autoAlpha: 1, y: 0, rotation: rotDe(i, '--rot') }); }); },
        function () { return gsap.getProperty(tombes[tombes.length - 1], 'autoAlpha') > 0.9 && gsap.getProperty(tombes[tombes.length - 1], 'y') > -5; });
      ScrollTrigger.create({ trigger: marque, start: 'top bottom', end: 'bottom top', onToggle: function (s) { jongles.forEach(function (j) { if (s.isActive) j.resume(); else j.pause(); }); } });
    });

    // 7. Vagues « jelly » : elles s'étirent selon la VITESSE de défilement (getVelocity), puis reviennent avec un rebond élastique ;
    // leurs points ondulent en continu (gsap.ticker), seulement pour les vagues à l'écran
    animsGsap.push(function (c) {
      if (!vagues.length) return;
      var svgs = vagues.map(function (v) { return v.svg; }), max = c.tel ? VAGUE.etirementTel : VAGUE.etirement;
      var retour = gsap.delayedCall(0.14, function () { gsap.to(svgs, { scaleY: 1, duration: 1.1, ease: 'elastic.out(1, 0.3)', overwrite: true }); }).pause();
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) {
        var v = Math.min(1, Math.abs(s.getVelocity()) / 3000);
        gsap.to(svgs, { scaleY: 1 + (max - 1) * v, duration: 0.2, ease: 'power2.out', overwrite: true });
        retour.restart(true);
      } });
      function onde(t) { vagues.forEach(function (v) { if (v.vue) dessinerVague(v, t * 1000); }); }
      gsap.ticker.add(onde);
      return function () { gsap.ticker.remove(onde); };
    });

    // 8. Photos et cartes penchées : sur ordinateur elles suivent le défilement (scrub) ; sur téléphone elles restent juste penchées
    animsGsap.push(function (c) {
      flottants.forEach(function (e) {
        var p = rotDe(e, '--penche');
        if (c.tel) { gsap.set(e, { rotation: p }); return; }
        gsap.fromTo(e, { y: 9, rotation: p - 0.75 }, { y: -9, rotation: p + 0.75, ease: 'none', scrollTrigger: { trigger: e, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    });

    gsap.matchMedia().add({ tel: '(max-width: 860px)', ordi: '(min-width: 861px)', reduit: '(prefers-reduced-motion: reduce)' }, function (ctx) {
      if (ctx.conditions.reduit) return;
      var nettoyages = [];
      animsGsap.forEach(function (f) { try { var n = f(ctx.conditions); if (typeof n === 'function') nettoyages.push(n); } catch (e) { if (window.console) console.warn('Rive Bowl · animation ignorée :', e); } });
      // les polices changent la taille des titres : on recalcule les déclencheurs une fois qu'elles sont prêtes
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
      return function () { nettoyages.forEach(function (n) { n(); }); };
    });
  }


  /* ---------- 6. Le titre de l'onglet qui change, doucement ---------- */
  if (!reduit) {
    var base = document.title.split(' · ')[0] === 'Rive Bowl' ? 'Rive Bowl' : 'Rive Bowl';
    var vrai = document.title, n = 0, minuteur = null;
    function tourner() { document.title = base + ' · ' + ONGLET[n % ONGLET.length]; n++; }
    function demarrer() { if (!minuteur) { minuteur = setInterval(tourner, ONGLET_VITESSE); } }
    function arreter() { clearInterval(minuteur); minuteur = null; document.title = vrai; }
    // il tourne quand l'onglet est en arrière-plan (comme une enseigne qui appelle), et reprend le vrai titre au retour
    document.addEventListener('visibilitychange', function () { if (document.hidden) { n = 0; tourner(); demarrer(); } else arreter(); });
  }
})();
