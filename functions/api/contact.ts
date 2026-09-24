// Cloudflare Pages Function — POST /api/contact
// Reçoit : { nom, email, description }

interface Env {
  RESEND_API_KEY: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const escapeHtml = (str: string) =>
  str.replace(/[&<>"']/g, (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!)
  );

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > 10_000) {
      return json({ error: "Requête trop volumineuse" }, 413);
    }

    const { nom, email, description } = await request.json<{
      nom?: string;
      email?: string;
      description?: string;
    }>();

    if (!nom || !email || !description) {
      return json({ error: "Champs manquants" }, 400);
    }
    if (nom.length > 100) {
      return json({ error: "Nom invalide" }, 400);
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return json({ error: "Email invalide" }, 400);
    }
    if (description.length > 5000) {
      return json({ error: "Message invalide" }, 400);
    }

    const safeNom = escapeHtml(nom);
    const safeEmail = escapeHtml(email);
    const safeDescription = escapeHtml(description).replace(/\n/g, "<br/>");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Studio FTT <onboarding@resend.dev>",
        to: ["contactstudioftt@gmail.com"],
        reply_to: email,
        subject: `Demande de site — ${safeNom}`,
        html: `
          <h2>Nouvelle demande de contact</h2>
          <p><strong>Nom :</strong> ${safeNom}</p>
          <p><strong>Email :</strong> ${safeEmail}</p>
          <p><strong>Projet :</strong></p>
          <p>${safeDescription}</p>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Resend error: status", res.status);
      return json({ error: "Erreur envoi email" }, 500);
    }

    return json({ success: true });
  } catch (error) {
    console.error("Contact form error");
    return json({ error: "Erreur serveur" }, 500);
  }
};
