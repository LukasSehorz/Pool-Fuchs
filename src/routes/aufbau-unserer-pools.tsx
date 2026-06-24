import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/aufbau-unserer-pools")({
  head: () => ({
    meta: [
      { title: "Aufbau unserer Pools – FuchsPools" },
      { name: "description", content: "So entsteht Ihr Traum-Pool bei FuchsPools – von der Bodenplatte über robuste Styroporsteine bis zum fertigen, folierten Becken. Schritt für Schritt erklärt." },
    ],
  }),
  component: AufbauPage,
});

const ORANGE = "#F15A22";
const TURQ = "#16B5C0";
const PLAYFAIR = "'Playfair Display', serif";

const STEPS = [
  { n: "01", img: "/images/kunde/img_13.jpg", title: "Bodenplatte", text: "Am Anfang entsteht eine stabile Bodenplatte – das solide Fundament für Ihren Pool." },
  { n: "02", img: "/images/aufbau/step-2.jpg", title: "Styroporsteine positionieren", text: "Nach dem Erstellen der Bodenplatte werden die Styroporsteine exakt positioniert." },
  { n: "03", img: "/images/aufbau/step-3.jpg", title: "Reihe für Reihe aufbauen", text: "Reihe für Reihe bis zu einer Höhe von max. 1,5 m. Mit Rundstahlstangen werden die Kammern vertikal und horizontal bewehrt." },
  { n: "04", img: "/images/aufbau/step-4.png", title: "Einbauteile setzen & befüllen", text: "Skimmer, Düsen, Scheinwerfer und weitere Einbauteile werden montiert – anschließend werden die Steine mit Beton befüllt." },
  { n: "05", img: "/images/aufbau/step-5.jpg", title: "Treppenbau", text: "Eine vernünftige und formschöne Treppe darf natürlich nicht fehlen." },
  { n: "06", img: "/images/kunde/img_23.jpg", title: "Verputzen & vorbereiten", text: "Das fertige Becken wird verputzt, geglättet und sorgfältig für die Folie vorbereitet." },
  { n: "07", img: "/images/aufbau/step-7.jpg", title: "Folie nach Wunsch", text: "Zum Schluss wird das Becken mit der Wunschfolie ausgekleidet und verschweißt – ganz nach Kundenwunsch." },
  { n: "08", img: "/images/kunde/img_04.jpg", title: "Fertiges Becken", text: "Und schon ist Ihr Traum-Pool fertig – bereit für viele sonnige Stunden im eigenen Garten." },
];

function AufbauPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Bewegungsreduktion respektieren – Inhalte bleiben dann statisch sichtbar
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero
      gsap.from(".hero-reveal", { y: 28, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.1 });
      gsap.to(".hero-bg", {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
      });

      // Material-Reveals
      gsap.utils.toArray<HTMLElement>(".mat-reveal").forEach((el) => {
        gsap.from(el, {
          y: 42, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Timeline-Linie zeichnen
      if (lineRef.current && timelineRef.current) {
        gsap.fromTo(lineRef.current, { scaleY: 0 }, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: timelineRef.current, start: "top 65%", end: "bottom 75%", scrub: true },
        });
      }

      // Schritte – jede Animation auf IHR eigenes Element triggern (nicht den hohen Container),
      // damit Schritt 02 erst kommt, wenn man wirklich bei 02 ist
      gsap.utils.toArray<HTMLElement>(".step").forEach((step, i) => {
        const left = i % 2 === 0;
        const media = step.querySelector(".step-media");
        const text = step.querySelector(".step-text");
        const num = step.querySelector(".step-num");
        const node = step.querySelector(".step-node");
        if (media) gsap.from(media, { x: left ? -64 : 64, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: media, start: "top 78%", once: true } });
        if (text) gsap.from(text, { x: left ? 64 : -64, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.05, scrollTrigger: { trigger: text, start: "top 80%", once: true } });
        if (num) gsap.from(num, { scale: 0.5, opacity: 0, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: num, start: "top 85%", once: true } });
        if (node) gsap.from(node, { scale: 0, duration: 0.5, ease: "back.out(2.5)", scrollTrigger: { trigger: node, start: "top 85%", once: true } });
      });
    }, rootRef);

    // Trigger-Positionen neu berechnen, sobald Fonts/Bilder geladen sind
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section className="hero-section relative -mt-18 min-h-[68vh] flex items-center justify-center overflow-hidden">
        <img src="/images/aufbau/step-4.png" alt="" className="hero-bg absolute inset-0 w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />
        <div className="relative text-center text-white px-6 pt-32 pb-20 max-w-3xl">
          <div className="hero-reveal inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-5">
            Aufbau unserer Pools
          </div>
          <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: PLAYFAIR, textShadow: "0 2px 14px rgba(0,0,0,0.8)" }}>
            So entsteht Ihr Traum-Pool
          </h1>
          <p className="hero-reveal mt-5 text-lg text-white/85 max-w-2xl mx-auto" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}>
            Von der Bodenplatte bis zum fertigen Becken – ein Blick hinter die Kulissen unserer Poolbau-Schritte.
          </p>
        </div>
      </section>

      {/* MATERIAL */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#f7f7f5" }}>
        <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="mat-reveal">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: TURQ }}>Das Material</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5" style={{ fontFamily: PLAYFAIR }}>
              Robuste Styroporsteine – flexibel nach Maß
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-7">
              Unsere Styroporsteine sind sehr robust und können alle 25 cm auf Ihre Wünsche angepasst werden.
              So entsteht jeder Pool exakt in Ihrer Wunschgröße und -form – stabil, langlebig und perfekt isoliert.
            </p>
            <ul className="space-y-3">
              {["Robuste, langlebige Bauweise", "Anpassbar in 25-cm-Schritten", "Ideal für individuelle Formen & Größen"].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="grid place-items-center size-6 rounded-full shrink-0" style={{ backgroundColor: TURQ }}>
                    <Check className="size-3.5 text-white" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mat-reveal">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant aspect-[3/2]">
              <img src="/images/aufbau/produkt-1.png" alt="Styroporstein für den Poolbau" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Infografik */}
        <div className="container-page mt-12 mat-reveal">
          <div className="rounded-2xl border border-border bg-white p-2 sm:p-4 md:p-8 shadow-card">
            <div className="overflow-x-auto md:overflow-visible">
              <img src="/images/aufbau/produkt-2.png" alt="Styroporstein Infografik – technische Details" className="h-auto object-contain min-w-[680px] md:min-w-0 w-full max-h-none md:max-h-[520px] mx-auto" />
            </div>
            <p className="md:hidden mt-3 text-center text-xs text-muted-foreground">‹ Zum Vergrößern seitlich wischen ›</p>
          </div>
        </div>
      </section>

      {/* PROZESS / TIMELINE */}
      <section id="prozess" className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: TURQ }}>Schritt für Schritt</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ fontFamily: PLAYFAIR }}>
              Der Weg zu Ihrem Pool
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              Jeder FuchsPool entsteht in sorgfältiger Handarbeit. So läuft der Aufbau bei uns ab:
            </p>
          </div>

          <div ref={timelineRef} className="relative max-w-5xl mx-auto">
            {/* zentrale Linie (ab md) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-border">
              <div ref={lineRef} className="absolute inset-0 origin-top" style={{ backgroundColor: TURQ, transform: "scaleY(0)" }} />
            </div>

            <div className="space-y-14 md:space-y-0">
              {STEPS.map((s, i) => {
                const left = i % 2 === 0;
                return (
                  <div key={s.n} className="step relative md:grid md:grid-cols-2 md:gap-16 md:items-center md:py-10">
                    {/* Bild */}
                    <div className={`step-media ${left ? "md:order-1" : "md:order-2"}`}>
                      <div className="relative overflow-hidden rounded-2xl shadow-elegant aspect-[4/5]">
                        <img src={s.img} alt={`Schritt ${s.n}: ${s.title}`} loading="lazy" className="w-full h-full object-cover" />
                        <span
                          className="absolute top-4 left-4 grid place-items-center size-11 rounded-full text-white text-sm font-bold shadow-lg md:hidden"
                          style={{ backgroundColor: ORANGE, fontFamily: PLAYFAIR }}
                        >
                          {s.n}
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className={`step-text mt-5 md:mt-0 ${left ? "md:order-2 md:pl-6" : "md:order-1 md:pr-6 md:text-right"}`}>
                      <span className="step-num hidden md:block text-6xl font-bold leading-none mb-3" style={{ color: ORANGE, fontFamily: PLAYFAIR }}>
                        {s.n}
                      </span>
                      <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: PLAYFAIR }}>{s.title}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{s.text}</p>
                    </div>

                    {/* Knoten auf der Linie */}
                    <span
                      className="step-node hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 rounded-full ring-4 ring-white z-10"
                      style={{ backgroundColor: ORANGE }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Bereit für Ihren eigenen Pool?"
        text="Von der ersten Idee bis zum fertigen Becken – wir begleiten Sie bei jedem Schritt. Sprechen Sie uns an, unverbindlich und kostenfrei."
        primary="Jetzt Pool-Projekt anfragen"
      />
    </div>
  );
}
