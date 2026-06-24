import { Link } from "@tanstack/react-router";
import { Phone, MessageSquare } from "lucide-react";
import { COMPANY } from "@/lib/site";

export function MobileCTA() {
  return (
    <div
      className="lg:hidden fixed left-3 right-3 z-40 grid grid-cols-2 gap-2"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
    >
      <a
        href={COMPANY.phoneHref}
        className="flex items-center justify-center gap-2 rounded-full bg-secondary text-secondary-foreground px-4 py-3 text-sm font-semibold shadow-elegant"
      >
        <Phone className="size-4" /> Anrufen
      </a>
      <Link
        to="/kontakt"
        className="flex items-center justify-center gap-2 rounded-full gradient-water text-primary-foreground px-4 py-3 text-sm font-semibold shadow-elegant"
      >
        <MessageSquare className="size-4" /> Angebot
      </Link>
    </div>
  );
}
