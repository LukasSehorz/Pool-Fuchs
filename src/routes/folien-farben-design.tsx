import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { FolienFaecher } from "@/components/FolienFaecher";
import { FolienDesigns } from "@/components/FolienDesigns";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/folien-farben-design")({
  head: () => ({
    meta: [
      { title: "Folien Farben/Design – FuchsPools" },
      {
        name: "description",
        content:
          "Hochwertige Alkorplan 2000 Poolfolien – glasfaserverstärkt, robust und in vielen Farben & Oberflächen. Finden Sie Ihre Wunschfolie bei FuchsPools.",
      },
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
