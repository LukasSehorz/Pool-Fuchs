import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ShieldCheck, Wrench, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

const TURQ = "#16B5C0";
const ORANGE = "#F15A22";
const PLAYFAIR = "'Playfair Display', serif";

export const Route = createFileRoute("/daecher")({
  head: () => ({
    meta: [
      { title: "Pooldächer von Popp – FuchsPools" },
      {
        name: "description",
        content:
          "Premium-Poolüberdachungen von Popp – langlebig, elegant und exakt auf Ihren Pool abgestimmt. Modelle line PRESTIGE & line LIVING bei FuchsPools.",
      },
    ],
  }),
  component: DaecherPage,
});

const VORTEILE = [
  { icon: ShieldCheck, title: "Qualität", text: "Hochwertige Materialien und saubere Verarbeitung – für viele Jahre Freude." },
  { icon: Wrench, title: "Konstruktion", text: "Durchdachte, robuste Technik, die zuverlässig läuft und Schutz bietet." },
  { icon: Sparkles, title: "Design", text: "Klare, elegante Linien, die sich harmonisch in Ihren Garten einfügen." },
];

const MODELLE = [
  {
    name: "line PRESTIGE",
    label: "Flach & dezent",
    text: "Eine niedrige Schiebeüberdachung, die sich nahezu unsichtbar in Ihren Garten einfügt – und Ihren Pool zuverlässig schützt.",
    img: "/images/daecher/prestige.jpg",
  },
  {
    name: "line LIVING",
    label: "Begehbar & geräumig",
    text: "Die geräumige, begehbare Variante – wird zum lichtdurchfluteten Wohlfühlraum am Pool und verlängert Ihre Badesaison spürbar.",
    img: "/images/daecher/living.jpg",
  },
];

function DaecherPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      gsap.from(".phil-img", {
        x: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".phil-img", start: "top 80%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow="Dächer"
        title="Poolüberdachungen von Popp"
        subtitle="Premium-Überdachungen, die Ihre Badesaison verlängern – langlebig, elegant und exakt auf Ihren Pool abgestimmt."
        crumbs={[{ label: "Dächer" }]}
        image="/images/kunde/img_20.jpg"
        ctaLabel="Jetzt beraten lassen"
        ctaTo="/kontakt"
      />

      {/* PHILOSOPHIE */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text */}
          <div className="reveal-up">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: TURQ }}>
              Spezialisiert auf Popp
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ fontFamily: PLAYFAIR }}>
              Nur Dächer, von denen wir zu 100 % überzeugt sind
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Bei Pooldächern setzen wir bewusst auf einen einzigen Hersteller: <span className="font-semibold text-foreground">Popp</span>.
              Denn wir vertreiben ausschließlich Produkte, hinter denen wir voll und ganz stehen.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Popp-Überdachungen sind nicht die günstigsten am Markt – aber in Qualität, Konstruktion und Design
              das Optimum. Eine Investition, an der Sie viele Jahre Freude haben.
            </p>

            {/* Vorteile */}
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {VORTEILE.map((v) => (
                <div key={v.title}>
                  <v.icon className="size-8" strokeWidth={1.5} style={{ color: TURQ }} />
                  <h3 className="mt-3 text-base font-bold" style={{ fontFamily: PLAYFAIR }}>{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bild + Zitat */}
          <div className="phil-img relative">
            <div className="absolute -bottom-5 -left-5 h-2/3 w-2/3 rounded-3xl bg-[#16B5C0]/15" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-3 shadow-elegant ring-1 ring-black/5">
              <img
                src="/images/daecher/dach-3.jpg"
                alt="Realisierte Pooldach-Überdachung von Popp"
                className="block h-auto w-full rounded-2xl"
              />
            </div>
            {/* Zitat-Badge */}
            <div className="absolute -bottom-6 right-4 max-w-xs rounded-2xl bg-white px-5 py-4 shadow-card ring-1 ring-black/5 md:right-8">
              <p className="text-sm font-medium italic leading-snug text-foreground" style={{ fontFamily: PLAYFAIR }}>
                „Wir vertreiben nur Dächer, von denen wir zu 100 % überzeugt sind."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODELLE */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#f7f9f9" }}>
        <div className="container-page">
          <div className="reveal-up mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: ORANGE }}>
              Unsere Modelle
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl" style={{ fontFamily: PLAYFAIR }}>
              Für jeden Pool die passende Linie
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-2">
            {MODELLE.map((m) => (
              <article key={m.name} className="reveal-up group overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-shadow duration-500 hover:shadow-elegant">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={m.img}
                    alt={`Popp Poolüberdachung ${m.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm" style={{ color: TURQ }}>
                    {m.label}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-bold" style={{ fontFamily: PLAYFAIR }}>{m.name}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{m.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Welches Dach passt zu Ihrem Pool?"
        text="Wir beraten Sie persönlich zu Modellen, Maßen und Möglichkeiten – unverbindlich und kostenfrei."
        primary="Jetzt Dach-Beratung anfragen"
      />
    </div>
  );
}
