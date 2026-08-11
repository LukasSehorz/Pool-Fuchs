import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { COMPANY, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum – Fuchs Pools" },
      {
        name: "description",
        content: "Impressum der Fuchs Pools GmbH aus Reisbach – Anbieterkennzeichnung nach § 5 DDG.",
      },
      { property: "og:url", content: SITE_URL + "/impressum" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/impressum" }],
  }),
  component: () => (
    <>
      <PageHero title="Impressum" crumbs={[{ label: "Impressum" }]} />
      <section className="container-page py-16 max-w-3xl text-foreground/85 leading-relaxed space-y-6">
        <div>
          <h2 className="text-xl font-bold">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h2>
          <p className="mt-2">{COMPANY.full}<br />{COMPANY.street}<br />{COMPANY.zip} {COMPANY.city}<br />Deutschland</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Vertreten durch</h2>
          <p className="mt-2">Geschäftsführer: {COMPANY.owner}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Registereintrag</h2>
          <p className="mt-2">Eintragung im Handelsregister.<br />Registergericht: {COMPANY.registerCourt}<br />Registernummer: {COMPANY.registerNumber}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Kontakt</h2>
          <p className="mt-2">Telefon: {COMPANY.phone}<br />E-Mail: {COMPANY.email}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Umsatzsteuer-ID</h2>
          <p className="mt-2">Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG:<br />{COMPANY.vatId}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Aufsichtsbehörde</h2>
          <p className="mt-2">Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br />Promenade 27, 91522 Ansbach<br /><a href="https://www.lda.bayern.de" className="text-primary hover:underline" target="_blank" rel="noreferrer">www.lda.bayern.de</a></p>
        </div>
        <div>
          <h2 className="text-xl font-bold">EU-Streitschlichtung</h2>
          <p className="mt-2">Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Haftungshinweis</h2>
          <p className="mt-2">Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Urheberrecht</h2>
          <p className="mt-2">Die durch die Seitenbetreiber erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Hinweis zu KI-generierten Inhalten</h2>
          <p className="mt-2">Teile der Inhalte dieser Website (Texte und Bilder) wurden mit Unterstützung von künstlicher Intelligenz erstellt und redaktionell geprüft.</p>
        </div>
      </section>
    </>
  ),
});
