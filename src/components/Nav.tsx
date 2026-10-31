import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import type { PortfolioData } from "../types";

const SECTIONS = [
  { n: "01", label: "Home", id: "top" },
  // { n: "02", label: "About", id: "about" },
  { n: "02", label: "Tech Stack", id: "skills" },
  { n: "03", label: "Experience", id: "experience" },
  { n: "04", label: "Projects", id: "work" },
  { n: "05", label: "Documentation", id: "documentation" },
  { n: "06", label: "Contact", id: "contact" },
];

export default function Nav({ person }: { person: PortfolioData["person"] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    navigate("/", { state: { scrollTo: id } });
  };

  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = person.resumeUrl || "/files/Reilee-Bryle-Ebuenga-Resume.pdf";
    a.download = "Reilee-Bryle-Ebuenga-Resume.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => go("top")}
            className="group flex items-baseline gap-2 font-display text-sm font-semibold uppercase tracking-[0.2em]"
          >
            Portfolio
            <span className="text-electric">●</span>
            {/* <span className="hidden text-xs font-normal tracking-[0.14em] text-ink-soft transition-colors group-hover:text-electric sm:inline-block">
              Software Developer
            </span> */}
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className="group flex items-center gap-1.5 font-grotesk text-[11px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-electric"
              >
                <span className="text-electric/60 tabular-nums group-hover:text-electric">{s.n}</span>
                {s.label}
              </button>
            ))}
            <button
              onClick={downloadResume}
              className="ml-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-electric/30 px-4 py-2 font-grotesk text-[11px] font-medium uppercase tracking-[0.18em] text-electric transition-all duration-300 hover:border-electric hover:bg-electric/10"
            >
              Resume
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-border lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5 text-ink" /> : <Menu className="h-5 w-5 text-ink" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={
          "fixed inset-0 z-50 flex flex-col justify-between bg-paper transition-opacity duration-300 lg:hidden " +
          (open ? "opacity-100" : "pointer-events-none opacity-0")
        }
        aria-hidden={!open}
      >
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 pt-4 sm:px-8">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-electric">
            {person.name}
          </span>
          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center border border-border"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-ink" />
          </button>
        </div>
        <nav className="mx-auto w-full max-w-[1240px] flex-1 px-5 sm:px-8" aria-label="Mobile">
          <ul className="flex flex-col divide-y divide-border">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className="group flex w-full items-baseline justify-between py-5 text-left"
                >
                  <span className="font-display text-3xl text-ink transition-colors group-hover:text-electric">
                    {s.label}
                  </span>
                  <span className="font-grotesk text-xs uppercase tracking-[0.2em] text-ink-soft tabular-nums">
                    {s.n}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-border px-5 py-6 sm:px-8">
          <button
            onClick={downloadResume}
            className="font-display text-lg italic text-electric"
          >
            Download Resume
          </button>
        </div>
      </div>
    </>
  );
}
