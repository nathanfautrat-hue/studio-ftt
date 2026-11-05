// Rive Bowl · maquette v5 · menu téléphone, apparition douce, vidéo d'accueil
(function(){
  document.documentElement.classList.add('js');
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menu téléphone
  var b=document.querySelector('.burger'), t=document.getElementById('tiroir'), e=document.querySelector('.entete');
  function haut(){ if(e) document.documentElement.style.setProperty('--haut', Math.max(0,e.getBoundingClientRect().bottom)+'px'); }
  function fermer(){ if(!t) return; t.classList.remove('ouvert'); b.setAttribute('aria-expanded','false'); b.setAttribute('aria-label','Ouvrir le menu'); }
  if(b&&t){
    b.addEventListener('click',function(){ haut(); var o=t.classList.toggle('ouvert'); b.setAttribute('aria-expanded',o); b.setAttribute('aria-label',o?'Fermer le menu':'Ouvrir le menu'); });
    t.querySelectorAll('a').forEach(function(a){a.addEventListener('click',fermer)});
    document.addEventListener('keydown',function(k){ if(k.key==='Escape') fermer(); });
  }

  // Vidéo d'accueil « on entre dans le restaurant »
  // Ne se charge que si data-actif="oui" (fichiers déposés), jamais si l'utilisateur
  // a demandé moins d'animations, ni en mode économie de données.
  var v=document.querySelector('.une__video');
  if(v && v.dataset.actif==='oui' && !reduit && !(navigator.connection && navigator.connection.saveData)){
    var mobile=window.matchMedia('(max-width: 760px)').matches;
    var src=mobile ? v.dataset.srcMobile : v.dataset.src;
    if(mobile && v.dataset.posterMobile) v.poster=v.dataset.posterMobile;
    if(src){
      v.muted=true; v.setAttribute('muted',''); v.playsInline=true;
      v.src=src;
      v.addEventListener('playing',function(){ v.closest('.une').classList.add('avec-video'); },{once:true});
      var p=v.play(); if(p&&p.catch) p.catch(function(){});
      // Pause quand la vidéo sort de l'écran (batterie du téléphone)
      if('IntersectionObserver' in window){
        new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ var q=v.play(); if(q&&q.catch) q.catch(function(){}); } else { v.pause(); } }); }).observe(v);
      }
    }
  }

  // Grand bandeau à visuels de l'accueil : points, glisser au doigt, défilement automatique lent
  var sl=document.getElementById('slides');
  if(sl){
    var pts=[].slice.call(document.querySelectorAll('.points-slide button'));
    var n=sl.children.length, cur=0, auto=null;
    function aller(i){ cur=(i+n)%n; sl.scrollTo({left:sl.clientWidth*cur, behavior: reduit?'auto':'smooth'}); }
    function maj(){ var i=Math.round(sl.scrollLeft/Math.max(1,sl.clientWidth)); cur=i; pts.forEach(function(p,k){ p.setAttribute('aria-current', k===i?'true':'false'); }); }
    sl.addEventListener('scroll',function(){ window.requestAnimationFrame(maj); },{passive:true});
    pts.forEach(function(p,k){ p.addEventListener('click',function(){ arret(); aller(k); }); });
    function arret(){ if(auto){ clearInterval(auto); auto=null; } }
    if(!reduit && n>1){
      auto=setInterval(function(){ if(document.hidden) return; var vid=document.querySelector('.une.avec-video'); if(vid && cur===0) return; aller(cur+1); }, 6500);
      ['pointerdown','touchstart','wheel','keydown'].forEach(function(ev){ sl.addEventListener(ev,arret,{passive:true,once:true}); });
    }
  }

  // Boutons précédent / suivant des carrousels de pokés (ordinateur)
  document.querySelectorAll('[data-cible]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var c=document.getElementById(btn.dataset.cible); if(!c) return;
      var carte=c.querySelector('li'); var pas=carte ? carte.getBoundingClientRect().width+18 : c.clientWidth*0.8;
      c.scrollBy({left:pas*parseInt(btn.dataset.sens,10), behavior: reduit?'auto':'smooth'});
    });
  });

  // Apparition douce au défilement
  var els=document.querySelectorAll('.monte');
  if(reduit||!('IntersectionObserver' in window)){ els.forEach(function(x){x.classList.add('vu')}); return; }
  var io=new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('vu'); io.unobserve(x.target); } }); },{rootMargin:'0px 0px -6% 0px',threshold:.06});
  els.forEach(function(x){io.observe(x)});
  // Filet de sécurité : si l'observateur ne se déclenche pas, on affiche quand même
  function verifier(){ var h=window.innerHeight; els.forEach(function(x){ if(x.classList.contains('vu')) return; var r=x.getBoundingClientRect(); if(r.top<h*1.1 && r.bottom>-50) x.classList.add('vu'); }); }
  window.addEventListener('scroll',verifier,{passive:true});
  setTimeout(verifier,600);
  setTimeout(function(){ els.forEach(function(x){x.classList.add('vu')}); },4000);
})();
