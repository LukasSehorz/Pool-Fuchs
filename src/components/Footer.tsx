import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Mail } from "lucide-react";
import { COMPANY, NAV } from "@/lib/site";
import { openCookieSettings } from "@/components/CookieConsent";

export function Footer() {
  return (
    <footer className="mt-24 gradient-deep text-primary-foreground">
      <div className="container-page pt-16 pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-5">
            <Link to="/">
              <img
                src="/images/logo-fuchspools.png"
                alt="Fuchs Pools"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-primary-foreground/75 leading-relaxed">
              {COMPANY.full}. Premium-Pools nach Maß – geplant, gebaut und montiert in {COMPANY.region}.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2"><MapPin className="size-4 mt-0.5 text-primary" />{COMPANY.street}, {COMPANY.zip} {COMPANY.city}</div>
              <a href={COMPANY.phoneHref} className="flex items-center gap-2 hover:text-primary"><Phone className="size-4 text-primary" />{COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-primary"><Mail className="size-4 text-primary" />{COMPANY.email}</a>
            </div>
          </div>

          <div className="lg:col-span-3 text-sm">
            <span className="font-semibold mb-3 inline-block">Navigation</span>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-primary-foreground/70 hover:text-primary">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <div>© {new Date().getFullYear()} {COMPANY.full}. Alle Rechte vorbehalten.</div>
          <div className="flex gap-5">
            <Link to="/impressum" className="hover:text-primary">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-primary">Datenschutz</Link>
            <Link to="/kontakt" className="hover:text-primary">Kontakt</Link>
            <button type="button" onClick={openCookieSettings} className="hover:text-primary">Cookie-Einstellungen</button>
          </div>
        </div>

        <p className="mt-4 text-xs text-primary-foreground/60">
          Teile der Inhalte dieser Website wurden mit Unterstützung von KI erstellt.
        </p>
      </div>
    </footer>
  );
}
