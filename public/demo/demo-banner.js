/*
 * Bandeau « démo Studio FTT » injecté en haut de chaque démo.
 * Une seule ligne à ajouter dans une démo : <script src="/demo/demo-banner.js" defer></script>
 * Dans le flux (pas en position fixe) : il ne masque jamais la navigation de la démo.
 */
(function () {
  if (document.getElementById("ftt-demo-bar")) return;
  // Pages de démo : /demo/... (HTML statique) et les fiches démo du site Next.
  function isDemo() {
    return /^\/(demo\/|projets\/marceau)/.test(location.pathname);
  }
  // ?capture=1 : pas de bandeau (captures d'écran pour le portfolio)
  if (!isDemo() || /[?&]capture=1/.test(location.search)) return;

  var BOOKING = "https://cal.com/studioftt-x1nxtl/projet";
  var BACK = "https://studioftt.fr/#projets";

  var css =
    "#ftt-demo-bar{all:initial;display:block;background:#0a0a0a;color:#F4EFE6;" +
    "font:500 13px/1.2 'DM Sans',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;" +
    "border-bottom:1px solid rgba(244,239,230,.08);position:relative;z-index:2147483000}" +
    "#ftt-demo-bar *{box-sizing:border-box;font:inherit;color:inherit;margin:0}" +
    "#ftt-demo-bar .fdb-in{max-width:1320px;margin:0 auto;height:44px;padding:0 16px;display:flex;align-items:center;gap:14px}" +
    "#ftt-demo-bar .fdb-brand{display:flex;align-items:center;gap:10px;min-width:0;text-decoration:none}" +
    "#ftt-demo-bar .fdb-logo{width:22px;height:22px;border-radius:5px;flex-shrink:0;display:block}" +
    "#ftt-demo-bar .fdb-txt{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
    "#ftt-demo-bar .fdb-txt b{font-weight:600}" +
    "#ftt-demo-bar .fdb-note{color:rgba(244,239,230,.62)}" +
    "#ftt-demo-bar .fdb-actions{margin-left:auto;display:flex;align-items:center;gap:6px;flex-shrink:0}" +
    "#ftt-demo-bar a.fdb-link{padding:8px 10px;border-radius:999px;text-decoration:none;color:rgba(244,239,230,.78);" +
    "transition:color .2s ease,background-color .2s ease}" +
    "#ftt-demo-bar a.fdb-link:hover{color:#F4EFE6;background:rgba(244,239,230,.08)}" +
    "#ftt-demo-bar a.fdb-cta{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;" +
    "background:#E8352A;color:#fff;text-decoration:none;font-weight:600;" +
    "transition:background-color .2s ease,transform .2s cubic-bezier(.2,.7,.2,1)}" +
    "#ftt-demo-bar a.fdb-cta:hover{background:#c92a20;transform:translateY(-1px)}" +
    "#ftt-demo-bar a:focus-visible{outline:2px solid #E8352A;outline-offset:2px}" +
    "#ftt-demo-bar a.fdb-cta:focus-visible{outline-color:#F4EFE6}" +
    "#ftt-demo-bar svg{display:block}" +
    "@media (max-width:640px){#ftt-demo-bar .fdb-note,#ftt-demo-bar .fdb-link-back{display:none}" +
    "#ftt-demo-bar .fdb-in{height:40px;padding:0 12px;gap:10px}#ftt-demo-bar a.fdb-cta{padding:7px 12px}}" +
    "@media (prefers-reduced-motion:reduce){#ftt-demo-bar a{transition:none}}";

  var arrow =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var bar = document.createElement("div");
  bar.id = "ftt-demo-bar";
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Information : site de démonstration");
  bar.innerHTML =
    '<div class="fdb-in">' +
    '<a class="fdb-brand" href="' + BACK + '" aria-label="Studio FTT, retour au site">' +
    '<img class="fdb-logo" src="/logo_ftt.png" alt="" width="22" height="22">' +
    '<span class="fdb-txt"><b>Démo réalisée par Studio FTT</b>' +
    '<span class="fdb-note"> · textes et photos d’exemple</span></span></a>' +
    '<div class="fdb-actions">' +
    '<a class="fdb-link fdb-link-back" href="' + BACK + '">Retour</a>' +
    '<a class="fdb-cta" href="' + BOOKING + '" target="_blank" rel="noopener">Je veux le mien ' + arrow + "</a>" +
    "</div></div>";

  var style = document.createElement("style");
  style.textContent = css;

  function mount() {
    document.head.appendChild(style);
    document.body.insertBefore(bar, document.body.firstChild);
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);

  // Navigation interne (Next) : on retire le bandeau en quittant la démo.
  function sync() {
    if (!isDemo() && bar.parentNode) bar.parentNode.removeChild(bar);
  }
  ["pushState", "replaceState"].forEach(function (m) {
    var orig = history[m];
    history[m] = function () {
      var r = orig.apply(this, arguments);
      setTimeout(sync, 0);
      return r;
    };
  });
  window.addEventListener("popstate", sync);
})();
