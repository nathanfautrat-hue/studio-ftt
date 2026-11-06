// Rive Bowl · maquette v5 · menu téléphone, carrousels, haut de page, pastilles de la carte, apparition douce
(function(){
  document.documentElement.classList.add('js');
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menu téléphone (façon Pokawa : panneau plein écran qui glisse depuis la droite, page bloquée derrière)
  var b = document.querySelector('.burger'), t = document.getElementById('tiroir');
  var fermerBtn = t && t.querySelector('.tiroir__fermer');
  var parHistorique = false;
  function ouvrir(){
    // le cercle part du bouton menu (façon CRAV)
    var r = b.getBoundingClientRect();
    t.style.setProperty('--cx', (r.left + r.width / 2) + 'px'); t.style.setProperty('--cy', (r.top + r.height / 2) + 'px');
    t.classList.add('ouvert'); document.body.classList.add('menu-ouvert');
    try { history.pushState({ menu: true }, ''); parHistorique = true; } catch(e){}
    b.setAttribute('aria-expanded','true'); b.setAttribute('aria-label','Fermer le menu');
    if(fermerBtn) setTimeout(function(){ fermerBtn.focus(); }, reduit ? 0 : 120);
  }
  function fermer(retour){
    if(!t || !t.classList.contains('ouvert')) return;
    t.classList.remove('ouvert'); document.body.classList.remove('menu-ouvert');
    b.setAttribute('aria-expanded','false'); b.setAttribute('aria-label','Ouvrir le menu');
    if(retour) b.focus();
    if(parHistorique && retour !== 'histoire'){ parHistorique = false; try { history.back(); } catch(e){} }
  }
  // le bouton retour du téléphone ferme le menu au lieu de quitter la page
  window.addEventListener('popstate', function(){ if(t && t.classList.contains('ouvert')){ parHistorique = false; fermer('histoire'); } });
  if(b && t){
    b.addEventListener('click', function(){ t.classList.contains('ouvert') ? fermer(true) : ouvrir(); });
    if(fermerBtn) fermerBtn.addEventListener('click', function(){ fermer(true); });
    t.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ parHistorique = false; fermer(false); }); });
    document.addEventListener('keydown', function(k){ if(k.key === 'Escape') fermer(true); });
    var mq = window.matchMedia('(min-width: 1181px)');
    if(mq.addEventListener) mq.addEventListener('change', function(m){ if(m.matches) fermer(false); });
  }

  // Flèches des carrousels de pokés (nues, comme chez Pokawa, et grisées en bout de liste)
  document.querySelectorAll('[data-cible]').forEach(function(btn){
    var c = document.getElementById(btn.dataset.cible); if(!c) return;
    var sens = parseInt(btn.dataset.sens, 10);
    btn.addEventListener('click', function(){
      var carte = c.querySelector('li'); var pas = carte ? carte.getBoundingClientRect().width + 18 : c.clientWidth * .8;
      c.scrollBy({ left: pas * sens, behavior: reduit ? 'auto' : 'smooth' });
    });
    function etat(){
      btn.disabled = sens < 0 ? c.scrollLeft <= 2 : c.scrollLeft + c.clientWidth >= c.scrollWidth - 2;
    }
    c.addEventListener('scroll', function(){ window.requestAnimationFrame(etat); }, { passive:true });
    window.addEventListener('resize', etat, { passive:true });
    etat();
  });

  // Bouton rond « haut de page » (comme sur la carte de Pokawa), visible après un écran et demi
  var haut = document.createElement('a');
  haut.className = 'haut-page'; haut.href = '#contenu'; haut.setAttribute('aria-label', 'Remonter en haut de la page');
  haut.innerHTML = '<span aria-hidden="true">↑</span>';
  haut.addEventListener('click', function(e){ e.preventDefault(); window.scrollTo({ top:0, behavior: reduit ? 'auto' : 'smooth' }); });
  document.body.appendChild(haut);
  var attente = false;
  function majHaut(){ attente = false; haut.classList.toggle('vu', window.scrollY > window.innerHeight * 1.5); }
  window.addEventListener('scroll', function(){ if(!attente){ attente = true; window.requestAnimationFrame(majHaut); } }, { passive:true });
  majHaut();

  // Pastilles de la carte : celle de la rubrique à l'écran s'allume
  var puces = document.querySelector('.puces');
  if(puces && 'IntersectionObserver' in window){
    var liens = [].slice.call(puces.querySelectorAll('a[href^="#"]'));
    var parId = {};
    liens.forEach(function(a){ parId[a.getAttribute('href').slice(1)] = a; });
    var ul = puces.querySelector('ul');
    var spy = new IntersectionObserver(function(en){
      en.forEach(function(x){
        if(!x.isIntersecting) return;
        var a = parId[x.target.id]; if(!a) return;
        liens.forEach(function(l){ l.removeAttribute('aria-current'); });
        a.setAttribute('aria-current','true');
        if(ul){ var g = a.offsetLeft - (ul.clientWidth - a.offsetWidth) / 2; ul.scrollTo({ left: Math.max(0, g), behavior: reduit ? 'auto' : 'smooth' }); }
      });
    }, { rootMargin:'-45% 0px -50% 0px' });
    Object.keys(parId).forEach(function(id){ var s = document.getElementById(id); if(s) spy.observe(s); });
  }

  // Grand carrousel d'accueil, mécanique Pokawa : glissement en 0,5 s, défilement automatique toutes les 5 s
  // (arrêté dès qu'on touche au carrousel), boucle sans retour en arrière, glisser au doigt, petits points.
  var une = document.querySelector('.une');
  if(une){ try { carrousel(une); } catch(err){ une.classList.remove('pret'); } }
  function carrousel(une){
    var piste = une.querySelector('.une__piste'), cadre = une.querySelector('.une__cadre');
    var diapos = [].slice.call(piste.children), n = diapos.length, pts = [].slice.call(une.querySelectorAll('.une__points button'));
    if(n < 2) return;
    var clone = diapos[0].cloneNode(true);
    clone.setAttribute('aria-hidden','true'); clone.classList.remove('actif');
    clone.querySelectorAll('a,button').forEach(function(x){ x.setAttribute('tabindex','-1'); });
    piste.appendChild(clone);
    var toutes = diapos.concat([clone]);
    var i = 0, auto = null, enPause = false;
    une.classList.add('pret');
    function placer(px){ piste.style.transform = 'translate3d(' + (px !== undefined ? px : -i * cadre.clientWidth) + 'px,0,0)'; }
    function activer(k){
      toutes.forEach(function(d, j){
        if(j === k){ d.classList.add('actif'); return; }
        if(!d.classList.contains('actif')) return;
        setTimeout(function(){ d.classList.add('remise'); d.classList.remove('actif'); void d.offsetWidth; d.classList.remove('remise'); }, 600);
      });
      var vrai = k % n;
      pts.forEach(function(p, j){ p.setAttribute('aria-current', j === vrai ? 'true' : 'false'); });
    }
    function aller(k, sansAnim){
      if(sansAnim || reduit) une.classList.add('glisse');
      i = k; placer(); activer(i);
      if(sansAnim || reduit){ void piste.offsetWidth; une.classList.remove('glisse'); }
      if(i === n && !sansAnim){ // la copie de la 1re diapo : on revient au début sans que ça se voie
        setTimeout(function(){ une.classList.add('glisse'); i = 0; placer(); toutes.forEach(function(d){ d.classList.remove('actif'); }); diapos[0].classList.add('actif'); void piste.offsetWidth; une.classList.remove('glisse'); }, reduit ? 0 : 520);
      }
    }
    function suivant(){ aller(i + 1); }
    function precedent(){ if(i === 0){ aller(n, true); } aller(i - 1); }
    function stop(){ enPause = true; if(auto){ clearInterval(auto); auto = null; } }
    if(!reduit){ auto = setInterval(function(){ if(!document.hidden && !enPause && !doigt) suivant(); }, 5000); }
    pts.forEach(function(p, j){ p.addEventListener('click', function(){ stop(); aller(j); }); });
    // Zones invisibles à gauche et à droite : la flèche apparaît quand la souris s'approche du bord, un clic change de photo
    [['prec', 'Photo précédente', '←', function(){ precedent(); }], ['suiv', 'Photo suivante', '→', function(){ suivant(); }]].forEach(function(z){
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'une__zone une__zone--' + z[0]; b.setAttribute('aria-label', z[1]);
      b.innerHTML = '<span aria-hidden="true">' + z[2] + '</span>';
      b.addEventListener('pointerdown', function(e){ e.stopPropagation(); });
      b.addEventListener('click', function(){ stop(); z[3](); });
      cadre.appendChild(b);
    });
    window.addEventListener('resize', function(){ une.classList.add('glisse'); placer(); void piste.offsetWidth; une.classList.remove('glisse'); }, { passive:true });
    // Glisser au doigt ou à la souris
    var doigt = false, x0 = 0, y0 = 0, dx = 0, horizontal = null;
    cadre.addEventListener('pointerdown', function(e){ if(e.button > 0) return; doigt = true; x0 = e.clientX; y0 = e.clientY; dx = 0; horizontal = null; });
    cadre.addEventListener('pointermove', function(e){
      if(!doigt) return;
      var mx = e.clientX - x0, my = e.clientY - y0;
      if(horizontal === null && (Math.abs(mx) > 8 || Math.abs(my) > 8)) horizontal = Math.abs(mx) > Math.abs(my);
      if(!horizontal) return;
      dx = mx; une.classList.add('glisse'); placer(-i * cadre.clientWidth + dx);
    });
    function lacher(){
      if(!doigt) return; doigt = false; une.classList.remove('glisse');
      if(horizontal){ stop(); if(dx < -50) suivant(); else if(dx > 50) precedent(); else placer(); }
    }
    cadre.addEventListener('pointerup', lacher); cadre.addEventListener('pointercancel', lacher); cadre.addEventListener('pointerleave', lacher);
    une.addEventListener('keydown', function(e){ if(e.key === 'ArrowRight'){ stop(); suivant(); } if(e.key === 'ArrowLeft'){ stop(); precedent(); } });
    placer();
  }

  // Fiche en grand : un clic sur un poké ouvre le bowl en très grand (nom, description, prix, Commander) ;
  // un clic sur une photo du restaurant l'ouvre en grand. Se ferme avec la croix, Échap, un clic à côté ou le bouton retour.
  (function(){
    var DISHOP = 'https://rivebowl.dishop.co/';
    var d = document.createElement('dialog');
    d.className = 'fiche';
    d.setAttribute('aria-labelledby', 'fiche-titre');
    d.innerHTML = '<button class="fiche__fermer" type="button" aria-label="Fermer">×</button>' +
      '<div class="fiche__img"><img alt="" /></div>' +
      '<div class="fiche__texte"><h2 id="fiche-titre"></h2><p class="fiche__desc"></p><p class="fiche__prix"></p>' +
      '<a class="btn btn--jaune fiche__cmd" href="' + DISHOP + '" target="_blank" rel="noopener">Commander <span class="fl" aria-hidden="true">→</span></a></div>';
    if(!d.showModal) return; // vieux navigateur : les liens normaux restent
    document.body.appendChild(d);
    var img = d.querySelector('.fiche__img img'), boite = d.querySelector('.fiche__img'), titre = d.querySelector('h2'),
        desc = d.querySelector('.fiche__desc'), prix = d.querySelector('.fiche__prix'), parHistorique = false;
    function ouvrir(o){
      d.classList.toggle('fiche--photo', !!o.photo);
      boite.className = 'fiche__img ' + (o.couleur || '');
      img.src = o.src; img.alt = o.alt || o.nom || '';
      titre.textContent = o.nom || ''; desc.textContent = o.desc || ''; prix.textContent = o.prix || '';
      prix.hidden = !o.prix; desc.hidden = !o.desc;
      d.showModal(); document.body.classList.add('menu-ouvert');
      try { history.pushState({ fiche:1 }, ''); parHistorique = true; } catch(e){ parHistorique = false; }
    }
    function fermer(){ if(d.open) d.close(); }
    d.addEventListener('close', function(){
      document.body.classList.remove('menu-ouvert');
      if(parHistorique){ parHistorique = false; history.back(); }
    });
    window.addEventListener('popstate', function(){ if(d.open){ parHistorique = false; d.close(); } });
    d.querySelector('.fiche__fermer').addEventListener('click', fermer);
    d.addEventListener('click', function(e){ if(e.target === d) fermer(); });
    function couleurDe(el){ var m = el && (el.className.match(/\bc-[a-z]+\b/) || []); return m[0] || 'c-sable'; }
    // Pokés de l'accueil
    document.querySelectorAll('.poke').forEach(function(a){
      a.addEventListener('click', function(e){
        e.preventDefault();
        var im = a.querySelector('img');
        ouvrir({ src: im.getAttribute('src'), nom: a.querySelector('.poke__nom').textContent, desc: a.dataset.desc, prix: a.dataset.prix, couleur: couleurDe(a.querySelector('.poke__img')) });
      });
    });
    // Cartes produit de la page carte
    document.querySelectorAll('.produit').forEach(function(li){
      var im = li.querySelector('img'); if(!im) return;
      var nom = li.querySelector('h3'); var p = li.querySelector('p'); var px = li.querySelector('.prix');
      li.setAttribute('tabindex','0'); li.setAttribute('role','button');
      li.setAttribute('aria-label', 'Voir en grand : ' + (nom ? nom.textContent : ''));
      function go(){ ouvrir({ src: im.getAttribute('src'), alt: im.alt, nom: nom && nom.textContent, desc: p && p.textContent, prix: px && px.textContent, couleur: couleurDe(li) }); }
      li.addEventListener('click', go);
      li.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); go(); } });
    });
    // Photos du restaurant
    document.querySelectorAll('.galerie img, .histoire figure img, .mj-une img, .profil__gauche img, .cat__tete img, .grille img, .duo__img img, .tuile img.photo').forEach(function(im){
      im.classList.add('agrandir'); im.setAttribute('tabindex','0'); im.setAttribute('role','button');
      var leg = im.closest('figure') && im.closest('figure').querySelector('figcaption');
      function go(){ ouvrir({ photo: !(im.classList.contains('bol') || im.classList.contains('g-bol')), src: im.getAttribute('src'), alt: im.alt, nom: im.alt, desc: leg ? leg.textContent : '' }); }
      im.addEventListener('click', go);
      im.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); go(); } });
    });
  })();

  // Bouton pause du bandeau d'avis (le survol n'existe pas sur téléphone)
  var bp = document.querySelector('.defile__pause'), df = document.querySelector('.defile');
  if(bp && df){ bp.addEventListener('click', function(){ var p = df.classList.toggle('pause'); bp.setAttribute('aria-pressed', p); bp.textContent = p ? 'Relancer' : 'Mettre en pause'; }); }

  // Apparition douce au défilement
  var els = document.querySelectorAll('.monte');
  if(reduit || !('IntersectionObserver' in window)){ els.forEach(function(x){ x.classList.add('vu'); }); return; }
  var io = new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('vu'); io.unobserve(x.target); } }); }, { rootMargin:'0px 0px -6% 0px', threshold:.06 });
  els.forEach(function(x){ io.observe(x); });
  // Filet de sécurité : si l'observateur ne se déclenche pas, on affiche quand même
  function verifier(){ var h = window.innerHeight; els.forEach(function(x){ if(x.classList.contains('vu')) return; var r = x.getBoundingClientRect(); if(r.top < h * 1.1 && r.bottom > -50) x.classList.add('vu'); }); }
  window.addEventListener('scroll', verifier, { passive:true });
  setTimeout(verifier, 600);
  setTimeout(function(){ els.forEach(function(x){ x.classList.add('vu'); }); }, 4000);
  // La carte en onglets : une rubrique à la fois ; flèches gauche/droite, Début et Fin au clavier (sans JS, tout reste affiché)
  document.querySelectorAll('.onglets').forEach(function (bloc) {
    var boutons = [].slice.call(bloc.querySelectorAll('[role="tab"]'));
    var panneaux = boutons.map(function (b) { return document.getElementById(b.getAttribute('aria-controls')); });
    function choisir(n, focus) {
      boutons.forEach(function (b, i) {
        var oui = i === n;
        b.setAttribute('aria-selected', oui ? 'true' : 'false');
        b.tabIndex = oui ? 0 : -1;
        panneaux[i].hidden = !oui;
      });
      if (focus) boutons[n].focus();
      boutons[n].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
    boutons.forEach(function (b, i) {
      b.addEventListener('click', function () { choisir(i, false); });
      b.addEventListener('keydown', function (e) {
        var n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: boutons.length - 1 }[e.key];
        if (n === undefined) return;
        e.preventDefault();
        choisir((n + boutons.length) % boutons.length, true);
      });
    });
    panneaux.forEach(function (p, i) { p.hidden = i !== 0; });
  });
  // Boutons : le texte roule au survol (un double arrive par dessous, comme CRAV). Le double est caché aux lecteurs d'écran.
  document.querySelectorAll('.btn').forEach(function (b) {
    if (b.querySelector('.btn__roule') || b.querySelector('img')) return;
    var ligne = document.createElement('span'); ligne.className = 'btn__ligne';
    while (b.firstChild) ligne.appendChild(b.firstChild);
    var double = ligne.cloneNode(true); double.setAttribute('aria-hidden', 'true');
    var roule = document.createElement('span'); roule.className = 'btn__roule';
    roule.appendChild(ligne); roule.appendChild(double); b.appendChild(roule);
  });
  // Rangées de cartes : les titres d'une même rangée prennent la même hauteur (même nombre de lignes), donc les phrases s'alignent
  function lignes(el) {
    var r = document.createRange(); r.selectNodeContents(el);
    // nombre de lignes = nombre de hauteurs différentes des morceaux de texte (à 6 px près)
    return [].reduce.call(r.getClientRects(), function (acc, x) {
      if (x.width > 0 && !acc.some(function (a) { return Math.abs(a - x.top) < 6; })) acc.push(x.top);
      return acc;
    }, []).length;
  }
  function egaliser() {
    document.querySelectorAll('.tuiles, .damier, .menu-grille').forEach(function (liste) {
      var cartes = [].slice.call(liste.children), titres = cartes.map(function (c) { return c.querySelector('.t-case, h3, h4'); });
      titres.forEach(function (t) { if (t) t.style.minHeight = ''; });
      var rangees = {};
      var seul = liste.matches('.tuiles') && !liste.querySelector('img');   // cartes « titre seul » : toutes la même taille de titre et la même hauteur
      cartes.forEach(function (c, i) { if (!titres[i] || !c.offsetParent) return; var k = seul ? 0 : Math.round(c.getBoundingClientRect().top); (rangees[k] = rangees[k] || []).push(titres[i]); });
      Object.keys(rangees).forEach(function (k) {
        var rang = rangees[k];
        // même nombre de lignes pour tous les titres de la rangée : une taille commune, réduite au besoin (jamais de plus de 25 %)
        var base = Math.min.apply(null, rang.map(function (t) { return parseFloat(getComputedStyle(t).fontSize); }));
        var taille = base, essais = 0;
        function memesLignes() { var n = rang.map(lignes); return n.every(function (x) { return x === n[0]; }); }
        rang.forEach(function (t) { t.style.fontSize = taille + 'px'; });
        while (!memesLignes() && taille > Math.max(base * 0.75, 14) && essais < 12) { taille *= 0.97; rang.forEach(function (t) { t.style.fontSize = taille.toFixed(1) + 'px'; }); essais++; }
        if (!memesLignes()) { taille = base; rang.forEach(function (t) { t.style.fontSize = taille + 'px'; }); }
        // aucun mot ne doit dépasser de sa carte (pas de césure) : on réduit encore toute la rangée, jusqu'à 14 px au plus petit
        function deborde() { return rang.some(function (t) { return t.scrollWidth > t.clientWidth + 1; }); }
        essais = 0;
        while (deborde() && taille > 14 && essais < 20) { taille = Math.max(14, taille * 0.96); rang.forEach(function (t) { t.style.fontSize = taille.toFixed(1) + 'px'; }); essais++; }
        var h = Math.max.apply(null, rang.map(function (t) { return t.getBoundingClientRect().height; }));
        rang.forEach(function (t) { t.style.minHeight = h + 'px'; });
      });
    });
  }
  egaliser();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(egaliser, 50); });
  var largeurEgal = window.innerWidth;
  window.addEventListener('resize', function () { if (window.innerWidth !== largeurEgal) { largeurEgal = window.innerWidth; setTimeout(egaliser, 150); } });
  window.addEventListener('load', function () { setTimeout(egaliser, 300); });
})();
