// Rive Bowl · maquette v3 · menu téléphone + apparition douce
(function(){
  document.documentElement.classList.add('js');
  var b=document.querySelector('.burger'), t=document.getElementById('tiroir'), e=document.querySelector('.entete');
  function haut(){ if(e) document.documentElement.style.setProperty('--haut', Math.max(0,e.getBoundingClientRect().bottom)+'px'); }
  function fermer(){ if(!t) return; t.classList.remove('ouvert'); b.setAttribute('aria-expanded','false'); b.setAttribute('aria-label','Ouvrir le menu'); }
  if(b&&t){
    b.addEventListener('click',function(){ haut(); var o=t.classList.toggle('ouvert'); b.setAttribute('aria-expanded',o); b.setAttribute('aria-label',o?'Fermer le menu':'Ouvrir le menu'); });
    t.querySelectorAll('a').forEach(function(a){a.addEventListener('click',fermer)});
    document.addEventListener('keydown',function(k){ if(k.key==='Escape') fermer(); });
  }
  var els=document.querySelectorAll('.monte');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){ els.forEach(function(x){x.classList.add('vu')}); return; }
  var io=new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('vu'); io.unobserve(x.target); } }); },{rootMargin:'0px 0px -6% 0px',threshold:.06});
  els.forEach(function(x){io.observe(x)});
})();
