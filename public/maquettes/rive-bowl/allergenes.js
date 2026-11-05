/* Rive Bowl · La carte : fiche « ingrédients et allergènes » façon borne de commande.
   Un clic (ou un toucher) sur un plat ouvre une fiche : grande photo, ingrédients (d'après la carte Dishop),
   les pictos des 14 allergènes réglementaires (ceux présents sont allumés). Se ferme au clic dehors, avec Échap et avec le bouton retour.
   ⚠️ Les allergènes sont une ESTIMATION de Studio FTT d'après les ingrédients : la liste exacte doit être fournie par le restaurant
   (obligation d'information, règlement INCO 1169/2011). Pour corriger un plat : modifier PLATS ci-dessous (clé = nom de l'image). */
(function () {
  'use strict';
  var grille = document.querySelector('.onglets');
  if (!grille) return;

  var SIG = 'avocat, concombre, carottes râpées, radis, chou rouge mariné, édamame, graines de sésame';
  // les 14 allergènes réglementaires, dans l'ordre officiel, avec un picto simple en trait (SVG 24 × 24)
  var ALLERGENES = [
    ['gluten', 'Gluten', 'M12 21V8M12 8C10 7 9 5 9 3c2 0 3 2 3 5zm0 0c2-1 3-3 3-5-2 0-3 2-3 5zM12 13c-2-1-3.5-2.5-3.5-4.5 2 0 3.5 2 3.5 4.5zm0 0c2-1 3.5-2.5 3.5-4.5-2 0-3.5 2-3.5 4.5zM12 18c-2-1-3.5-2.5-3.5-4.5 2 0 3.5 2 3.5 4.5zm0 0c2-1 3.5-2.5 3.5-4.5-2 0-3.5 2-3.5 4.5z'],
    ['crustaces', 'Crustacés', 'M18 6c-6 0-11 4-11 9 0 3 2 5 5 5h2M9 10l3 3M8 14l4 2M18 6l3-2M18 6l3 1'],
    ['oeufs', 'Œufs', 'M12 3c3.5 0 6 5 6 9.5S15.3 21 12 21s-6-4-6-8.5S8.5 3 12 3z'],
    ['poissons', 'Poissons', 'M3 12c3-4 7-5 11-5 3 0 5 2 7 5-2 3-4 5-7 5-4 0-8-1-11-5zM3 12 2 9M3 12l-1 3M16 11h.01'],
    ['arachides', 'Arachides', 'M10 3a4 4 0 0 1 4 4c0 1.5-1 2.3-1 3.5s1 2 1 3.5a4 4 0 1 1-8 0c0-1.5 1-2.3 1-3.5S6 8.5 6 7a4 4 0 0 1 4-4z'],
    ['soja', 'Soja', 'M5 18c3-8 8-12 14-12-1 7-6 12-14 12zM9 15h.01M12 12h.01M15 9h.01'],
    ['lait', 'Lait', 'M9 3h6M10 3v3L8 9v11h8V9l-2-3V3M8 13h8'],
    ['fruits-a-coque', 'Fruits à coque', 'M5 10h14M6 10c0 6 3 10 6 10s6-4 6-10M7 10c0-3 2.5-5 5-5s5 2 5 5M12 5V3'],
    ['celeri', 'Céleri', 'M8 21c0-6 0-12 1-17M12 21V4M16 21c0-6 0-12-1-17M9 4c1-1 5-1 6 0'],
    ['moutarde', 'Moutarde', 'M8 8h8v12H8zM9 4h6v4H9zM10 13h4'],
    ['sesame', 'Sésame', 'M8 9c-1.5 2-1.5 4 0 5 1.5-1 1.5-3 0-5zM15 5c-1.5 2-1.5 4 0 5 1.5-1 1.5-3 0-5zM14 13c-1.5 2-1.5 4 0 5 1.5-1 1.5-3 0-5z'],
    ['sulfites', 'Sulfites', 'M8 3h8c0 5-2 8-4 8s-4-3-4-8zM12 11v8M8 21h8'],
    ['lupin', 'Lupin', 'M12 21V11M12 4h.01M9 7h.01M15 7h.01M9.5 10.5h.01M14.5 10.5h.01'],
    ['mollusques', 'Mollusques', 'M4 16c0-6 4-10 8-10s8 4 8 10zM12 6v10M8 8l2 8M16 8l-2 8M4 16h16']
  ];
  // ingrédients d'après la carte Dishop (06/11/2026) ; allergènes ESTIMÉS d'après ces ingrédients
  var PLATS = {
    'bowl-teriyaki': { ingr: 'Riz vinaigré, poulet teriyaki, sauce teriyaki, ' + SIG + '.', all: ['gluten', 'soja', 'sesame'] },
    'bowl-crousty': { ingr: 'Poulet crousty (pané), ' + SIG + '.', all: ['gluten', 'soja', 'sesame'] },
    'bowl-rillauds': { ingr: 'Rillauds d’Anjou, ' + SIG + '.', all: ['soja', 'sesame'] },
    'bowl-saumon': { ingr: 'Saumon mariné, ' + SIG + '.', all: ['poissons', 'soja', 'sesame'] },
    'bowl-crevettes': { ingr: 'Crevettes marinées, ' + SIG + '.', all: ['crustaces', 'soja', 'sesame'] },
    'bowl-falafel': { ingr: 'Falafels, ' + SIG + '.', all: ['soja', 'sesame'] },
    'bowl-canard': { ingr: 'Effilochés de canard, ' + SIG + '.', all: ['soja', 'sesame'] },
    'bowl-maineetloire': { ingr: 'Recette du terroir angevin, ' + SIG + '.', all: ['soja', 'sesame'] },
    'carte-terroir': { ingr: 'À composer : 1 base, 1 protéine, 5 ingrédients, 2 toppings et 1 sauce au choix.', all: [], note: 'Les allergènes dépendent de votre composition.' },
    'carte-mini-rive': { ingr: 'Le menu des enfants.', all: [], note: 'Composition à confirmer par le restaurant.' },
    'carte-formule': { ingr: 'Un poké, une boisson et un cookie.', all: ['gluten', 'oeufs', 'lait', 'soja', 'sesame'] },
    'chaud-saumon': { ingr: 'Bouillon miso, carotte, chou blanc, édamame, champignons, potimarron et la protéine au choix.', all: ['soja'] },
    'carte-crousty': { ingr: 'Poulet crousty (pané), en version bowl.', all: ['gluten'] },
    'carte-aiguillettes': { ingr: 'Aiguillettes de poulet crousty, falafels, pizzas, velouté de potimarron aux graines de courge.', all: ['gluten', 'lait'] },
    'carte-sweet': { ingr: 'Cremet d’Anjou, Sweet Signature d’Anjou, salade de fruits, plaisir de mangue, cookie.', all: ['gluten', 'oeufs', 'lait'] },
    'carte-latte': { ingr: 'Latte des Rives, Mocha des Rives, Latte Anjou, bubble teas, cafés.', all: ['lait'] },
    'carte-lemonaid': { ingr: 'Citron vert, fruit de la passion ou orange sanguine.', all: [] }
  };
  function picto(a, on) {
    return '<li class="allerg' + (on ? ' allerg--on' : '') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + a[2] + '"/></svg><span>' + a[1] + '</span>' +
      '<span class="visuellement-cache">' + (on ? ' : présent' : ' : absent') + '</span></li>';
  }

  // la fiche (une seule, remplie à la demande)
  var voile = document.createElement('div');
  voile.className = 'fiche-plat__voile'; voile.hidden = true;
  voile.innerHTML = '<div class="fiche-plat" role="dialog" aria-modal="true" aria-labelledby="fiche-plat-nom">' +
    '<button class="fiche-plat__fermer" type="button" aria-label="Fermer la fiche">×</button><div class="fiche-plat__corps"></div></div>';
  document.body.appendChild(voile);
  var boite = voile.querySelector('.fiche-plat'), corps = voile.querySelector('.fiche-plat__corps'), fermerBtn = voile.querySelector('.fiche-plat__fermer');
  var source = null, parHistorique = false;

  function ouvrir(li) {
    var img = li.querySelector('.plat__img img'), cle = (img.getAttribute('src').split('/').pop() || '').replace('.webp', '');
    var p = PLATS[cle] || { ingr: 'Composition à confirmer par le restaurant.', all: [] };
    var nom = li.querySelector('.t-case').innerHTML, prix = (li.querySelector('.plat__prix') || {}).textContent || '';
    corps.innerHTML = '<div class="fiche-plat__photo ' + (li.classList.contains('plat--photo') ? 'fiche-plat__photo--cadre' : '') + '"><img src="' + img.getAttribute('src') + '" alt="" /></div>' +
      '<h2 class="fiche-plat__nom" id="fiche-plat-nom">' + nom + '</h2>' + (prix ? '<p class="fiche-plat__prix">' + prix + '</p>' : '') +
      '<h3 class="fiche-plat__titre">Ingrédients</h3><p class="fiche-plat__ingr">' + p.ingr + '</p>' +
      '<h3 class="fiche-plat__titre">Allergènes</h3><ul class="allergs">' + ALLERGENES.map(function (a) { return picto(a, p.all.indexOf(a[0]) > -1); }).join('') + '</ul>' +
      (p.note ? '<p class="fiche-plat__note">' + p.note + '</p>' : '') +
      '<p class="fiche-plat__avert">Allergènes indicatifs, liste exacte à fournir par le restaurant.</p>' +
      '<a class="btn btn--jaune fiche-plat__cmd" href="https://rivebowl.dishop.co/" target="_blank" rel="noopener">Commander <span class="fl" aria-hidden="true">→</span></a>';
    source = li.querySelector('.plat__ouvrir') || li;
    voile.hidden = false; document.body.classList.add('fiche-plat-ouverte');
    requestAnimationFrame(function () { voile.classList.add('fiche-plat__voile--on'); });
    setTimeout(function () { voile.classList.add('fiche-plat__voile--on'); }, 60);           // secours si l'animation ne tourne pas
    boite.scrollTop = 0; fermerBtn.focus({ preventScroll: true });
    try { history.pushState({ fichePlat: 1 }, ''); parHistorique = true; } catch (e) {}
  }
  function fermer(depuisHistorique) {
    if (voile.hidden) return;
    voile.classList.remove('fiche-plat__voile--on'); voile.hidden = true; document.body.classList.remove('fiche-plat-ouverte');
    if (source) source.focus({ preventScroll: true });
    if (parHistorique && !depuisHistorique) { parHistorique = false; try { history.back(); } catch (e) {} }
  }
  fermerBtn.addEventListener('click', function () { fermer(false); });
  voile.addEventListener('click', function (e) { if (e.target === voile) fermer(false); });
  document.addEventListener('keydown', function (e) {
    if (voile.hidden) return;
    if (e.key === 'Escape') fermer(false);
    if (e.key === 'Tab') {                                                    // le focus reste dans la fiche
      var f = [].slice.call(boite.querySelectorAll('button, a[href]')); if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  window.addEventListener('popstate', function () { if (!voile.hidden) { parHistorique = false; fermer(true); } });

  // chaque plat : toute la carte est cliquable, avec un vrai bouton pour le clavier et les lecteurs d'écran
  grille.querySelectorAll('.plat').forEach(function (li) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'plat__ouvrir'; b.setAttribute('aria-haspopup', 'dialog');
    b.innerHTML = 'Ingrédients &amp; allergènes';
    li.appendChild(b);
    li.addEventListener('click', function () { ouvrir(li); });
  });
})();
