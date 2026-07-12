import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Layers, Waves, ArrowRight, Palette, Wrench, Blocks, Settings, Sparkles, PencilRuler, Check } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { TrustBar } from "@/components/TrustBar";
import { useReveal } from "@/lib/useReveal";
import { SITE_URL } from "@/lib/site";
import leistungenBg from "@/assets/leistungen-bg.webp";

// Echte Fuchs Pools-Kundenfotos (public/images/kunde)
const aboutPool = "/images/kunde/img_03.jpg"; // Pool mit Holzterrasse am Haus
const ref9 = "/images/kunde/img_04.jpg";
const ref10 = "/images/kunde/img_17.jpg";
const ref11 = "/images/kunde/img_22.jpg";
const ref12 = "/images/kunde/img_07.jpg";
const ref13 = "/images/kunde/img_05.jpg";
const ref14 = "/images/kunde/img_25.jpg";
const ref15 = "/images/kunde/img_01.jpg";
const ref16 = "/images/kunde/img_18.jpg";
const ref17 = "/images/kunde/img_24.jpg";
const bild19 = "/images/kunde/img_11.jpg"; // Pool mit Liegen, Querformat
const highlight1 = "/images/kunde/img_24.jpg"; // Pools nach Maß
const highlight2 = "/images/kunde/img_25.jpg"; // Folien & Design
const highlight3 = "/images/kunde/img_20.jpg"; // Pool-Überdachungen
const highlight4 = "/images/kunde/img_09.jpg"; // Aufbau & Montage

// Individuelle Alt-Texte für die Referenz-Galerie (Reihenfolge = ref9…ref17)
const REFERENZ_ALTS = [
  "Rechteckpool mit Alkorplan-Folie und umlaufender Terrasse",
  "Gartenpool mit Römertreppe und klarem blauem Wasser",
  "Pool mit Überdachung im Garten in Niederbayern",
  "Gemauerter Pool mit sauber verlegtem Randstein",
  "Schwimmbecken mit Holzterrasse am Einfamilienhaus",
  "Pool in edler Steinoptik-Folie von Fuchs Pools",
  "Individuell nach Maß gebauter Pool im Garten",
  "Großzügiger Gartenpool mit Sonnenliegen",
  "Fertig montierter Premium-Pool von Fuchs Pools in Niederbayern",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fuchs Pools – Traum-Pools nach Maß aus Niederbayern" },
      { name: "description", content: "Fuchs Pools GmbH aus Reisbach plant, baut und montiert premium Pools ganz nach Ihren Wünschen – Ihr Poolbauer in Niederbayern." },
      { property: "og:url", content: SITE_URL + "/" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL + "/" },
    ],
  }),
  component: HomePage,
});

// Unser Leistungsversprechen – eigene Aussagen von Fuchs Pools, KEINE Kundenbewertungen.
// (Echte, verifizierbare Kundenbewertungen können hier später ergänzt werden.)
const REVIEWS = [
  {
    text: "Jeder Pool entsteht individuell nach Ihren Wünschen – von der ersten Beratung über die Planung bis zur fachgerechten Montage, alles aus einer Hand.",
    name: "",
    source: "",
  },
  {
    text: "Wir setzen auf hochwertige Materialien und saubere Verarbeitung – für einen Pool, an dem Sie viele Jahre Freude haben.",
    name: "",
    source: "",
  },
  {
    text: "Als Ihr persönlicher Ansprechpartner aus Niederbayern begleiten wir Sie zuverlässig durch Ihr gesamtes Pool-Projekt.",
    name: "",
    source: "",
  },
];

