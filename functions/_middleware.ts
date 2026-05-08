/**
 * Middleware Cloudflare Pages — redirige le sous-domaine *.pages.dev vers le domaine canonique.
 *
 * Évite le contenu dupliqué pour Google. Studio FTT vit sur studioftt.fr.
 * Toute requête qui arrive sur studio-ftt.pages.dev est renvoyée en 301 permanent
 * vers la même URL en studioftt.fr (en conservant le path et la query string).
 */

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Si on est sur le sous-domaine *.pages.dev, redirige vers le domaine canonique.
  if (url.hostname.endsWith(".pages.dev")) {
    const canonical = new URL(url.pathname + url.search, "https://studioftt.fr");
    return Response.redirect(canonical.toString(), 301);
  }

  // Sinon, laisse passer la requête vers le contenu statique ou la prochaine fonction.
  return context.next();
};
