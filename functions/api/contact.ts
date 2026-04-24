// Cloudflare Pages Function — POST /api/contact
// Replaces the previous Next.js API route. Same shape, same URL.

interface Env {
  RESEND_API_KEY: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { prenom, nom, email, description } = await request.json<{
      prenom?: string;
      nom?: string;
      email?: string;
      description?: string;
    }>();

    if (!prenom || !nom || !email || !description) {
      return json({ error: "Champs manquants" }, 400);
    }

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
        subject: `Demande de site — ${prenom} ${nom}`,
        html: `
          <h2>Nouvelle demande de contact</h2>
          <p><strong>Prénom :</strong> ${prenom}</p>
          <p><strong>Nom :</strong> ${nom}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Projet :</strong></p>
          <p>${description.replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return json({ error: "Erreur envoi email" }, 500);
    }

    return json({ success: true });
  } catch (error) {
    console.error(error);
    return json({ error: "Erreur serveur" }, 500);
  }
};