const LEISTUNGEN = [
  { icon: Waves, title: "Pools nach Maß", text: "Individuell geplante und gebaute Pools – Form, Größe und Tiefe ganz nach Ihren Wünschen.", to: "/poolabdeckungen" },
  { icon: Wrench, title: "Aufbau & Montage", text: "Vom Aushub über den Beckenbau aus robusten Styroporsteinen bis zur Technik – alles aus einer Hand.", to: "/aufbau-unserer-pools" },
  { icon: Palette, title: "Folien & Design", text: "Hochwertige Alkorplan-Folien in vielen Farben und Oberflächen – auf Wunsch in edler Steinoptik.", to: "/folien-farben-design" },
  { icon: Layers, title: "Pool-Überdachungen", text: "Schützen Sie Ihren Pool und verlängern Sie die Badesaison mit einer passenden Überdachung.", to: "/daecher" },
  { icon: Blocks, title: "Treppen & Einbauteile", text: "Formschöne Treppen sowie Skimmer, Düsen und Scheinwerfer – sauber in den Pool integriert.", to: "/aufbau-unserer-pools" },
  { icon: Settings, title: "Pooltechnik", text: "Filter, Umwälzpumpen und Heizung – effiziente Technik, fachgerecht installiert.", to: "/kontakt" },
  { icon: Sparkles, title: "Sanierung & Renovierung", text: "Ihr Pool ist in die Jahre gekommen? Wir erneuern Folie, Technik und Optik.", to: "/kontakt" },
  { icon: PencilRuler, title: "Beratung & Planung", text: "Von der ersten Idee bis zum fertigen Konzept – persönliche Beratung in Niederbayern.", to: "/kontakt" },
];

