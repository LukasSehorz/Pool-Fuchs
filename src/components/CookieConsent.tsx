import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

// Google Tag Manager – wird AUSSCHLIESSLICH nach aktiver Einwilligung geladen
// (DSGVO Art. 6 Abs. 1 lit. a + § 25 Abs. 1 TDDDG). Vor der Einwilligung findet
// kein Request an Google statt und es werden keine Marketing-/Statistik-Cookies gesetzt.
//
// Das Nachladen von gtm.js passiert NICHT mehr hier, sondern im serverseitig
// gerenderten Inline-Script in src/routes/__root.tsx. Grund: Die Google Search
// Console sucht die Container-ID im ausgelieferten HTML und führt dabei kein
// JavaScript aus – eine erst zur Laufzeit eingefügte ID sieht sie nie. Dieses
// Banner meldet die Entscheidung deshalb nur noch per Event an jenes Script.
// Es darf hier bewusst keinen zweiten Consent-Speicher geben: Schlüssel und
// Event-Name werden exportiert, damit beide Seiten dieselben Werte benutzen.
export const CONSENT_KEY = "fp-cookie-consent-v1"; // "accepted" | "rejected"
export const CONSENT_EVENT = "fp-consent-change";

declare global {
  interface Window {
    dataLayer?: unknown[];
    __fpGtmLoaded?: boolean;
  }
}

/** Teilt dem Inline-Script im <head> mit, dass jetzt eingewilligt wurde. */
function meldeEinwilligung(accepted: boolean) {
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { accepted } }));
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
    // Bei "accepted" hat das Inline-Script im <head> GTM bereits selbst gestartet.
    if (choice !== "accepted" && choice !== "rejected") setVisible(true);
  }, []);

  const decide = (accepted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "rejected");
    } catch {
      /* ignore */
    }
    setVisible(false);
    meldeEinwilligung(accepted);
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
