import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { FolienFaecher } from "@/components/FolienFaecher";
import { FolienDesigns } from "@/components/FolienDesigns";
import { CTASection } from "@/components/CTASection";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/folien-farben-design")({
  head: () => ({
    meta: [
      { title: "Poolfolien & Design (Alkorplan) in Niederbayern | Fuchs Pools" },
      {
        name: "description",
        content:
          "Hochwertige Alkorplan-Poolfolien – glasfaserverstärkt, robust und in vielen Farben & Oberflächen. Ihre Wunschfolie bei Fuchs Pools aus Reisbach für Dingolfing, Landau & Niederbayern.",
      },
      { property: "og:title", content: "Poolfolien & Design (Alkorplan) in Niederbayern | Fuchs Pools" },
      { property: "og:description", content: "Hochwertige Alkorplan-Poolfolien in vielen Farben & Oberflächen – individuell für Ihren Pool. Fuchs Pools aus Reisbach in Niederbayern." },
      { property: "og:url", content: SITE_URL + "/folien-farben-design" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL + "/folien-farben-design" },
    ],
  }),
  component: FolienPage,
});

function FolienPage() {
  return (
    <>
      <PageHero
        eyebrow="Folien Farben/Design"
        title="Folien, Farben & Design"
        subtitle="Robuste Alkorplan-Folien – für ein langlebiges, stilvolles Poolerlebnis."
        crumbs={[{ label: "Folien Farben/Design" }]}
        image="/images/kunde/img_17.jpg"
        ctaLabel="Jetzt Wunsch-Design auswählen"
        ctaTo="/kontakt"
      />

      <FolienFaecher />

      <FolienDesigns />

      <CTASection
        title="Welche Folie passt zu Ihrem Pool?"
        text="Wir beraten Sie persönlich zu Farben, Oberflächen und Designs – unverbindlich und kostenfrei."
        primary="Jetzt zur Folienberatung"
      />
    </>
  );
}
