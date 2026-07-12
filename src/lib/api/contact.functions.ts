import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { COMPANY } from "../site";

// Server-Function für das Kontaktformular.
//
// Für den Live-Betrieb ist noch Folgendes einzurichten:
//   (a) Ein Resend-Account (https://resend.com).
//   (b) Die Sending-Domain "fuchspools.de" bei Resend als verifizierte Domain
//       hinterlegen und die von Resend angezeigten DNS-Records (SPF/DKIM etc.)
//       im DNS eintragen. Die Absender-Adresse (from, unten) MUSS zu dieser
//       verifizierten Domain passen – sonst lehnt Resend den Versand ab.
//   (c) Die Umgebungsvariable RESEND_API_KEY in den Netlify-Einstellungen
//       (Site settings → Environment variables) setzen.
//
// Es wird bewusst KEINE npm-Abhängigkeit genutzt, sondern direkt die
// Resend-REST-API per fetch angesprochen.

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      message: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error(
        "E-Mail-Versand ist noch nicht konfiguriert (RESEND_API_KEY fehlt).",
      );
    }

    const text = [
      "Neue Anfrage über das Kontaktformular der Website:",
      "",
      `Name: ${data.name}`,
      `E-Mail: ${data.email}`,
      ...(data.phone ? [`Telefon: ${data.phone}`] : []),
      "",
      "Nachricht:",
      data.message,
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Fuchs Pools Website <website@fuchspools.de>",
        to: [COMPANY.email],
        reply_to: data.email,
        subject: `Neue Anfrage über die Website von ${data.name}`,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(
        `E-Mail-Versand fehlgeschlagen (${response.status}): ${detail}`,
      );
    }

    return { ok: true } as const;
  });
