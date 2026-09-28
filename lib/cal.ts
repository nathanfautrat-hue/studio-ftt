/**
 * Chargement de l'embed Cal.com (snippet officiel, file d'attente window.Cal).
 * Le script n'est injecté qu'au premier appel de getCal().
 */
type CalFn = ((...args: unknown[]) => void) & { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] };

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

const EMBED_SRC = "https://app.cal.com/embed/embed.js";

/** Réglages visuels communs : thème sombre + rouge Studio FTT */
export const CAL_UI = {
  theme: "dark",
  cssVarsPerTheme: { dark: { "cal-brand": "#E8352A" }, light: { "cal-brand": "#E8352A" } },
  hideEventTypeDetails: false,
  layout: "month_view",
};

export function getCal(): CalFn {
  const w = window;
  if (!w.Cal) {
    /* eslint-disable */
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(w, EMBED_SRC, "init");
    /* eslint-enable */
    w.Cal!("init", { origin: "https://app.cal.com" });
    w.Cal!("ui", CAL_UI);
  }
  return w.Cal!;
}
