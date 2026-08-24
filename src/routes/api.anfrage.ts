import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// Kontaktformular -> Resend.
//
// Für den Live-Betrieb müssen in Netlify (Site settings -> Environment variables)
// gesetzt sein:
//   RESEND_API_KEY  – API-Key aus dem Resend-Account
//   RESEND_FROM     – Absender, z. B. 'Fuchs Pools Website <anfrage@fuchspools.de>'
//                     Die Domain muss in Resend verifiziert sein (SPF/DKIM-DNS-Records).
//   RESEND_TO       – Empfänger, z. B. 'info@fuchspools.de'
//
// Bewusst ohne npm-Abhängigkeit: die Resend-REST-API wird direkt per fetch angesprochen.

/** JSON-Response-Helfer */
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/** HTML-escapen für die E-Mail */
const esc = (s: unknown) =>
  String(s ?? "").replace(
    /[&<>"]/g,
    (c) => (({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }) as Record<string, string>)[c],
  );

const telHref = (s: unknown) => String(s ?? "").replace(/[^\d+]/g, "");

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string; // Honeypot – muss leer bleiben
};

// Markenfarben (aus src/styles.css)
const ORANGE = "#F15A22";
const INK = "#1B2A33";

export const Route = createFileRoute("/api/anfrage")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.RESEND_API_KEY;
        const from = process.env.RESEND_FROM;
        const to = process.env.RESEND_TO;

        if (!apiKey || !from || !to) {
          console.error("Resend-Konfiguration fehlt (RESEND_API_KEY / RESEND_FROM / RESEND_TO).");
          return json(
            { ok: false, error: "Der E-Mail-Versand ist derzeit nicht konfiguriert." },
            500,
          );
        }

        let body: Payload;
        try {
          body = (await request.json()) as Payload;
        } catch {
          return json({ ok: false, error: "Ungültige Anfrage." }, 400);
        }

        // Honeypot: von Bots ausgefülltes, für Menschen unsichtbares Feld.
        // Stiller Erfolg – der Bot bekommt kein Feedback, es geht keine Mail raus.
        if (body.company && body.company.trim() !== "") {
          return json({ ok: true });
        }

        const name = (body.name || "").trim();
        const email = (body.email || "").trim();
        const phone = (body.phone || "").trim();
        const message = (body.message || "").trim();

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!name || !emailOk || !message) {
          return json(
            { ok: false, error: "Bitte füllen Sie Name, E-Mail und Nachricht korrekt aus." },
            400,
          );
        }

        // Zeitstempel in deutscher Zeit – macht jeden Betreff eindeutig,
        // damit Mail-Clients die Anfragen nicht zu einem Thread zusammenfassen.
        const now = new Date();
        let stamp: string;
        try {
          stamp = now.toLocaleString("de-DE", {
            timeZone: "Europe/Berlin",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        } catch {
          stamp = now.toISOString().slice(0, 16).replace("T", " ");
        }

        const subject = `Neue Anfrage über die Website: ${name} · ${stamp}`;

        const telLink = phone
          ? `<a href="tel:${esc(telHref(phone))}" style="color:${ORANGE};text-decoration:none">${esc(phone)}</a>`
          : "–";
        const mailLink = `<a href="mailto:${esc(email)}" style="color:${ORANGE};text-decoration:none">${esc(email)}</a>`;

        const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
<body style="margin:0;padding:24px 12px;background:#eef2f4;font-family:Arial,Helvetica,sans-serif;color:${INK};">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8ea;">
    <tr><td style="background:${ORANGE};padding:22px 24px;">
      <div style="color:#ffffff;font-size:19px;font-weight:700;line-height:1.2;">Neue Anfrage &uuml;ber die Website</div>
      <div style="color:rgba(255,255,255,.88);font-size:13px;margin-top:3px;">Fuchs Pools &middot; eingegangen am ${esc(stamp)} Uhr</div>
    </td></tr>
    <tr><td style="padding:22px 24px 6px;">
      <div style="font-size:20px;font-weight:700;color:${INK};">${esc(name)}</div>
      <div style="font-size:14px;color:#4a5a63;margin-top:7px;">Tel.: ${telLink} &nbsp;&middot;&nbsp; ${mailLink}</div>
    </td></tr>
    <tr><td style="padding:8px 24px 26px;">
      <div style="margin-top:12px;padding-top:18px;border-top:1px solid #e7ecee;">
        <div style="color:#6b7c85;font-size:12px;font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em;">Nachricht</div>
        <div style="white-space:pre-wrap;line-height:1.65;font-size:15px;">${esc(message)}</div>
      </div>
    </td></tr>
    <tr><td style="padding:16px 24px;background:#f5f8f9;color:#6b7c85;font-size:12px;line-height:1.5;">
      Automatisch erzeugt &uuml;ber das Kontaktformular auf fuchspools.com.<br/>
      Auf &bdquo;Antworten&ldquo; klicken schreibt direkt an ${esc(name)} (${esc(email)}).
    </td></tr>
  </table>
</body></html>`;

        const text = [
          "Neue Anfrage über das Kontaktformular der Website:",
          "",
          `Name: ${name}`,
          `E-Mail: ${email}`,
          ...(phone ? [`Telefon: ${phone}`] : []),
          `Eingegangen: ${stamp} Uhr`,
          "",
          "Nachricht:",
          message,
        ].join("\n");

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from,
              to: [to],
              reply_to: email,
              subject,
              html,
              text,
            }),
          });

          if (!res.ok) {
            const detail = await res.text().catch(() => "");
            console.error("Resend-Fehler:", res.status, detail);
            return json(
              {
                ok: false,
                error:
                  "Der Versand ist fehlgeschlagen. Bitte später erneut versuchen oder rufen Sie uns an.",
              },
              502,
            );
          }
        } catch (err) {
          console.error("Resend-Request fehlgeschlagen:", err);
          return json(
            {
              ok: false,
              error:
                "Der Versand ist fehlgeschlagen. Bitte später erneut versuchen oder rufen Sie uns an.",
            },
            502,
          );
        }

        return json({ ok: true });
      },
    },
  },
});
