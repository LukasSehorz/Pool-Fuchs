import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useReveal } from "@/lib/useReveal";
import { COMPANY } from "@/lib/site";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – FuchsPools Reisbach" },
      { name: "description", content: "Schreiben Sie uns oder rufen Sie an. Persönliche Beratung rund um Ihren Traum-Pool in Niederbayern." },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const [sent, setSent] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);
  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow="Kontakt"
        title="Sprechen Sie mit unseren Pool-Profis"
        subtitle="Unverbindlich, kostenfrei und kompetent – wir freuen uns auf Sie."
        crumbs={[{ label: "Kontakt" }]}
        image="/images/kunde/img_24.jpg"
        ctaLabel="Jetzt Termin vereinbaren"
        ctaHref="#angebot"
      />

      <section id="angebot" className="container-page py-16 grid lg:grid-cols-[1.3fr_1fr] gap-10 scroll-mt-24">
        <form
          data-reveal="left"
          className="rounded-3xl border border-border bg-card p-8 shadow-card"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          <h2 className="text-2xl font-bold">Kostenloses Angebot anfordern</h2>
          <p className="mt-2 text-sm text-muted-foreground">Antwort in der Regel innerhalb von 24 Stunden.</p>

          {sent ? (
            <div className="mt-6 rounded-2xl bg-primary/10 border border-primary/30 p-6 text-foreground">
              <div className="flex items-center gap-2 font-semibold text-primary"><Check className="size-5" /> Vielen Dank!</div>
              <p className="mt-2 text-sm">Wir melden uns schnellstmöglich bei Ihnen.</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              <Field label="Name" name="name" required />
              <Field label="E-Mail" name="email" type="email" required />
              <Field label="Telefon" name="phone" type="tel" />
              <div>
                <label className="text-sm font-medium">Ihre Nachricht *</label>
                <textarea required rows={5} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" required className="mt-0.5" />
                <span>Ich habe die <Link to="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link> gelesen und stimme der Verarbeitung meiner Angaben zur Kontaktaufnahme zu.</span>
              </label>
              <button className="rounded-full gradient-water text-primary-foreground py-3.5 font-semibold shadow-card hover:opacity-95 transition">
                Anfrage absenden
              </button>
            </div>
          )}
        </form>

        <aside data-reveal-group className="space-y-6">
          <div data-reveal-item className="rounded-3xl gradient-deep text-primary-foreground p-8 shadow-elegant">
            <h3 className="text-xl font-bold">So erreichen Sie uns</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin className="size-5 text-primary mt-0.5" /><span>{COMPANY.street}<br />{COMPANY.zip} {COMPANY.city}</span></li>
              <li className="flex items-center gap-3"><Phone className="size-5 text-primary" /><a href={COMPANY.phoneHref} className="hover:text-primary">{COMPANY.phone}</a></li>
              <li className="flex items-center gap-3"><Mail className="size-5 text-primary" /><a href={`mailto:${COMPANY.email}`} className="hover:text-primary">{COMPANY.email}</a></li>
            </ul>
          </div>

          <div data-reveal-item className="rounded-3xl border border-border bg-card p-8">
            <h3 className="text-lg font-bold flex items-center gap-2"><Clock className="size-5 text-primary" /> Öffnungszeiten</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {COMPANY.hours.map((h) => (
                <li key={h.d} className="flex justify-between border-b border-border/60 last:border-0 py-1.5">
                  <span className="font-medium">{h.d}</span><span className="text-muted-foreground">{h.h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal-item className="rounded-3xl overflow-hidden border border-border aspect-[4/3] w-full max-w-full">
            <iframe
              title="Karte"
              className="size-full max-w-full block"
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=12.59%2C48.54%2C12.67%2C48.59&layer=mapnik&marker=48.5662%2C12.6293`}
            />
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}{required && " *"}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
