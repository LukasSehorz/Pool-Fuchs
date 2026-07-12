export type NavChild = { label: string; to: string; children?: NavChild[] };

/** Kanonische Basis-URL der Live-Seite (Primary Domain in Netlify).
 *  Zentrale Quelle für Canonical-Tags, Sitemap, Open Graph und JSON-LD.
 *  fuchspools.com (ohne www) ist die aktuell von Google indexierte
 *  Hauptdomain (WordPress-Altseite). fuchspools.de leitet darauf weiter.
 *  Diese eine Konstante ändern, falls die Primary Domain wechselt
 *  (+ Primary Domain in Netlify entsprechend setzen). */
export const SITE_URL = "https://fuchspools.com";

/** Geo-Koordinaten des Standorts (identisch zum Karten-Marker auf /kontakt). */
export const GEO = { lat: 48.5662, lng: 12.6293 };

export const COMPANY = {
  name: "Fuchs Pools",
  full: "Fuchs Pools GmbH",
  street: "Krankenhausstraße 33",
  zip: "94419",
  city: "Reisbach-Niederreisbach",
  region: "Niederbayern",
  phone: "0170 1149416",
  phoneHref: "tel:+491701149416",
  email: "info@fuchspools.de",
  owner: "Oliver Fuchs",
  vatId: "DE343137726",
  registerCourt: "Amtsgericht Landshut",
  registerNumber: "HRB 12625",
  hours: [
    { d: "Mo – Fr", h: "Nach Vereinbarung" },
    { d: "Sa", h: "Nach Vereinbarung" },
    { d: "So", h: "Geschlossen" },
  ],
};

export const NAV: NavChild[] = [
  { label: "Startseite", to: "/" },
  { label: "Aufbau unserer Pools", to: "/aufbau-unserer-pools" },
  { label: "Folien Farben/Design", to: "/folien-farben-design" },
  { label: "Unsere Pools", to: "/poolabdeckungen" },
  { label: "Dächer", to: "/daecher" },
  { label: "Kontakt", to: "/kontakt" },
];
