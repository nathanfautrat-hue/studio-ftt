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
      var morceaux = parLettre ? Array.from(t.nodeValue) : t.nodeValue.split(/(\s+)/);
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
  var grands = [].slice.call(document.querySelectorAll('.t-l, .t-xl'));
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

  /* ---------- 4 bis. Histoire épinglée « Une histoire dans chaque couche » ----------
     La scène reste collée en haut ; pendant les 2 écrans de défilement, le fil en pointillés se dessine (stroke-dashoffset),
     les 5 étapes s'allument et chaque étape fait tomber ses ingrédients dans le bol. Sans JS ou avec « réduire les animations » : tout est déjà là. */
  document.querySelectorAll('.couches').forEach(function (sec) {
    if (reduit || G) return;
    sec.classList.add('couches--vif');
    garde(sec.querySelector('.couches__bol'), function () {
      sec.querySelectorAll('.couches__riz, .couches__ing').forEach(function (m) { m.style.transition = 'none'; m.classList.add('la'); });
      sec.querySelectorAll('.couches__etapes li').forEach(function (e) { e.classList.add('faite'); });
    }, function () { return !!sec.querySelector('.couches__riz.la'); });
    var morceaux = [].slice.call(sec.querySelectorAll('.couches__riz, .couches__ing'));
    var etapes = [].slice.call(sec.querySelectorAll('.couches__etapes li'));
    var sauce = sec.querySelector('.couches__sauce'), fil = sec.querySelector('.couches__fil');
    suivre(sec, function () {
      var r = sec.getBoundingClientRect(), haut = parseFloat(getComputedStyle(sec.querySelector('.couches__scene')).top) || 0;
      var course = r.height - (window.innerHeight - haut);
      var q = Math.min(1, Math.max(0, (haut - r.top) / Math.max(1, course)));   // 0 quand la scène se colle, 1 quand elle repart
      q = Math.min(1, q * 1.08);                                                // la dernière étape arrive un peu avant la fin
      fil.style.setProperty('--fil', (1 - q).toFixed(3));
      var actif = 0;
      etapes.forEach(function (e, n) { var a = parseFloat(e.dataset.a); var ok = q >= a + 0.02 || (n === 0 && q > 0); e.classList.toggle('faite', ok); if (ok) actif = n; });
      etapes.forEach(function (e, n) { e.classList.toggle('en-cours', n === actif); });
      morceaux.forEach(function (m) { var a = parseFloat(m.dataset.a); m.classList.toggle('la', q >= a + 0.02 || (a === 0 && q > 0)); });
      sauce.style.setProperty('--sauce', (1 - Math.min(1, Math.max(0, (q - 0.8) / 0.16))).toFixed(3));
    });
  });

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

  /* ---------- 4 quater. Affiche rétro : le damier se dessine, la bulle poppe, les rayons tournent (seulement à l'écran) ---------- */
  document.querySelectorAll('.affiche').forEach(function (sec) {
    if (reduit || G) return;
    sec.classList.add('affiche--vif');
    unefois(sec, '0px 0px -25% 0px', function () { sec.classList.add('affiche--la'); });
    garde(sec, function () { sec.classList.add('affiche--la'); }, function () { return sec.classList.contains('affiche--la'); });
    new IntersectionObserver(function (e) { sec.classList.toggle('affiche--ecran', e[0].isIntersecting); }).observe(sec);
  });

  /* ---------- 4 quinquies. Dernier appel : le grand bowl grossit doucement (0,85 → 1,1) ---------- */
  document.querySelectorAll('.dernier__bol').forEach(function (bol) {
    if (reduit || G) return;
    suivre(bol.parentNode, function (p) { bol.style.setProperty('--echelle', (0.85 + 0.25 * p).toFixed(3)); });
  });

  /* ---------- 4 sexies. Pied de page : 4 ingrédients détourés tombent sur « RIVE BOWL » ---------- */
  var marque = document.querySelector('.pied__marque');
  if (marque && !reduit) {
    var place = [['saumon', 4, -20], ['avocat', 28, 25], ['mangue', 56, -14], ['edamame', 78, 30]];
    var tombes = place.map(function (d) {
      var i = document.createElement('img');
      i.src = 'img/ingredients/' + d[0] + '.webp'; i.alt = ''; i.width = 200; i.height = 200; i.loading = 'lazy';
      i.className = 'pied__tombe'; i.setAttribute('aria-hidden', 'true');
      i.style.left = d[1] + '%'; i.style.setProperty('--rot', d[2] + 'deg');
      marque.parentNode.insertBefore(i, marque);
      return i;
    });
    function placerTombes() {
      var haut = marque.offsetTop - tombes[0].offsetWidth * 0.55;
      tombes.forEach(function (i) { i.style.top = haut + 'px'; });
    }
    placerTombes();
    if (window.ResizeObserver) new ResizeObserver(placerTombes).observe(marque);
    // ils tombent avec un rebond dès que « RIVE BOWL » arrive à l'écran (le bas de page ne défile pas assez pour suivre le scroll)
    if (!G) {
      tombes.forEach(function (i, n) { i.style.transitionDelay = (n * 0.12) + 's'; });
      unefois(marque, '0px 0px -10% 0px', function () { tombes.forEach(function (i) { i.classList.add('pied__tombe--la'); }); });
      garde(marque, function () { tombes.forEach(function (i) { i.style.transition = 'none'; i.classList.add('pied__tombe--la'); }); },
        function () { return tombes[0].classList.contains('pied__tombe--la'); });
    }
  }

  /* ---------- 5. Les ingrédients qui se baladent sur le chemin en pointillés ---------- */
  document.querySelectorAll('.trajet').forEach(function (sec) {
    var liste = sec.querySelector('.trajet__etapes'), etapes = [].slice.call(sec.querySelectorAll('.trajet__etapes li'));
    var svg = sec.querySelector('.trajet__chemin'), trace = svg && svg.querySelector('path.trace'), fait = svg && svg.querySelector('path.fait');
    var vehicules = [].slice.call(sec.querySelectorAll('.trajet__vehicule'));
    if (!liste || !svg || !trace || !vehicules.length) return;
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
      // un bowl en formes géométriques simples (aucune illustration) : bol, riz, saumon, avocat, edamame
      chargement.innerHTML = '<svg class="chargement__bol" viewBox="0 0 200 150">' +
        '<path class="p-bol" d="M14 62h172c0 46-38 78-86 78S14 108 14 62z"/>' +
        '<ellipse class="p-riz" cx="100" cy="62" rx="82" ry="20"/>' +
        '<g class="p-saumon"><rect x="58" y="40" width="22" height="18" rx="5"/><rect x="80" y="34" width="22" height="18" rx="5"/><rect x="68" y="52" width="22" height="16" rx="5"/></g>' +
        '<g class="p-avocat"><path d="M112 34c16 2 26 12 28 24-10-8-20-12-30-12z"/><path d="M118 50c14 2 22 8 24 18-9-6-17-8-26-8z"/></g>' +
        '<g class="p-edamame"><circle cx="44" cy="58" r="6"/><circle cx="52" cy="68" r="6"/><circle cx="40" cy="70" r="5"/><circle cx="150" cy="70" r="6"/><circle cx="160" cy="62" r="5"/></g>' +
        '</svg><p class="chargement__texte"><span class="chargement__prepare">On prépare votre bowl…</span><span class="chargement__pret">Prêt&nbsp;!</span></p>';
      document.body.appendChild(chargement);
      memoire('rb-vu', '1');
      if (G) {
        chargement.classList.add('chargement--gsap');
        racine.classList.remove('premier');
        var cq = function (s) { return chargement.querySelector(s); }, cbol = cq('.chargement__bol');
        var ctl = gsap.timeline({ onComplete: function () { chargement.remove(); } });
        ctl.from(cq('.p-bol'), { scale: 0, transformOrigin: '50% 100%', duration: 0.3, ease: 'back.out(2)' }, 0.05)
          .from(cq('.chargement__prepare'), { autoAlpha: 0, y: 10, duration: 0.2 }, 0.05);
        ['.p-riz', '.p-saumon', '.p-avocat', '.p-edamame'].forEach(function (s, k) {
          var t0 = 0.2 + k * 0.16;                                  // CRAV : 0,22 s entre deux couches → resserré pour tenir en 1,6 s
          ctl.from(cq(s), { autoAlpha: 0, y: -200, scale: 0.8, rotation: gsap.utils.random(-12, 12), transformOrigin: '50% 100%', duration: 0.3, ease: 'power1.in' }, t0)
            .to(cbol, { scaleX: 1.06, scaleY: 0.88, transformOrigin: '50% 100%', duration: 0.06 }, t0 + 0.3)
            .to(cbol, { scaleX: 0.98, scaleY: 1.03, duration: 0.08 }, t0 + 0.36)
            .to(cbol, { scaleX: 1, scaleY: 1, duration: 0.12 }, t0 + 0.44);
        });
        ctl.to(cq('.chargement__prepare'), { autoAlpha: 0, duration: 0.15 }, 0.9)
          .fromTo(cq('.chargement__pret'), { autoAlpha: 0, scale: 0.6, rotation: -8 }, { autoAlpha: 1, scale: 1, rotation: -3, duration: 0.3, ease: 'back.out(2.5)' }, 0.95)
          .to(chargement, { yPercent: -110, borderBottomLeftRadius: '50% 22%', borderBottomRightRadius: '50% 22%', duration: 0.42, ease: 'power3.inOut' }, 1.18);
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
        var s = SplitText.create(el, { type: lettres ? 'chars' : 'words', tag: 'span', wordsClass: 'mot', charsClass: 'mot' });
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

    // 4 bis. Histoire épinglée : ScrollTrigger pin ; à chaque étape, les ingrédients TOMBENT (0,32 s power1.in), se redressent
    // (0,45 s back.out(2.5)) et le bol s'écrase (×0,88 / ×1,06 puis ×1,03 / ×0,98 puis 1), valeurs du burger CRAV
    animsGsap.push(function (c) {
      document.querySelectorAll('.couches').forEach(function (sec) {
        sec.classList.add('couches--vif');
        var scene = sec.querySelector('.couches__scene'), bol = sec.querySelector('.couches__bol');
        var etapes = [].slice.call(sec.querySelectorAll('.couches__etapes li'));
        var fil = sec.querySelector('.couches__fil'), sauce = sec.querySelector('.couches__sauce');
        var morceaux = [].slice.call(sec.querySelectorAll('.couches__riz, .couches__ing'));
        var paliers = etapes.map(function (e) { return parseFloat(e.dataset.a); });
        var groupes = paliers.map(function (a) { return morceaux.filter(function (m) { return parseFloat(m.dataset.a) === a; }); });
        morceaux.forEach(function (m) { m._r = rotDe(m); });
        gsap.set(morceaux, { autoAlpha: 0 });
        var niveau = 0;
        function ecraser() {
          gsap.timeline().to(bol, { scaleX: 1.06, scaleY: 0.88, transformOrigin: '50% 70%', duration: 0.06 })
            .to(bol, { scaleX: 0.98, scaleY: 1.03, duration: 0.08 }).to(bol, { scaleX: 1, scaleY: 1, duration: 0.12 });
        }
        function tomber(k) {
          var g = groupes[k]; if (!g.length) return;
          gsap.killTweensOf(g);
          gsap.timeline()
            .fromTo(g, { autoAlpha: 1, yPercent: c.tel ? -220 : -320, scale: 0.8, rotation: function (i, e) { return e._r + rnd(-12, 12); } },
              { yPercent: 0, scale: 1, duration: 0.32, ease: 'power1.in', stagger: 0.05 })
            .to(g, { rotation: function (i, e) { return e._r; }, duration: 0.45, ease: 'back.out(2.5)', stagger: 0.05 }, 0.32)
            .call(ecraser, null, 0.32);
        }
        function remonter(k) { var g = groupes[k]; gsap.killTweensOf(g); gsap.to(g, { autoAlpha: 0, yPercent: -120, duration: 0.28, ease: 'back.in(1.2)' }); }
        function maj(p) {
          var q = Math.min(1, p * 1.08), n = 0;
          fil.style.setProperty('--fil', (1 - q).toFixed(3));
          paliers.forEach(function (a, i) { if (q >= a + 0.02 || (i === 0 && q > 0)) n = i + 1; });
          while (niveau < n) { tomber(niveau); niveau++; }
          while (niveau > n) { niveau--; remonter(niveau); }
          etapes.forEach(function (e, i) { e.classList.toggle('faite', i < n); e.classList.toggle('en-cours', i === Math.max(0, n - 1)); });
          sauce.style.setProperty('--sauce', (1 - Math.min(1, Math.max(0, (q - 0.8) / 0.16))).toFixed(3));
        }
        // secours : si l'horloge de GSAP ne tourne pas, on montre le bol complet au lieu d'un bol vide
        var image0 = gsap.ticker.frame;
        garde(bol, function () {
          gsap.set(morceaux, { autoAlpha: 1, yPercent: 0, scale: 1, rotation: function (i, e) { return e._r; } });
          niveau = groupes.length; fil.style.setProperty('--fil', '0'); sauce.style.setProperty('--sauce', '0');
          etapes.forEach(function (e) { e.classList.add('faite'); });
        }, function () { return niveau > 0 || gsap.ticker.frame > image0 + 10; });
        ScrollTrigger.create({
          trigger: scene, pin: true, anticipatePin: 1,
          start: function () { var h = document.querySelector('.entete'); return 'top ' + (h ? h.offsetHeight : 0); },
          end: c.tel ? '+=180%' : '+=200%',
          onUpdate: function (s) { maj(s.progress); }, onRefresh: function (s) { maj(s.progress); }
        });
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

    // 4 quater. Affiche rétro : le damier se dessine (classe CSS), la bulle poppe, les rayons tournent seulement quand l'affiche est à l'écran
    animsGsap.push(function () {
      document.querySelectorAll('.affiche').forEach(function (sec) {
        var rayons = sec.querySelector('.affiche__rayons'), bulle = sec.querySelector('.affiche__bulle');
        sec.classList.add('affiche--vif');
        var tour = gsap.to(rayons, { rotation: 360, duration: 40, ease: 'none', repeat: -1, paused: true });
        gsap.set(bulle, { scale: 0 });
        ScrollTrigger.create({ trigger: sec, start: 'top 75%', once: true, onEnter: function () {
          sec.classList.add('affiche--la');
          gsap.to(bulle, { scale: 1, duration: 0.45, ease: 'back.out(2.2)', delay: 1.05 });
        } });
        ScrollTrigger.create({ trigger: sec, start: 'top bottom', end: 'bottom top', onToggle: function (s) { if (s.isActive) tour.play(); else tour.pause(); } });
        garde(sec, function () { sec.classList.add('affiche--la'); gsap.set(bulle, { scale: 1 }); }, function () { return gsap.getProperty(bulle, 'scale') > 0.99; });
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
