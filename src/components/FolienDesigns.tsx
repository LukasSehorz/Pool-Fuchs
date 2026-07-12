import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ORANGE = "#F15A22";
const TURQ = "#16B5C0";
const PLAYFAIR = "'Playfair Display', serif";

type Design = { name: string; tagline: string; img: string };

// RENOLIT ALKORPLAN TOUCH – Premium-Designkollektion
const DESIGNS: Design[] = [
  { name: "Authentic", tagline: "Authentische Steinstruktur", img: "/images/Folien Design/Authentic Design.webp" },
  { name: "Elegance", tagline: "Edle Schiefer-Optik", img: "/images/Folien Design/Elegance Design.webp" },
  { name: "Prestige", tagline: "Naturstein in Grau", img: "/images/Folien Design/Prestige Design.webp" },
  { name: "Sublime", tagline: "Warmer Naturstein-Look", img: "/images/Folien Design/Sublime Design.webp" },
  { name: "Vanity", tagline: "Helle Marmor-Optik", img: "/images/Folien Design/Vanity Design.webp" },
];

// Zickzack-Versatz (nur einreihig ab lg): Welle nach oben/unten
const OFFSET = ["lg:mt-20", "lg:mt-0", "lg:mt-20", "lg:mt-0", "lg:mt-20"];

export function FolienDesigns() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((cur) => (cur === null ? cur : (cur + dir + DESIGNS.length) % DESIGNS.length)),
    [],
  );

  // Tastatursteuerung + Scroll-Sperre bei geöffnetem Lightbox
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".designs-head", {
        y: 30, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".design-card");

      if (reduce) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(cards, {
        y: 70, opacity: 0, duration: 0.95, ease: "power3.out",
        stagger: { each: 0.1, from: "center" },
        scrollTrigger: { trigger: ".designs-grid", start: "top 82%" },
      });

      // dezente Parallax-Drift auf innerer Ebene (eigene Transform-Schicht)
      gsap.utils.toArray<HTMLElement>(".design-inner").forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 === 0 ? -5 : 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #eaf3f4 100%)" }}
    >
      {/* dezente Akzent-Glows (hell) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 right-0 size-[34rem] rounded-full bg-[#16B5C0]/12 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 size-[30rem] rounded-full bg-[#F15A22]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[112rem] px-6 md:px-10">
        {/* Kopf */}
        <div className="designs-head mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: ORANGE }}>
            RENOLIT Alkorplan Touch
          </p>
          <h2 className="text-3xl font-bold leading-tight text-foreground md:text-5xl" style={{ fontFamily: PLAYFAIR }}>
            Premium-Designs der TOUCH-Kollektion
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Strukturierte Folien mit täuschend echter Naturstein- und Marmoroptik – für ein exklusives
            Poolambiente, langlebig und pflegeleicht.
          </p>
        </div>

        {/* Versetztes Galerie-Raster */}
        <div className="designs-grid mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 md:mt-20 md:gap-8 lg:grid-cols-5 lg:items-start">
          {DESIGNS.map((d, i) => (
            <article key={d.name} className={`design-card ${OFFSET[i]}`}>
              <div className="design-inner will-change-transform">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`${d.name} vergrößern`}
                  className="group relative block w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-[#16B5C0] focus-visible:ring-offset-2 rounded-2xl"
                >
                  {/* heller Passepartout-Rahmen */}
                  <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-2.5 shadow-[0_22px_50px_-24px_rgba(15,45,50,0.45)] transition-all duration-500 ease-out group-hover:-translate-y-2.5 group-hover:shadow-[0_38px_70px_-26px_rgba(15,45,50,0.6)]">
                    <div className="relative overflow-hidden rounded-xl ring-1 ring-black/5">
                      <img
                        src={encodeURI(d.img)}
                        alt={`RENOLIT Alkorplan Touch ${d.name} Poolfolie`}
                        loading="lazy"
                        className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 0 2px ${TURQ}55` }} />
                    </div>
                  </div>

                  {/* Bildunterschrift */}
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold leading-none text-foreground" style={{ fontFamily: PLAYFAIR }}>
                      {d.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{d.tagline}</p>
                  </div>

                  {/* Akzentlinie bei Hover */}
                  <span
                    className="mx-auto mt-3 block h-0.5 w-0 rounded-full transition-all duration-500 ease-out group-hover:w-12"
                    style={{ backgroundColor: ORANGE }}
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-label={`${DESIGNS[open].name} Design`}
          >
            {/* abgedunkelter Hintergrund */}
            <button
              type="button"
              aria-label="Schließen"
              onClick={close}
              className="absolute inset-0 cursor-zoom-out bg-black/80 backdrop-blur-md"
            />

            {/* vergrößertes Bild */}
            <figure className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in-95 duration-300 ease-out">
              <img
                src={encodeURI(DESIGNS[open].img)}
                alt={`RENOLIT Alkorplan Touch ${DESIGNS[open].name} Poolfolie`}
                className="max-h-[82vh] w-auto max-w-[92vw] rounded-2xl shadow-2xl ring-1 ring-white/10"
              />
              <figcaption className="mt-4 text-center text-white">
                <span className="block text-lg font-bold" style={{ fontFamily: PLAYFAIR }}>
                  {DESIGNS[open].name}
                </span>
                <span className="mt-1 block text-sm text-white/60">{DESIGNS[open].tagline}</span>
              </figcaption>
            </figure>

            {/* Schließen-Button */}
            <button
              type="button"
              onClick={close}
              aria-label="Schließen"
              className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <X className="size-6" />
            </button>

            {/* Navigation */}
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Vorheriges Design"
              className="absolute left-3 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="size-7" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Nächstes Design"
              className="absolute right-3 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="size-7" />
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}
