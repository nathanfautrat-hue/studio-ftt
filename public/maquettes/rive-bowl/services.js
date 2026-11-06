/* Rive Bowl · page Restaurants : la fiche de SERVICES de chaque restaurant, façon pages restaurants de Pokawa.
   SOURCE DE VÉRITÉ : la fiche Google de chaque restaurant (rubrique « À propos »). Alexandre n'a qu'à la tenir à jour,
   puis on recopie ici les réponses, dans le JSON #restaurants-data de restaurants.html (champ "services").
   Trois états par service : true = oui (affiché), false = non, null ou absent = inconnu (rien n'est affiché).
   L'accessibilité en fauteuil roulant est TOUJOURS affichée quand on la connaît, même si c'est « non » (picto barré) :
   ça évite un déplacement pour rien. Un restaurant de plus = une entrée de plus dans le JSON et un <li class="lieu" data-resto="…">. */
(function () {
  'use strict';
  var donnees = [];
  try { donnees = JSON.parse(document.getElementById('restaurants-data').textContent); } catch (e) { return; }
  var P = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>'; };
  // ordre d'affichage (l'accessibilité en premier, comme chez Pokawa)
  var SERVICES = [
    ['fauteuil', 'Entrée accessible en fauteuil roulant', 'Entrée avec marches, non accessible en fauteuil', P('M10 3.5a1.5 1.5 0 1 0 0 .01M10 7v6h5l2 5M10 10h5M8.5 11.5a5 5 0 1 0 6.5 6')],
    ['sur_place', 'Sur place', '', P('M5 15h14c0 4-3 7-7 7s-7-3-7-7zM9 11c-1-1.5 1-2.5 0-4M12 11c-1-1.5 1-2.5 0-4M15 11c-1-1.5 1-2.5 0-4')],
    ['emporter', 'À emporter', '', P('M6 9h12l-1.2 12H7.2zM9.5 9V7a2.5 2.5 0 0 1 5 0v2')],
    ['click_collect', 'Click & Collect', '', P('M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2')],
    ['livraison', 'Livraison', '', P('M3 16h3l2-6h6l3 6h2M7 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01M14 10V7h-3')],
    ['bornes', 'Bornes de commande', '', P('M7 3h10v14H7zM12 17v4M9 21h6M9.5 7h5M9.5 10h3')],
    ['comptoir', 'Commande au comptoir', '', P('M3 18h18M5 18a7 7 0 0 1 14 0M12 9V7M10 7h4')],
    ['vegetarien', 'Options végétariennes', '', P('M5 19c0-9 6-14 14-14 0 9-5 14-14 14zM5 19l8-8')],
    ['cartes', 'Cartes de paiement', '', P('M3 6h18v12H3zM3 10h18M7 15h4')],
    ['sans_contact', 'Paiement sans contact', '', P('M8 8a6 6 0 0 1 0 8M12 6a9 9 0 0 1 0 12M16 4a12 12 0 0 1 0 16')],
    ['titres_resto', 'Titres-restaurant', '', P('M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4zM14 7v10')],
    ['terrasse', 'Terrasse', '', P('M12 4v17M4 11a8 7 0 0 1 16 0zM8 21h8')],
    ['wifi', 'Wi-Fi', '', P('M4 10a11 11 0 0 1 16 0M7.5 13.5a6 6 0 0 1 9 0M12 18h.01')],
    ['chaises_hautes', 'Chaises hautes', '', P('M8 3h8v8H8zM9 11l-2 10M15 11l2 10M7.5 16h9')],
    ['toilettes', 'Toilettes', '', P('M7 21v-6H5l2-7h2l2 7H9v6M16 4a1.5 1.5 0 1 0 0 .01M14.5 8h3v6h-1v7h-1v-7h-1z')]
  ];
  // la barre d'actions : seulement les modes qui existent dans CE restaurant
  var MODES = [['sur_place', 'Sur place', 'itineraire'], ['emporter', 'À emporter', 'commander'], ['click_collect', 'Click & Collect', 'commander'], ['livraison', 'Livraison', 'commander']];

  window.RiveBowlServices = {
    // version courte pour la petite fiche de la vraie carte
    court: function (r) {
      var s = r.services || {};
      var noms = SERVICES.filter(function (x) { return s[x[0]] === true && x[0] !== 'fauteuil'; }).map(function (x) { return x[1]; });
      var acces = s.fauteuil === true ? 'Accessible en fauteuil' : s.fauteuil === false ? 'Non accessible en fauteuil' : '';
      return (noms.length ? '<dt>Services</dt><dd>' + noms.slice(0, 3).join(' · ') + '</dd>' : '') + (acces ? '<dt>Accès</dt><dd>' + acces + '</dd>' : '');
    }
  };

  document.querySelectorAll('.lieu[data-resto]').forEach(function (li) {
    var r = donnees.filter(function (x) { return x.id === li.dataset.resto; })[0];
    if (!r || !r.services) return;
    var s = r.services;
    // 1. barre d'actions collante
    var barre = li.querySelector('.lieu__modes');
    if (barre) {
      barre.innerHTML = MODES.filter(function (m) { return s[m[0]] === true && r[m[2]]; }).map(function (m) {
        return '<a class="lieu__mode" href="' + r[m[2]] + '" target="_blank" rel="noopener">' + m[1] + '</a>';
      }).join('');
      if (!barre.children.length) barre.remove();
    }
    // 2. « Nos services » : les services présents, et l'accessibilité dès qu'elle est connue (même « non »)
    var liste = li.querySelector('.services-mj');
    if (!liste) return;
    var html = SERVICES.filter(function (x) { return s[x[0]] === true || (x[0] === 'fauteuil' && s.fauteuil === false); }).map(function (x) {
      var non = s[x[0]] === false;
      return '<li class="' + (non ? 'service--non' : '') + '">' + x[3] + '<span>' + (non ? x[2] : x[1]) + '</span></li>';
    }).join('');
    if (html) liste.innerHTML = html;
  });
})();
