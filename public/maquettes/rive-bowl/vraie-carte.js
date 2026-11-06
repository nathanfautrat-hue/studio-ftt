/* Rive Bowl · vraie carte zoomable (page Restaurants), façon leoff-paris.com.
   MapLibre GL JS 5.24.0 (libre, cdnjs, empreinte SRI) + tuiles OpenFreeMap (gratuites, sans clé, sans compte, sans cookie ; données OpenStreetMap).
   - MapLibre (≈ 250 Ko) se charge SEULEMENT quand la carte arrive près de l'écran, jamais au chargement de la page ;
   - pas de zoom à la molette (donc aucun message « Ctrl + molette ») ; boutons + et − ; sur téléphone, un doigt fait défiler la PAGE,
     deux doigts zooment ; pas de cooperativeGestures ;
   - épingles rondes aux couleurs de la marque, lues dans le JSON #restaurants-data ; au clic, une fiche blanche arrondie ;
   - si MapLibre ou le fond de carte ne se chargent pas, le plan SVG dessiné d'après OpenStreetMap reste affiché (secours). */
(function () {
  'use strict';
  var boite = document.querySelector('.carte-vraie');
  if (!boite) return;
  var conteneur = boite.querySelector('.carte-vraie__map');
  var VERSION = '5.24.0', CDN = 'https://cdnjs.cloudflare.com/ajax/libs/maplibre-gl/' + VERSION + '/';
  var SRI_JS = 'sha512-hoXlvOdSmh58mppUyZHZsscHkR/yXl6zLpTMTNwA6IZ61DpeaCNjosRu1WJ2DeIpkfW5MsJJ9H89zjV4IBGqRw==';
  var SRI_CSS = 'sha512-KIMsMWIdnoG9OwZa+oaIafmbDonqck1UCmq+/zcUi2aaZ97N9QE6TqpTM+n36EO40HGh64hU/375zxtjx7WTyQ==';
  var STYLE = 'https://tiles.openfreemap.org/styles/positron';
  var lance = false;

  function charger() {
    if (lance) return; lance = true;
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = CDN + 'maplibre-gl.min.css'; css.integrity = SRI_CSS; css.crossOrigin = 'anonymous'; css.referrerPolicy = 'no-referrer';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = CDN + 'maplibre-gl.min.js'; js.integrity = SRI_JS; js.crossOrigin = 'anonymous'; js.referrerPolicy = 'no-referrer';
    js.onload = function () { try { demarrer(); } catch (e) { secours(); } };
    js.onerror = secours;
    document.head.appendChild(js);
  }
  function secours() { boite.classList.remove('carte-vraie--prete'); if (conteneur) conteneur.hidden = true; }

  // couleurs du brand book, posées sur le style « Positron » d'OpenFreeMap
  var C = { fond: '#FBF6EE', eau: '#BFE6E8', riviere: '#9FD8DC', parc: '#D3DFC4', bati: '#EFE6D8', habite: '#F6EFE3', route: '#FFFDF7', bord: '#E6D9C3', texte: '#03432F', halo: '#FDF8F2' };
  function teindre(map) {
    map.getStyle().layers.forEach(function (l) {
      var id = l.id, t = l.type;
      function p(k, v) { try { map.setPaintProperty(id, k, v); } catch (e) {} }
      if (t === 'background') p('background-color', C.fond);
      else if (t === 'fill' && /water/.test(id)) p('fill-color', C.eau);
      else if (t === 'line' && /water/.test(id)) p('line-color', C.riviere);
      else if (t === 'fill' && /park|wood|grass|landcover|landuse_(park|cemetery)|forest/.test(id)) p('fill-color', C.parc);
      else if (t === 'fill' && /building/.test(id)) p('fill-color', C.bati);
      else if (t === 'fill' && /landuse|residential|aeroway/.test(id)) { p('fill-color', C.habite); p('fill-opacity', 1); }
      else if (t === 'line' && /(road|highway|street|bridge|tunnel|path|rail)/.test(id)) p('line-color', /casing|outline/.test(id) ? C.bord : C.route);
      else if (t === 'symbol') { p('text-color', C.texte); p('text-halo-color', C.halo); }
    });
  }
  function fiche(r) {
    var b = r.commander || r.itineraire
      ? '<a class="fiche-resto__btn" href="' + (r.itineraire || r.commander) + '" target="_blank" rel="noopener">' + (r.itineraire ? 'Itinéraire' : 'Commander') + ' →</a>' : '';
    return '<p class="fiche-resto__nom">' + (r.nom || ('Rive Bowl ' + r.ville)).replace(/(\S+-\S+)/g, '<span class="insecable">$1</span>') + (r.statut === 'bientot' ? ' <i>Bientôt</i>' : '') + '</p>' +
      '<dl class="fiche-resto__infos">' +
      '<dt>Adresse</dt><dd>' + (r.adresse || 'À venir') + '</dd>' +
      (r.telephone ? '<dt>Téléphone</dt><dd><a href="tel:' + r.telephone.replace(/\s/g, '').replace(/^0/, '+33') + '">' + r.telephone + '</a></dd>' : '') +
      '<dt>Type</dt><dd>' + (r.type || 'Poké bar') + '</dd>' + (window.RiveBowlServices ? window.RiveBowlServices.court(r) : '') + '</dl>' + b;
  }
  function demarrer() {
    var ml = window.maplibregl;
    if (!ml || !conteneur) return secours();
    var donnees = [];
    try { donnees = JSON.parse(document.getElementById('restaurants-data').textContent); } catch (e) {}
    var restos = donnees.filter(function (r) { return r.statut !== 'franchise'; });
    var depart = restos[0] || { lat: 47.3899858, lon: -0.8622168 };
    var tactile = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    var map = new ml.Map({
      container: conteneur, style: STYLE, center: [depart.lon, depart.lat], zoom: 15.2, minZoom: 6, maxZoom: 18,
      scrollZoom: false, dragRotate: false, pitchWithRotate: false, touchPitch: false, cooperativeGestures: false,
      attributionControl: { compact: false },
      locale: { 'NavigationControl.ZoomIn': 'Zoomer', 'NavigationControl.ZoomOut': 'Dézoomer', 'Popup.Close': 'Fermer la fiche',
        'AttributionControl.ToggleAttribution': 'Afficher les crédits', 'AttributionControl.MapFeedback': 'Signaler une erreur de carte' }
    });
    boite._carte = map;                                          // (accès pour les contrôles automatiques)
    if (tactile) { map.dragPan.disable(); }                     // un doigt : la page défile ; deux doigts : zoom
    map.touchZoomRotate.disableRotation();
    map.addControl(new ml.NavigationControl({ showCompass: false }), 'top-right');
    map.setPadding({ top: Math.round(conteneur.clientHeight * (conteneur.clientWidth < 600 ? 0.62 : 0.3)), left: 0, right: 0, bottom: 0 });   // l'épingle plus bas : la fiche a la place de s'ouvrir au-dessus
    var minuteur = setTimeout(secours, 10000);                   // pas de fond de carte au bout de 10 s : on garde le plan
    map.on('load', function () {
      clearTimeout(minuteur);
      if (conteneur.hidden) conteneur.hidden = false;           // chargée en retard (réseau lent) : on l'affiche quand même
      teindre(map);
      boite.classList.add('carte-vraie--prete');
      restos.forEach(function (r) {
        var el = document.createElement('button');
        el.type = 'button'; el.className = 'epingle' + (r.statut === 'bientot' ? ' epingle--bientot' : '');
        el.setAttribute('aria-label', (r.nom || 'Rive Bowl ' + r.ville) + (r.statut === 'bientot' ? ', bientôt' : '') + ' : voir la fiche');
        el.innerHTML = '<span class="epingle__rond"></span>';      // un simple point qui pulse (retour de Nathan du 06/11)
        var pop = new ml.Popup({ anchor: 'bottom', offset: [0, -18], maxWidth: '290px', className: 'fiche-resto', focusAfterOpen: true }).setHTML(fiche(r));
        new ml.Marker({ element: el, anchor: 'center' }).setLngLat([r.lon, r.lat]).setPopup(pop).addTo(map);
      });
    });
    map.on('error', function (e) { if (!boite.classList.contains('carte-vraie--prete') && e && e.error && /style/i.test(String(e.error.message))) secours(); });
  }

  // chargement paresseux : quand la carte approche de l'écran (secours en setTimeout si l'observateur ne se déclenche pas)
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); charger(); } }, { rootMargin: '300px 0px' });
    io.observe(boite);
  }
  (function verif() {
    if (lance) return;
    var r = boite.getBoundingClientRect();
    if (r.top < window.innerHeight + 300 && r.bottom > -300) { charger(); return; }
    setTimeout(verif, 400);
  })();
})();
