import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prenom, nom, email, description } = await req.json();

    if (!prenom || !nom || !email || !description) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
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
      return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
