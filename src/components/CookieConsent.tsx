import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

// Google Tag Manager – wird AUSSCHLIESSLICH nach aktiver Einwilligung geladen
// (DSGVO Art. 6 Abs. 1 lit. a + § 25 Abs. 1 TDDDG). Vor der Einwilligung findet
// kein Request an Google statt und es werden keine Marketing-/Statistik-Cookies gesetzt.
const GTM_ID = "GTM-TBKQDWTS";
const CONSENT_KEY = "fp-cookie-consent-v1"; // "accepted" | "rejected"

declare global {
  interface Window {
    dataLayer?: unknown[];
    __fpGtmLoaded?: boolean;
  }
}

function loadGTM() {
  if (typeof window === "undefined" || window.__fpGtmLoaded) return;
  window.__fpGtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const first = document.getElementsByTagName("script")[0];
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  first?.parentNode?.insertBefore(s, first);
}

/** Öffnet den Cookie-Hinweis erneut, damit die Einwilligung geändert/widerrufen
 *  werden kann (Aufruf z. B. über den Footer-Link „Cookie-Einstellungen"). */
export function openCookieSettings() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* localStorage nicht verfügbar – ignorieren */
  }
  window.location.reload();
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let choice: string | null = null;
    try {
      choice = localStorage.getItem(CONSENT_KEY);
    } catch {
      /* ignore */
    }
    if (choice === "accepted") loadGTM();
    else if (choice !== "rejected") setVisible(true);
  }, []);

  const decide = (accepted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "rejected");
    } catch {
      /* ignore */
    }
    setVisible(false);
    if (accepted) loadGTM();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4" role="dialog" aria-label="Cookie-Hinweis">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card text-card-foreground shadow-elegant p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Wir verwenden Cookies</p>
            <p className="mt-1">
              Neben technisch notwendigen Cookies nutzen wir – nur mit Ihrer Einwilligung – Google-Dienste
              (Google Tag Manager) für Statistik und Marketing. Ohne Ihre Einwilligung werden diese nicht
              geladen. Details in unserer{" "}
              <Link to="/datenschutz" className="text-primary underline hover:no-underline">
                Datenschutzerklärung
              </Link>
              . Ihre Wahl können Sie jederzeit im Footer ändern.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => decide(false)}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:bg-accent"
            >
              Ablehnen
            </button>
            <button
              type="button"
              onClick={() => decide(true)}
              className="rounded-full gradient-water px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition hover:opacity-95"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
