import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X, ChevronDown } from "lucide-react";
import { NAV, COMPANY, type NavChild } from "@/lib/site";

const ORANGE = "#F15A22";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const textColor = scrolled ? "#1a1a1a" : "#ffffff";
  const textShadow = scrolled ? "none" : "0 2px 8px rgba(0,0,0,0.7),0 1px 3px rgba(0,0,0,0.5)";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? "shadow-md" : ""}`}
      style={{ backgroundColor: scrolled ? "#ffffff" : "transparent", borderBottom: scrolled ? "1px solid #e5e5e5" : "none" }}
    >
      <div className="container-page flex h-18 items-center justify-between py-3">
        <Link to="/" className="flex items-center">
          <img src="/images/logo-fuchspools.png" alt="FuchsPools" className="h-14 w-auto" style={{ filter: scrolled ? "none" : "drop-shadow(0 1px 4px rgba(0,0,0,0.45))" }} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <MegaItem key={item.to} item={item} scrolled={scrolled} />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={COMPANY.phoneHref}
            className="flex items-center transition-colors hover:opacity-70"
            style={{ color: textColor, filter: scrolled ? "none" : "drop-shadow(0 1px 4px rgba(0,0,0,0.5))" }}
            aria-label={COMPANY.phone}
          >
            <Phone className="size-5" />
          </a>
          <Link
            to="/kontakt"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
            style={scrolled
              ? { backgroundColor: ORANGE, color: "#ffffff" }
              : { backgroundColor: "#ffffff", color: ORANGE }
            }
          >
            Angebot anfordern
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 transition-colors"
          style={{ color: textColor }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-[60] h-[100dvh] bg-white flex flex-col">
          <div className="flex h-18 items-center justify-between border-b border-border/60 container-page py-3">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
              <img src="/images/logo-fuchspools.png" alt="FuchsPools" className="h-14 w-auto" />
            </Link>
            <button
              className="p-2 -mr-2"
              style={{ color: ORANGE }}
              onClick={() => setOpen(false)}
              aria-label="Menü schließen"
            >
              <X />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto container-page py-4 space-y-1">
            {NAV.map((item) => (
              <div key={item.to} className="border-b border-border/60 pb-1">
                <button
                  className="w-full flex items-center justify-between py-2 text-left font-medium"
                  onClick={() => setOpenMobile(openMobile === item.to ? null : item.to)}
                >
                  <Link
                    to={item.to}
                    activeOptions={item.to === "/" ? { exact: true } : undefined}
                    onClick={() => setOpen(false)}
                    activeProps={{ style: { color: ORANGE, fontWeight: 700 } }}
                  >{item.label}</Link>
                  {item.children && <ChevronDown className={`size-4 transition ${openMobile === item.to ? "rotate-180" : ""}`} />}
                </button>
                {item.children && openMobile === item.to && (
                  <div className="pl-3 pb-2 space-y-1">
                    {item.children.map((c) => (
                      <MobileSub key={c.to} item={c} onPick={() => setOpen(false)} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <a href={COMPANY.phoneHref} className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 font-medium">
                <Phone className="size-4" /> {COMPANY.phone}
              </a>
              <Link to="/kontakt" onClick={() => setOpen(false)} className="rounded-full px-4 py-3 text-center font-semibold text-white" style={{ backgroundColor: ORANGE }}>
                Angebot anfordern
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileSub({ item, onPick }: { item: NavChild; onPick: () => void }) {
  const [o, setO] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <Link to={item.to} onClick={onPick} className="block py-1.5 text-sm text-muted-foreground hover:text-primary">
          {item.label}
        </Link>
        {item.children && (
          <button onClick={() => setO((v) => !v)} className="p-1">
            <ChevronDown className={`size-3 transition ${o ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      {item.children && o && (
        <div className="pl-3 border-l border-border ml-1">
          {item.children.map((c) => (
            <Link key={c.to} to={c.to} onClick={onPick} className="block py-1.5 text-sm text-muted-foreground hover:text-primary">
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MegaItem({ item, scrolled }: { item: NavChild; scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  const color = scrolled ? "#1a1a1a" : "#ffffff";
  const shadow = scrolled ? "none" : "0 2px 8px rgba(0,0,0,0.7),0 1px 3px rgba(0,0,0,0.5)";

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={item.to}
        activeOptions={item.to === "/" ? { exact: true } : undefined}
        className="flex items-center gap-1 px-3 py-2 text-base font-semibold transition rounded-md hover:opacity-70"
        style={{ color, textShadow: shadow }}
        activeProps={{ style: { color: ORANGE, textShadow: "none", fontWeight: 700 } }}
      >
        {item.label}
        {item.children && <ChevronDown className="size-3.5 opacity-70" />}
      </Link>
      {item.children && open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
          <div className="w-auto min-w-max rounded-2xl border border-border bg-popover shadow-elegant p-3 grid">
            {item.children.map((c) => (
              <div key={c.to} className="group">
                <Link
                  to={c.to}
                  className="block rounded-lg px-3 py-2 text-base font-medium whitespace-nowrap hover:bg-accent hover:text-primary transition"
                >
                  {c.label}
                </Link>
                {c.children && (
                  <div className="pl-4 pb-2">
                    {c.children.map((cc) => (
                      <Link
                        key={cc.to}
                        to={cc.to}
                        className="block rounded-md px-3 py-1.5 text-sm whitespace-nowrap text-muted-foreground hover:text-primary"
                      >
                        {cc.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
