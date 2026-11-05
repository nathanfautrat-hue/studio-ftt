/* Rive Bowl · le slogan qui suit un méandre de Loire (accueil, sous le carrousel).
   Mécanique reprise du composant 21st « Marquee Along SVG Path » (Daniel Petho), sans React ni librairie motion :
   CSS offset-path: path('…') + offset-distance calculé à chaque image (requestAnimationFrame).
   Le bandeau droit d'origine (.defile-texte[data-meandre]) reste dans la page : il ne disparaît que si le navigateur
   sait suivre une courbe. Si « réduire les animations » est activé, les mots sont posés le long de la courbe, immobiles.
   Studio FTT, 06/11/2026. */
(function () {
  'use strict';

  /* ================= RÉGLAGES (à modifier ici) ================= */
  var VITESSE = 8;            // % de la longueur de la courbe parcouru par seconde (8 = réglage d'origine)
  var RALENTI = 0.3;          // vitesse au survol de la souris (×0,3 d'origine)
  var GLISSER = 0.1;          // sensibilité au doigt et à la souris (0,1 d'origine)
  var FREIN = 0.96;           // élan après avoir lâché (0,96 d'origine)
  var ONDULATION = 0.22;      // hauteur des boucles, en part de la hauteur du bandeau
  /* ============================================================= */

  var source = document.querySelector('.defile-texte[data-meandre]');
  if (!source) return;
  if (!(window.CSS && CSS.supports && CSS.supports('offset-path', 'path("M0 0L1 1")'))) return;   // bandeau droit gardé
  var immobile = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // les phrases du bandeau d'origine
  var phrases = (source.getAttribute('aria-label') || '').split(' · ').filter(Boolean);
  if (!phrases.length) return;

  var NS = 'http://www.w3.org/2000/svg';
  var bloc = document.createElement('div');
  bloc.className = 'meandre ' + [].filter.call(source.classList, function (c) { return /^c-/.test(c); }).join(' ');
  bloc.setAttribute('role', 'note');
  bloc.setAttribute('aria-label', source.getAttribute('aria-label'));
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'meandre__riviere');
  svg.setAttribute('aria-hidden', 'true');
  var trace = document.createElementNS(NS, 'path');
  svg.appendChild(trace);
  var piste = document.createElement('div');
  piste.className = 'meandre__mots';
  piste.setAttribute('aria-hidden', 'true');
  bloc.appendChild(svg);
  bloc.appendChild(piste);
  source.parentNode.insertBefore(bloc, source);
  source.hidden = true;

  // une série = toutes les phrases, mot par mot, avec un point entre deux phrases
  function serie() {
    var mots = [];
    phrases.forEach(function (p) { p.split(' ').forEach(function (m) { mots.push({ t: m, sep: false }); }); mots.push({ t: '·', sep: true }); });
    return mots;
  }

  var items = [], longueur = 0, boucle = 0, base = 0, d = '';

  function construire() {
    var W = bloc.clientWidth, H = bloc.clientHeight;
    if (!W || !H) return;
    // méandre : demi-boucles douces, de part et d'autre de la ligne médiane, qui sortent de l'écran des deux côtés
    // sinusoïde lissée : points hauts et bas alternés, tangentes horizontales
    var lambda = Math.max(W * 0.5, 420), A = H * ONDULATION, x = -lambda * 0.5, k = 0, yc = H * 0.62;
    d = 'M' + x.toFixed(1) + ' ' + yc.toFixed(1);
    var yPrec = yc;
    while (x < W + lambda * 0.5) {
      var xn = x + lambda / 2, yn = yc + (k % 2 === 0 ? -A : A);
      d += ' C' + (x + lambda / 5).toFixed(1) + ' ' + yPrec.toFixed(1) + ' ' + (xn - lambda / 5).toFixed(1) + ' ' + yn.toFixed(1) + ' ' + xn.toFixed(1) + ' ' + yn.toFixed(1);
      x = xn; yPrec = yn; k++;
    }
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    trace.setAttribute('d', d);
    longueur = trace.getTotalLength();

    // assez de mots pour couvrir toute la courbe, plus une série pour boucler sans trou
    piste.textContent = '';
    items = [];
    var debut = 0, ecart = 0;
    var essai = document.createElement('span'); essai.textContent = 'M'; piste.appendChild(essai);
    ecart = essai.getBoundingClientRect().width * 0.7;    // espace entre deux mots, proportionnel à la taille du texte
    piste.textContent = '';
    while (debut < longueur + 400 || items.length === 0) {
      serie().forEach(function (m) {
        var s = document.createElement('span');
        s.textContent = m.t;
        if (m.sep) s.className = 'sep';
        s.style.offsetPath = "path('" + d + "')";
        piste.appendChild(s);
        var w = s.getBoundingClientRect().width;
        items.push({ el: s, debut: debut + w / 2, w: w });
        debut += w + ecart;
      });
    }
    boucle = debut;
    placer();
  }

  function placer() {
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var pos = ((it.debut + base) % boucle + boucle) % boucle;
      var dedans = pos > -it.w && pos < longueur + it.w;
      it.el.style.offsetDistance = Math.min(Math.max(pos, 0), longueur).toFixed(1) + 'px';
      it.el.style.visibility = dedans && pos >= 0 && pos <= longueur ? 'visible' : 'hidden';
    }
  }

  construire();
  if (window.ResizeObserver) new ResizeObserver(function () { construire(); }).observe(bloc);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(construire);
  if (immobile) { bloc.classList.add('meandre--immobile'); return; }

  // animation : vitesse d'origine, ralenti au survol, glisser au doigt ou à la souris, pause hors écran
  var raf = 0, dernier = null, vue = false, visible = document.visibilityState === 'visible';
  var survol = false, facteur = 1, glisse = false, elan = 0, xPrec = 0;
  function demander() { if (vue && visible && !raf) raf = requestAnimationFrame(image); }
  function arreter() { if (raf) { cancelAnimationFrame(raf); raf = 0; } dernier = null; }
  function image(t) {
    raf = 0;
    var dt = dernier === null ? 0 : Math.min((t - dernier) / 1000, 0.1);
    dernier = t;
    facteur += ((survol ? RALENTI : 1) - facteur) * (1 - Math.exp(-10 * dt));   // ressort doux vers la vitesse visée
    if (glisse) { base += elan; elan *= 0.9; }
    else { base += (VITESSE / 100) * longueur * dt * facteur + elan; elan *= FREIN; if (Math.abs(elan) < 0.01) elan = 0; }
    placer();
    demander();
  }
  bloc.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') survol = true; });
  bloc.addEventListener('pointerleave', function () { survol = false; });
  bloc.addEventListener('pointerdown', function (e) {
    glisse = true; xPrec = e.clientX; elan = 0;
    bloc.classList.add('meandre--glisse');
    try { bloc.setPointerCapture(e.pointerId); } catch (err) {}
  });
  bloc.addEventListener('pointermove', function (e) {
    if (!glisse) return;
    var dx = e.clientX - xPrec; xPrec = e.clientX;
    elan = dx * GLISSER * longueur / 100;
  });
  function lacher() { glisse = false; bloc.classList.remove('meandre--glisse'); }
  bloc.addEventListener('pointerup', lacher);
  bloc.addEventListener('pointercancel', lacher);
  new IntersectionObserver(function (e) { vue = e[0].isIntersecting; if (vue) demander(); else arreter(); }).observe(bloc);
  document.addEventListener('visibilitychange', function () { visible = document.visibilityState === 'visible'; if (visible) demander(); else arreter(); });
})();