function HomePage() {
  const [reviewSlide, setReviewSlide] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section className="relative isolate overflow-hidden -mt-18 min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <img src="/images/kunde/img_18.jpg" alt="" width={2560} height={1920} fetchPriority="high" className="size-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div data-hero className="flex flex-col items-center text-center px-6 pt-36 sm:pt-48 pb-24 text-white">
          <h1
            data-hero-item
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)", textTransform: "none" }}
          >
            TRAUM-POOLS<br />NACH MAß
            <span className="block mt-3 text-xl md:text-3xl lg:text-4xl font-medium tracking-[0.2em]">IN NIEDERBAYERN</span>
          </h1>
          <p
            data-hero-item
            className="mt-5 text-lg md:text-2xl font-medium tracking-widest uppercase text-white/90"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
          >
            Ihr Spezialist für Ihren individuellen<br />Premium-Pool aus Niederbayern
          </p>
          <p data-hero-item className="mt-5 text-base md:text-lg text-white/75 max-w-xl" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}>
            Wir bauen Ihren Traum-Pool ganz nach Ihren Wünschen – kontaktieren Sie uns!
          </p>
          <Link
            to="/kontakt"
            data-hero-item
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold transition hover:bg-white/90"
            style={{ color: "#F15A22" }}
          >
            Jetzt Termin für Erstberatung vereinbaren <ArrowRight className="size-4" />
          </Link>
          <div data-hero-item className="mt-10 opacity-60">
            <svg width="180" height="48" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 16 C 30 2, 60 30, 90 16 C 120 2, 150 30, 175 16" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <path d="M5 28 C 30 14, 60 42, 90 28 C 120 14, 150 42, 175 28" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <path d="M5 40 C 30 26, 60 54, 90 40 C 120 26, 150 54, 175 40" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* ÜBER UNS */}
      <section className="mt-20 grid lg:grid-cols-[3fr_1.2fr] overflow-hidden">
        {/* Text links */}
        <div data-reveal="left" className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 lg:py-24 bg-white">
          <h2
            className="text-2xl md:text-3xl lg:text-[1.9rem] font-bold leading-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Fuchs Pools aus Reisbach baut Ihren Traum-Pool
          </h2>
          <div className="mt-8 border-l-2 pl-6 space-y-3 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", borderColor: "#16B5C0" }}>
            <p className="text-base text-muted-foreground">
              Wir sind ein mittelständisches Unternehmen aus Reisbach und bauen seit mehreren Jahren premium Pools ganz nach Ihren Wünschen. Das macht uns zu Ihrem kompetenten und persönlichen Ansprechpartner rund um Ihren Pool in Niederbayern.
            </p>
            <p className="text-base text-muted-foreground">
              Ob individueller Aufbau, Folien in Ihrer Wunschfarbe oder die passende Überdachung – jede Lösung wird exakt auf Ihre Wünsche abgestimmt. Wir begleiten Sie von der Erstberatung über die Planung bis zur fachgerechten Montage.
            </p>
            <p className="text-base text-muted-foreground">
              Selbstverständlich kümmern wir uns auch um Folienfarben, Design und Dächer – für einen Pool, an dem Sie das ganze Jahr über Freude haben.
            </p>
          </div>
        </div>

        {/* Bild rechts */}
        <div data-reveal="right" className="relative min-h-[520px]" style={{ backgroundColor: "#16B5C0" }}>
          <div className="absolute inset-8 border border-white/50 pointer-events-none z-10" />
          <div className="absolute inset-x-4 top-10 bottom-10 lg:inset-x-auto lg:-left-10 lg:right-10 shadow-2xl overflow-hidden">
            <img src={aboutPool} alt="Rechteckpool mit Holzterrasse direkt am Haus in Niederbayern" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Wassertropfen Hintergrund */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <img src={leistungenBg} alt="" className="w-full h-full object-cover opacity-40" />
        </div>

        <div className="container-page relative z-10">
          <h2
            data-reveal
            className="text-center text-4xl md:text-5xl font-bold mb-16 text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Fuchs Pools Leistungen
          </h2>
          <div data-reveal-group className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
            {LEISTUNGEN.map((item) => (
              <Link key={item.title} to={item.to} data-reveal-item className="group">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition">
                    {item.title}
                  </h3>
                  <item.icon className="size-10 shrink-0 mt-0.5" strokeWidth={1} style={{ color: "#16B5C0" }} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section>
        <div className="py-16 text-center" style={{ backgroundColor: "#f5f5f3" }}>
          <div data-reveal className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Highlights</div>
          <h2
            data-reveal
            data-reveal-delay="0.08"
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Premiumprodukte, die Sie sofort begeistern
          </h2>
        </div>
        <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8" style={{ backgroundColor: "#f5f5f3" }}>
          {/* Zeile 1 */}
          <div data-reveal-item className="bg-[#f5f5f3] flex flex-col items-center justify-center px-8 py-16 min-h-[300px] sm:min-h-[480px]">
            <Waves className="size-16 mb-6" strokeWidth={1} style={{ color: "#16B5C0" }} />
            <h3 className="text-xl font-bold text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Pools nach Maß</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">Jeder Pool wird individuell geplant und gebaut – Form, Größe und Tiefe ganz nach Ihren Wünschen.</p>
            <Link to="/poolabdeckungen" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Mehr erfahren <ArrowRight className="size-3.5" /></Link>
          </div>
          <div data-reveal-item className="min-h-[240px] sm:min-h-[480px] overflow-hidden">
            <img src={highlight1} alt="Individuell geplanter Pool nach Maß von Fuchs Pools in Niederbayern" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div data-reveal-item className="bg-[#f5f5f3] flex flex-col items-center justify-center px-8 py-16 min-h-[300px] sm:min-h-[480px]">
            <Palette className="size-16 mb-6" strokeWidth={1} style={{ color: "#16B5C0" }} />
            <h3 className="text-xl font-bold text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Folien & Design</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">Hochwertige Alkorplan-Folien in vielen Farben und Oberflächen – für genau Ihren Wunsch-Look.</p>
            <Link to="/folien-farben-design" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Mehr erfahren <ArrowRight className="size-3.5" /></Link>
          </div>
          <div data-reveal-item className="min-h-[240px] sm:min-h-[480px] overflow-hidden">
            <img src={highlight2} alt="Pool mit hochwertiger Alkorplan-Folie in edler Steinoptik" loading="lazy" className="w-full h-full object-cover" />
          </div>
          {/* Zeile 2 */}
          <div data-reveal-item className="bg-[#f5f5f3] flex flex-col items-center justify-center px-8 py-16 min-h-[300px] sm:min-h-[480px]">
            <Layers className="size-16 mb-6" strokeWidth={1} style={{ color: "#16B5C0" }} />
            <h3 className="text-xl font-bold text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Pool-Überdachungen</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">Schützen Sie Ihren Pool und verlängern Sie die Badesaison mit einer passenden Überdachung.</p>
            <Link to="/daecher" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Mehr erfahren <ArrowRight className="size-3.5" /></Link>
          </div>
          <div data-reveal-item className="min-h-[240px] sm:min-h-[480px] overflow-hidden">
            <img src={highlight3} alt="Pool mit Überdachung im Garten für eine längere Badesaison" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div data-reveal-item className="bg-[#f5f5f3] flex flex-col items-center justify-center px-8 py-16 min-h-[300px] sm:min-h-[480px]">
            <Wrench className="size-16 mb-6" strokeWidth={1} style={{ color: "#16B5C0" }} />
            <h3 className="text-xl font-bold text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Aufbau & Montage</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">Vom Aushub über den Beckenbau bis zur Technik – alles fachgerecht aus einer Hand.</p>
            <Link to="/aufbau-unserer-pools" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Mehr erfahren <ArrowRight className="size-3.5" /></Link>
          </div>
          <div data-reveal-item className="min-h-[240px] sm:min-h-[480px] overflow-hidden">
            <img src={highlight4} alt="Aufbau und Montage eines Pools durch das Fuchs Pools-Team" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* GFK-SANIERUNG */}
      <section className="bg-white py-20 md:py-28 overflow-hidden">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Bild-Collage */}
          <div data-reveal="left" className="grid grid-cols-2 gap-3 md:gap-4">
            {["/images/gfk/gfk-2.jpg", "/images/gfk/gfk-4.jpg", "/images/gfk/gfk-1.jpg", "/images/gfk/gfk-3.jpg"].map((src, i) => (
              <div key={src} className={`overflow-hidden rounded-2xl shadow-card ${i % 2 === 1 ? "sm:mt-6" : ""}`}>
                <img src={src} alt="GFK-Becken-Sanierung bei Fuchs Pools" loading="lazy" className="aspect-[3/4] w-full object-cover" />
              </div>
            ))}
          </div>

          {/* Text */}
          <div data-reveal="right">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#16B5C0" }}>
              Sanierung
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sanierung von GFK-Becken
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Ihr GFK-Pool ist in die Jahre gekommen oder durch <span className="font-semibold text-foreground">Osmose</span> beschädigt?
              Wir bringen Ihr Becken wieder auf Hochglanz. In unserer Werkstatt sanieren wir GFK-Becken fachgerecht –
              von der Schadensanalyse über die Reparatur der Laminatschichten bis hin zur neuen, hochwertigen Oberfläche
              ganz nach Ihren Wünschen.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Beseitigung von Osmose- und Feuchtigkeitsschäden",
                "Reparatur von Rissen im Gelcoat und Laminat",
                "Erneuerung der Oberfläche – auf Wunsch in edler Steinoptik",
                "Treppen und Einbauteile werden fachgerecht mitsaniert",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 grid place-items-center size-5 shrink-0 rounded-full" style={{ backgroundColor: "#16B5C0" }}>
                    <Check className="size-3 text-white" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/kontakt"
              className="mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#F15A22" }}
            >
              Sanierung anfragen <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* REFERENZEN */}
      <section className="relative overflow-hidden">
        {/* Split-Hintergrund über die gesamte Sektionshöhe */}
        <div className="absolute inset-0 grid grid-cols-[42%_58%] pointer-events-none" aria-hidden="true">
          <div className="bg-white" />
          <div style={{ backgroundColor: "#16B5C0" }} />
        </div>

        {/* Inhalt */}
        <div className="relative">
          {/* Heading-Bereich: "Referenzen" links, beige rechts sichtbar */}
          <div className="px-6 sm:px-16 py-16 sm:py-24">
            <h2
              data-reveal
              className="text-4xl sm:text-5xl font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Referenzen
            </h2>
          </div>

          {/* Bild-Grid – spannt über weiße UND beige Seite */}
          <div data-reveal-group className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-6 sm:px-12 lg:px-28 pb-16">
            {[ref9, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17].map((src, i) => (
              <div key={i} data-reveal-item className="aspect-[4/3] overflow-hidden group">
                <img src={src} alt={REFERENZ_ALTS[i] ?? `Referenz-Pool ${i + 1} von Fuchs Pools in Niederbayern`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REZENSIONEN */}
      <section className="relative overflow-hidden bg-white py-24 px-4 sm:px-8">
        {/* Wassertropfen-Textur */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <img src={leistungenBg} alt="" className="w-full h-full object-cover opacity-15" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2
            data-reveal
            className="text-4xl sm:text-5xl font-bold text-foreground mb-10 sm:mb-14"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Unser Versprechen
          </h2>

          {/* Zitat-Box mit feiner brauner Umrandung */}
          <div data-reveal data-reveal-delay="0.1" className="px-6 py-10 sm:px-14 sm:py-12" style={{ border: "1px solid #16B5C0" }}>
            <div className="min-h-[140px] flex flex-col justify-center">
              <p
                className="text-xl leading-relaxed text-foreground/80 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {REVIEWS[reviewSlide].text}
              </p>
              {REVIEWS[reviewSlide].name && (
                <p className="mt-8 text-base font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {REVIEWS[reviewSlide].name}
                </p>
              )}
              {REVIEWS[reviewSlide].source && (
                <p className="mt-1 text-sm text-muted-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {REVIEWS[reviewSlide].source}
                </p>
              )}
            </div>
          </div>

          {/* Navigations-Punkte */}
          <div className="flex justify-center gap-2 mt-10">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewSlide(i)}
                className={`rounded-full transition-all ${i === reviewSlide ? "size-2.5 bg-foreground/50" : "size-2 bg-foreground/20 hover:bg-foreground/35"}`}
                aria-label={`Rezension ${i + 1}`}
              />
            ))}
          </div>

          <Link
            to="/kontakt"
            className="mt-10 inline-flex items-center px-6 py-3 text-white font-medium transition hover:opacity-90"
            style={{ backgroundColor: "#F15A22", fontFamily: "'Playfair Display', serif" }}
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>

      {/* ÜBER UNS – Bild links / Text rechts */}
      <section className="grid lg:grid-cols-2 overflow-hidden">
        {/* Bild – randlos links */}
        <div data-reveal="left" className="relative min-h-[600px]">
          <img src={bild19} alt="Pool mit Sonnenliegen im Garten – Referenz von Fuchs Pools in Niederbayern" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Text rechts */}
        <div data-reveal="right" className="flex flex-col justify-center px-6 sm:px-14 lg:px-20 py-16 lg:py-20 bg-white">
          <h2
            className="text-4xl font-bold text-foreground mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Über uns
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-10">
            Seit mehreren Jahren sind wir Ihr zuverlässiger Ansprechpartner rund um den Pool in Niederbayern. Von der individuellen Beratung über die Planung bis zur fachgerechten Montage – bei Fuchs Pools erhalten Sie alles aus einer Hand. Unser Team berät Sie persönlich und findet für jeden Pool die optimale Lösung.
          </p>

          {/* Callout mit linkem Balken */}
          <div className="border-l-[3px] pl-5 mb-6" style={{ borderColor: "#16B5C0" }}>
            <p className="text-base font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Unsere Leistungen auf einen Blick:
            </p>
          </div>

          {/* 2-spaltige Liste – klickbar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {LEISTUNGEN.map((item) => (
              <Link key={item.title} to={item.to} className="flex items-center gap-3 group">
                <div className="size-3 shrink-0 transition group-hover:opacity-70" style={{ backgroundColor: "#16B5C0" }} />
                <span className="text-sm text-foreground group-hover:text-primary transition">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EINZUGSGEBIET */}
      <section className="bg-white py-20 md:py-28 overflow-hidden">
        <div className="container-page">
          <div data-reveal className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#16B5C0" }}>
              Einzugsgebiet
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ihr Poolbauer im Landkreis Dingolfing-Landau &amp; Umgebung
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Von unserem Standort in Reisbach aus planen und bauen wir Pools in ganz Niederbayern.
              Ob Neubau, Folie, Überdachung oder Sanierung – wir kommen gerne zu Ihnen. Regelmäßig
              sind wir unter anderem in diesen Orten und der jeweiligen Umgebung für unsere Kundinnen
              und Kunden im Einsatz:
            </p>
          </div>

          <ul data-reveal data-reveal-delay="0.1" className="mt-8 flex flex-wrap gap-3">
            {[
              "Reisbach",
              "Dingolfing",
              "Landau an der Isar",
              "Landshut",
              "Vilsbiburg",
              "Eggenfelden",
              "Frontenhausen",
              "Pilsting",
              "Mamming",
            ].map((ort) => (
              <li
                key={ort}
                className="rounded-full border px-4 py-2 text-sm font-medium text-foreground"
                style={{ borderColor: "#16B5C0" }}
              >
                {ort}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-muted-foreground">
            Ihr Ort ist nicht dabei?{" "}
            <Link to="/kontakt" className="font-semibold text-primary hover:underline">
              Sprechen Sie uns an
            </Link>{" "}
            – wir prüfen gerne, ob wir auch Ihr Projekt umsetzen können.
          </p>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
