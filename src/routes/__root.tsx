import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { COMPANY, SITE_URL, GEO } from "../lib/site";

/** Strukturierte Daten (JSON-LD) für lokales SEO – LocalBusiness.
 *  Wird serverseitig im <head> gerendert, damit Crawler es sicher lesen. */
const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "GeneralContractor"],
  "@id": SITE_URL + "/#business",
  name: COMPANY.full,
  image: SITE_URL + "/images/og-image.jpg",
  logo: SITE_URL + "/images/logo-fuchspools.png",
  url: SITE_URL,
  telephone: COMPANY.phoneHref.replace("tel:", ""),
  email: COMPANY.email,
  founder: COMPANY.owner,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    postalCode: COMPANY.zip,
    addressLocality: COMPANY.city,
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
  geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Niederbayern" },
    { "@type": "AdministrativeArea", name: "Landkreis Dingolfing-Landau" },
    { "@type": "City", name: "Reisbach" },
    { "@type": "City", name: "Dingolfing" },
    { "@type": "City", name: "Landau an der Isar" },
    { "@type": "City", name: "Landshut" },
    { "@type": "City", name: "Vilsbiburg" },
    { "@type": "City", name: "Eggenfelden" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Poolbau-Leistungen",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pools nach Maß / Neubau" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Poolfolien & Design (Alkorplan)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Poolüberdachungen" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "GFK-Becken-Sanierung" } },
    ],
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description: "Termine nach Vereinbarung",
  },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Seite nicht gefunden</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Diese Seite konnte nicht geladen werden
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Auf unserer Seite ist etwas schiefgelaufen. Bitte aktualisieren Sie die Seite oder kehren Sie zur Startseite zurück.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Erneut versuchen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Zur Startseite
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fuchs Pools – Premium-Pools nach Maß aus Niederbayern" },
      { name: "description", content: "Fuchs Pools GmbH aus Reisbach: Wir planen, bauen und montieren premium Pools ganz nach Ihren Wünschen – Traum-Pools aus Niederbayern." },
      { property: "og:title", content: "Fuchs Pools – Traum-Pools aus Niederbayern" },
      { property: "og:description", content: "Premium-Pools nach Maß aus Reisbach – persönliche Beratung, Planung und Montage in Niederbayern." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Fuchs Pools" },
      { property: "og:image", content: SITE_URL + "/images/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "de_DE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SITE_URL + "/images/og-image.jpg" },
      { name: "theme-color", content: "#0f3546" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MobileCTA } from "../components/MobileCTA";

/** Bei jedem Seiten-/Pfadwechsel ganz nach oben (Hero-Start) springen – Desktop & Mobile.
 *  Ignoriert reine Hash-/In-Page-Anker (#angebot) und scrollt sofort (ohne Smooth-Animation). */
function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, [pathname]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-24 lg:pb-0">
          <Outlet />
        </main>
        <Footer />
        <MobileCTA />
      </div>
    </QueryClientProvider>
  );
}
