/* Rive Bowl · tout ce qui rend le site « vivant », sans librairie (mécanique relevée sur cravburgers.shop, cf.
   G:/Studio FTT/CRM/rive-bowl-docs/analyse-animations-crav.md) :
   1. titres qui arrivent mot par mot (taille 0, penchés, gros rebond) ; 2. tampons et autocollants qui « poppent » ;
   3. ingrédients qui volent autour du grand titre au défilement ; 4. bowl qui se compose au défilement ;
   5. bateau de Loire qui suit un chemin en pointillés ; 6. titre de l'onglet qui change.
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
  var titres = document.querySelectorAll('.t-l, .t-xl, [data-vivant]');
  titres.forEach(function (el) {
    if (el.closest('.tiroir, .fiche, .une')) return;              // le carrousel anime ses titres lui-même (plus bas)
    if (reduit) return;
    // un mot coupé par une césure (&shy;) ne peut pas devenir un bloc : ce titre arrive d'un seul tenant
    if (el.innerHTML.indexOf('\u00AD') > -1 || el.innerHTML.indexOf('&shy;') > -1) {
      el.classList.add('pop-attente');
      unefois(el, SEUIL_TITRES, function () { el.classList.add('pop-parti'); });
      return;
    }
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    decouper(el, el.getAttribute('data-vivant') === 'lettres');
    el.classList.add('mots-attente');
    unefois(el, SEUIL_TITRES, function () { el.classList.add('mots-partis'); });
  });
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

  /* ---------- 2. Tampons (sur-titres, étiquettes) et autocollants : « pop » penché, en quinconce ---------- */
  if (!reduit) {
    document.querySelectorAll('.sur, .etiquette span, .autocollant').forEach(function (el) {
      if (el.closest('.tiroir, .fiche')) return;
      el.style.setProperty('--r0', hasard(-15, 15).toFixed(1) + 'deg');
      if (el.classList.contains('autocollant')) el.style.setProperty('--r1', hasard(-9, 9).toFixed(1) + 'deg');
      el.classList.add('tampon-attente');
      unefois(el, SEUIL_AUTOCOLLANTS, function () { el.classList.add('tampon-parti'); });
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
    if (el.offsetHeight > window.innerHeight) {
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

  /* ---------- 5. Le bateau de Loire sur le chemin en pointillés ---------- */
  document.querySelectorAll('.trajet').forEach(function (sec) {
    var liste = sec.querySelector('.trajet__etapes'), etapes = [].slice.call(sec.querySelectorAll('.trajet__etapes li'));
    var svg = sec.querySelector('.trajet__chemin'), trace = svg && svg.querySelector('path.trace'), fait = svg && svg.querySelector('path.fait');
    var bateau = sec.querySelector('.trajet__vehicule');
    if (!liste || !svg || !trace || !bateau) return;
    var L = 0, points = [], sens = false;
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
      // à quelle longueur du chemin se trouve chaque étape (pour la faire apparaître quand le bateau passe)
      etapes.forEach(function (e, n) {
        var lo = 0, hi = L, cible = points[n][1];
        for (var i = 0; i < 24; i++) { var mid = (lo + hi) / 2; if (trace.getPointAtLength(mid).y < cible) lo = mid; else hi = mid; }
        e.dataset.l = lo;
      });
    }
    function placer(t) {
      var l = L * t, p = trace.getPointAtLength(l), p2 = trace.getPointAtLength(Math.min(L, l + 2));
      var angle = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;
      var dx = p2.x - p.x; if (Math.abs(dx) > 0.05) sens = dx < 0;  // le bateau regarde dans le sens où il va
      var retourne = sens;
      bateau.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px) translate(-50%,-70%) rotate(' + Math.max(-12, Math.min(12, (retourne ? angle - 180 : angle) * 0.2)) + 'deg) scaleX(' + (retourne ? -1 : 1) + ')';
      fait.style.strokeDashoffset = L - l;
      etapes.forEach(function (e) { e.classList.toggle('la', l >= parseFloat(e.dataset.l) - 30); });
    }
    dessiner();
    if (window.ResizeObserver) new ResizeObserver(function () { dessiner(); }).observe(liste);
    if (reduit) { placer(1); sec.classList.add('trajet--fini'); return; }
    sec.classList.add('trajet--vivant');
    suivre(liste, function (p) { placer(Math.min(1, Math.max(0, (p - 0.15) / 0.6))); });
  });

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
