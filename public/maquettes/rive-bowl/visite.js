// Rive Bowl · maquette v5 · « La visite » de l'accueil (Studio FTT)
// En faisant défiler, on avance dans le lieu : Montjean vu d'en haut, le quai de la Loire,
// on entre dans la salle, on s'approche du soleil du logo, puis on plonge au-dessus d'un bowl
// qui se sépare en ingrédients (simple animation, aucun choix possible).
//
// Sécurité : sans JavaScript, si l'utilisateur a demandé moins d'animations, ou en cas d'erreur,
// la classe .anim n'est pas posée et les scènes s'affichent les unes sous les autres, en images fixes.
(function(){
  var V = document.getElementById('visite');
  if(!V) return;
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduit || !('IntersectionObserver' in window) || !window.requestAnimationFrame) return;

  try { demarrer(); } catch(err){ V.classList.remove('anim'); }

  function demarrer(){
    var stage = V.querySelector('.visite__stage');
    var scenes = [].slice.call(V.querySelectorAll('.scene'));
    var barre = V.querySelector('.visite__barre i');
    var bol = V.querySelector('.bol-eclate');
    var morceaux = [].slice.call(V.querySelectorAll('.morceau'));
    var etapes = [].slice.call(V.querySelectorAll('.formule li'));
    var titreBol = V.querySelector('.scene--bol .scene__texte');
    var entete = document.querySelector('.entete');

    // Moments de chaque scène, de 0 (haut de la visite) à 1 (fin).
    // de / a : apparition et disparition ; f : durée du fondu ; z : zoom gagné pendant la scène.
    var T = [
      { de:0,    a:.22, f:.06, z:.22 },  // Montjean vu d'en haut
      { de:.16,  a:.40, f:.06, z:.20 },  // le quai et le pont
      { de:.34,  a:.56, f:.06, z:.38 },  // on entre dans la salle
      { de:.50,  a:.70, f:.07, z:1.15 },  // on s'approche du soleil du logo
      { de:.64,  a:1.01, f:.06, z:0 }    // le bowl
    ];

    morceaux.forEach(function(m){
      var a = parseFloat(m.dataset.angle||0) * Math.PI/180;
      m._dx = Math.sin(a); m._dy = -Math.cos(a);
    });

    V.classList.add('anim');

    var haut = 70, H = 1, W = 1, dernier = -1, actif = false;
    function mesurer(){
      haut = entete ? entete.getBoundingClientRect().height : 70;
      V.style.setProperty('--entete', haut + 'px');
      H = Math.max(1, V.offsetHeight - stage.offsetHeight);
      W = bol ? bol.offsetWidth : 1;
      dernier = -1;
    }
    mesurer();
    window.addEventListener('resize', mesurer, { passive:true });
    window.addEventListener('load', mesurer);

    function borne(x){ return x < 0 ? 0 : (x > 1 ? 1 : x); }
    function seg(p, a, b){ return borne((p - a) / (b - a)); }
    function doux(x){ return x * x * (3 - 2 * x); }

    function dessiner(p){
      for(var i = 0; i < scenes.length; i++){
        var s = scenes[i], t = T[i]; if(!t) continue;
        var entree = i === 0 ? 1 : doux(seg(p, t.de, t.de + t.f));
        var sortie = i === scenes.length - 1 ? 1 : 1 - doux(seg(p, t.a - t.f, t.a));
        var o = Math.min(entree, sortie);
        s.style.opacity = o.toFixed(3);
        s.style.visibility = o < .02 ? 'hidden' : 'visible';
        var ph = s._ph || (s._ph = s.querySelector('.scene__photo'));
        if(ph) ph.style.transform = 'scale(' + (1 + t.z * doux(seg(p, t.de, t.a))).toFixed(4) + ')';
        var tx = s._tx || (s._tx = s.querySelector('.scene__texte'));
        if(tx && i < scenes.length - 1){
          var tin = i === 0 ? 1 : doux(seg(p, t.de + t.f, t.de + t.f + .04));
          var tout = 1 - doux(seg(p, t.a - t.f - .06, t.a - t.f));
          var ot = Math.min(tin, tout);
          tx.style.opacity = ot.toFixed(3);
          tx.style.transform = 'translate3d(0,' + ((1 - ot) * (tout < 1 ? -26 : 26)).toFixed(1) + 'px,0)';
        }
      }
      // Le bowl arrive vu de dessus, en tournant un peu
      if(bol){
        var e = doux(seg(p, .64, .75));
        bol.style.transform = 'scale(' + (.55 + .45 * e).toFixed(4) + ') rotate(' + ((1 - e) * -40).toFixed(2) + 'deg)';
        // puis il se sépare en ingrédients
        var k = doux(seg(p, .77, .9));
        var d = k * .13 * W;
        for(var j = 0; j < morceaux.length; j++){
          var m = morceaux[j];
          if(m.classList.contains('morceau--centre')){
            m.style.transform = 'scale(' + (1 + .07 * k).toFixed(4) + ')';
          } else {
            m.style.transform = 'translate3d(' + (m._dx * d).toFixed(1) + 'px,' + (m._dy * d).toFixed(1) + 'px,0) rotate(' + (m._dx * k * 9).toFixed(2) + 'deg)';
          }
        }
      }
      if(titreBol){
        var ob = doux(seg(p, .69, .75));
        titreBol.style.opacity = ob.toFixed(3);
        titreBol.style.transform = 'translate3d(0,' + ((1 - ob) * 24).toFixed(1) + 'px,0)';
      }
      for(var n = 0; n < etapes.length; n++){
        etapes[n].classList.toggle('vu', p > .79 + n * .025);
      }
      if(barre) barre.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      if(film) film.suivre(p);
    }

    function boucle(){
      if(!actif) return;
      var r = V.getBoundingClientRect();
      var p = borne((haut - r.top) / H);
      if(Math.abs(p - dernier) > .0004){ dernier = p; dessiner(p); }
      window.requestAnimationFrame(boucle);
    }
    // La boucle ne tourne que lorsque la visite est à l'écran (batterie du téléphone)
    new IntersectionObserver(function(en){
      en.forEach(function(x){
        if(x.isIntersecting && !actif){ actif = true; dernier = -1; window.requestAnimationFrame(boucle); }
        else if(!x.isIntersecting){ actif = false; }
      });
    }).observe(V);
    dessiner(0);

    /* ------------------------------------------------------------------
       BRANCHER LA VRAIE VIDÉO DE RIVE BOWL (plus tard)
       Le bloc <div class="visite__film"> de index.html attend la vidéo filmée par le client
       (15 à 20 s au téléphone, en marchant lentement du quai de la Loire jusqu'au comptoir).
       Deux façons de la brancher, au choix :
       A. data-type="video" : une vidéo MP4 dont la lecture suit le défilement.
          Pour que l'image suive le doigt sans saccade, il faut une image clé à chaque image :
          ffmpeg -i entree.mov -an -vf "scale=-2:1080" -c:v libx264 -g 1 -crf 26 -movflags +faststart video/visite-1080.mp4
          ffmpeg -i entree.mov -an -vf "scale=720:-2" -c:v libx264 -g 1 -crf 28 -movflags +faststart video/visite-720.mp4
       B. data-type="images" : une suite d'images WebP (la plus fluide sur téléphone).
          ffmpeg -i entree.mov -vf "fps=8,scale=1280:-2" -c:v libwebp -quality 62 video/images/visite-%04d.webp
          puis indiquer le nombre d'images dans data-nb (ex. 120).
       Ensuite : passer data-actif="non" à data-actif="oui". La vidéo remplace alors les 4 photos
       (de 0 à data-fin du défilement), les textes restent par-dessus, et le bowl garde son animation.
       Rien n'est chargé si l'utilisateur a demandé moins d'animations ou en mode économie de données.
       ------------------------------------------------------------------ */
    var film = null;
    var F = V.querySelector('.visite__film');
    if(F && F.dataset.actif === 'oui' && !(navigator.connection && navigator.connection.saveData)){
      var fin = parseFloat(F.dataset.fin || .66);
      var mobile = window.matchMedia('(max-width: 760px)').matches;
      if(F.dataset.type === 'images'){
        var nb = parseInt(F.dataset.nb || 0, 10), modele = F.dataset.images || '';
        var cv = F.querySelector('canvas'), cx = cv && cv.getContext('2d'), imgs = [], actuelle = -1;
        function chemin(i){ var s = String(i + 1); while(s.length < 4) s = '0' + s; return modele.replace('%04d', s); }
        for(var q = 0; q < nb; q++){ var im = new Image(); im.decoding = 'async'; im.src = chemin(q); imgs.push(im); }
        film = { suivre:function(p){
          if(!cx || !nb) return;
          var i = Math.min(nb - 1, Math.round(borne(p / fin) * (nb - 1)));
          if(i === actuelle || !imgs[i].complete || !imgs[i].naturalWidth) return;
          actuelle = i; var im2 = imgs[i];
          if(cv.width !== cv.clientWidth){ cv.width = cv.clientWidth; cv.height = cv.clientHeight; }
          var r = Math.max(cv.width / im2.naturalWidth, cv.height / im2.naturalHeight);
          var w = im2.naturalWidth * r, h = im2.naturalHeight * r;
          cx.drawImage(im2, (cv.width - w) / 2, (cv.height - h) / 2, w, h);
        }};
        V.classList.add('avec-film', 'film-images');
      } else {
        var vid = F.querySelector('video');
        var src = mobile ? F.dataset.srcMobile : F.dataset.src;
        if(vid && src){
          vid.muted = true; vid.playsInline = true; vid.preload = 'auto'; vid.src = src;
          var cible = 0, enCours = false;
          vid.addEventListener('seeked', function(){ enCours = false; if(Math.abs(vid.currentTime - cible) > .04){ enCours = true; vid.currentTime = cible; } });
          film = { suivre:function(p){
            if(!vid.duration) return;
            cible = borne(p / fin) * (vid.duration - .05);
            if(!enCours){ enCours = true; vid.currentTime = cible; }
          }};
          vid.addEventListener('loadedmetadata', function(){ V.classList.add('avec-film', 'film-video'); dernier = -1; }, { once:true });
        }
      }
    }
  }
})();
