import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TURQ = "#16B5C0";
const ORANGE = "#F15A22";
const PLAYFAIR = "'Playfair Display', serif";

export function FolienFaecher() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".folien-img", {
        x: -50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".folien-text", {
        x: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.1,
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* weicher Hintergrund-Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-70" aria-hidden="true">
        <div className="absolute left-0 top-1/2 size-[42rem] -translate-x-1/4 -translate-y-1/2 rounded-full bg-[#16B5C0]/10 blur-3xl" />
      </div>

      <div className="container-page relative">
        {/* Kopf */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: TURQ }}>
            Folien Farben &amp; Design
          </p>
          <h2 className="text-3xl font-bold leading-tight md:text-5xl" style={{ fontFamily: PLAYFAIR }}>
            Ihre Wunschfolie – Farbe für Farbe
          </h2>
        </div>

        {/* großes Foto links · Beschreibung rechts */}
        <div className="mt-16 grid items-center gap-12 lg:mt-20 lg:grid-cols-[1.55fr_1fr] lg:gap-20">
          {/* Links: großes, gerahmtes Foto */}
          <div className="folien-img relative">
            {/* versetzter Akzentblock hinter dem Bild */}
            <div className="absolute -bottom-5 -right-5 h-2/3 w-2/3 rounded-3xl bg-[#16B5C0]/15" aria-hidden="true" />
            {/* Passepartout-Rahmen */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-3 shadow-elegant ring-1 ring-black/5">
              <img
                src="/images/folien/folien-bild.jpg"
                alt="Alkorplan 2000 Farbfächer mit Renolit-Folienmustern"
                className="block h-auto w-full rounded-2xl"
              />
            </div>
          </div>

          {/* Rechts: Beschreibung */}
          <div className="folien-text space-y-8">
            <div className="border-l-2 pl-6" style={{ borderColor: TURQ }}>
              <h3 className="text-xl font-bold" style={{ fontFamily: PLAYFAIR }}>Alkorplan 2000</h3>
              <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                Glasfaserverstärkt und mit einer Stärke von{" "}
                <span className="font-semibold text-foreground">1,5&nbsp;mm – 1,8&nbsp;mm</span> – sehr robust!
              </p>
            </div>
            <div className="border-l-2 pl-6" style={{ borderColor: ORANGE }}>
              <h3 className="text-xl font-bold" style={{ fontFamily: PLAYFAIR }}>Alkorplan Touch</h3>
              <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                „Eine der hochwertigsten Poolfolien am Markt" – mit einer Stärke von{" "}
                <span className="font-semibold text-foreground">2&nbsp;mm</span> besonders widerstandsfähig und im Design
                einer Steinoptik der Natur nachempfunden.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Ihre Wunschfarbe stimmen wir persönlich mit Ihnen ab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
