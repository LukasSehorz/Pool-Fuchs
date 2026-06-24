export type NavChild = { label: string; to: string; children?: NavChild[] };

export const COMPANY = {
  name: "FuchsPools",
  full: "FuchsPools GmbH",
  street: "Krankenhausstraße 33",
  zip: "94419",
  city: "Reisbach-Niederreisbach",
  region: "Niederbayern",
  phone: "0170 1149416",
  phoneHref: "tel:+491701149416",
  email: "info@fuchspools.de",
  owner: "Oliver Fuchs",
  vatId: "DE343137726",
  youtube: "https://www.youtube.com/",
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
