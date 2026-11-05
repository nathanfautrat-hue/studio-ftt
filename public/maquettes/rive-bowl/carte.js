/* Rive Bowl · carte des Pays de la Loire (page Restaurants), mécanique relevée sur leoff-paris.com :
   - au survol (ou au toucher) d'un département, il se soulève en corail au-dessus de son socle et son nom en grand monte d'un masque ;
   - un repère par restaurant : un rond avec la photo d'un bowl, qui « poppe » puis flotte doucement ; au clic, une fiche s'ouvre ;
   - « Bientôt » : repère en pointillés ; un repère « Votre ville ici ? » renvoie vers la page Franchise.
   Pour ajouter un restaurant : compléter la liste JSON #restaurants-data dans restaurants.html (lat / lon en degrés). */
(function () {
  'use strict';
  var carte = document.querySelector('.carte-pdl__carte');
  if (!carte) return;
  var svg = carte.querySelector('.carte__svg'), haut = svg.querySelector('.carte__haut');
  var noms = [].slice.call(carte.querySelectorAll('.carte__nom'));
  var reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var G = !reduit && window.gsap && window.ScrollTrigger;

  // 1. Départements : soulèvement + nom en grand
  var actif = null;
  function montrer(dep) {
    if (actif === dep) return;
    actif = dep;
    noms.forEach(function (n) { n.classList.toggle('carte__nom--actif', !!dep && n.dataset.dep === dep.dataset.dep); });
    if (!dep) { haut.classList.remove('carte__haut--on'); return; }
    haut.classList.remove('carte__haut--on');
    haut.setAttribute('d', dep.getAttribute('d'));
    void haut.getBoundingClientRect();
    haut.classList.add('carte__haut--on');
  }
  svg.querySelectorAll('.carte__dep').forEach(function (dep) {
    dep.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') montrer(dep); });
    dep.addEventListener('click', function () { montrer(actif === dep ? null : dep); });
  });
  svg.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') montrer(null); });

  // 2. Restaurants (liste JSON dans la page) → repères en photo, placés avec la même projection que la carte
  var donnees = [];
  try { donnees = JSON.parse(document.getElementById('restaurants-data').textContent); } catch (e) {}
  var P = carte.dataset;                                       // projection : x = (lon × kx − minx) × S ; y = (−lat − miny) × S
  function place(lat, lon) {
    return [((lon * +P.kx - +P.minx) * +P.s) / +P.w * 100, ((-lat - +P.miny) * +P.s) / +P.h * 100];
  }
  var fiche = carte.querySelector('.carte__fiche'), ficheCorps = fiche.querySelector('.carte__fiche-corps');
  var reperes = [];
  donnees.forEach(function (r) {
    var p = place(r.lat, r.lon);
    var el = document.createElement(r.lien ? 'a' : 'button');
    el.className = 'carte__repere carte__repere--' + (r.statut || 'ouvert');
    el.style.left = p[0].toFixed(2) + '%'; el.style.top = p[1].toFixed(2) + '%';
    if (r.lien) { el.href = r.lien; } else { el.type = 'button'; el.setAttribute('aria-haspopup', 'dialog'); }
    el.setAttribute('aria-label', r.lien ? r.titre : (r.ville + (r.statut === 'bientot' ? ', bientôt' : '') + ' : voir la fiche'));
    el.innerHTML = '<span class="carte__flotte">' +
      (r.photo ? '<img src="' + r.photo + '" alt="" width="120" height="120" loading="lazy" />' : '<b aria-hidden="true">+</b>') +
      '</span><span class="carte__etiquette">' + (r.etiquette || r.ville) + (r.statut === 'bientot' ? ' <i>Bientôt</i>' : r.statut === 'franchise' ? ' <i>Devenez franchisé</i>' : r.sous ? ' <i class="carte__sous">' + r.sous + '</i>' : '') + '</span>';
    if (!r.lien) el.addEventListener('click', function (e) { e.stopPropagation(); ouvrir(r, el); });
    carte.appendChild(el); reperes.push(el);
  });

  // 3. La fiche : ville, adresse, Commander / Itinéraire ; se ferme au clic dehors, avec Échap et avec le bouton retour
  var source = null, parHistorique = false;
  function ouvrir(r, el) {
    source = el; montrer(null);
    var b = '';
    if (r.commander) b += '<a class="btn btn--jaune" href="' + r.commander + '" target="_blank" rel="noopener">Commander <span class="fl" aria-hidden="true">→</span></a>';
    if (r.itineraire) b += '<a class="btn btn--contour" href="' + r.itineraire + '" target="_blank" rel="noopener">Itinéraire <span class="fl" aria-hidden="true">→</span></a>';
    ficheCorps.innerHTML = '<p class="carte__fiche-statut">' + (r.statut === 'bientot' ? 'Bientôt' : 'Ouvert') + '</p>' +
      '<h3 class="carte__fiche-ville" id="fiche-ville">' + r.ville + '</h3>' +
      '<p class="carte__fiche-adresse">' + (r.adresse || 'Ouverture prochaine') + '</p>' + (b ? '<div class="carte__fiche-btns">' + b + '</div>' : '');
    var pc = parseFloat(el.style.left);
    fiche.style.setProperty('--fx', el.style.left); fiche.style.setProperty('--fy', el.style.top);
    fiche.classList.toggle('carte__fiche--gauche', pc > 55);
    fiche.hidden = false;
    requestAnimationFrame(function () { fiche.classList.add('carte__fiche--ouverte'); });
    setTimeout(function () { fiche.classList.add('carte__fiche--ouverte'); }, 50);     // secours si l'animation ne tourne pas
    fiche.querySelector('.carte__fiche-fermer').focus({ preventScroll: true });
    try { history.pushState({ fiche: 1 }, ''); parHistorique = true; } catch (e) {}
  }
  function fermer(depuisHistorique) {
    if (fiche.hidden) return;
    fiche.classList.remove('carte__fiche--ouverte'); fiche.hidden = true;
    if (source) source.focus({ preventScroll: true });
    if (parHistorique && !depuisHistorique) { parHistorique = false; try { history.back(); } catch (e) {} }
  }
  fiche.querySelector('.carte__fiche-fermer').addEventListener('click', function () { fermer(false); });
  fiche.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('click', function () { fermer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermer(false); });
  window.addEventListener('popstate', function () { if (!fiche.hidden) { parHistorique = false; fermer(true); } });

  // 4. Mouvement : les repères « poppent » quand la carte arrive, puis flottent (GSAP ; sinon une petite animation CSS)
  if (reduit) return;
  if (!G) { carte.classList.add('carte--flotte-css'); return; }
  gsap.registerPlugin(ScrollTrigger);
  var bulles = reperes.map(function (r) { return r.querySelector('.carte__flotte'); });
  var pop = gsap.from(bulles, { scale: 0, rotation: function () { return gsap.utils.random(-20, 20); }, duration: 0.45, ease: 'back.out(2.2)', stagger: 0.12,
    scrollTrigger: { trigger: carte, start: 'top 70%', once: true } });
  bulles.forEach(function (b, n) {
    gsap.to(b, { y: -7, duration: 1.25 + n * 0.15, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: n * 0.3 });
  });
  // secours en temps : si l'horloge GSAP ne tourne pas, les repères s'affichent quand même au bout d'1 s à l'écran
  var vu = 0;
  (function verif() {
    if (pop.progress() === 1) return;
    var r = carte.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) { if (!vu) vu = Date.now(); else if (Date.now() - vu > 1000) { pop.progress(1); return; } } else vu = 0;
    setTimeout(verif, 200);
  })();
})();
