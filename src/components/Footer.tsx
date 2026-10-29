import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Download } from "lucide-react";
import Marquee from "./Marquee";
import type { PortfolioData } from "../types";

interface FooterProps {
  person: PortfolioData["person"];
  marquee: string[];
}

const COLS = [
  {
    title: "Index",
    links: [
      { label: "Home", id: "top" },
      { label: "About", id: "about" },
      { label: "Tech Stack", id: "skills" },
      { label: "Experience", id: "experience" },
      { label: "Projects", id: "work" },
      { label: "Contact", id: "contact" },
    ],
  },
  {
    title: "Elsewhere",
    external: true,
    links: [
      { label: "GitHub", url: "https://github.com/bryle3184" },
    ] as { label: string; url: string; id?: never }[],
  },
];

export default function Footer({ person, marquee }: FooterProps) {
  const navigate = useNavigate();

  const go = (id: string) => navigate("/", { state: { scrollTo: id } });

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
    <footer className="bg-paper text-ink">
      <Marquee items={[...marquee, ""]} />

      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="font-display text-4xl font-light leading-[1.0] tracking-[-0.01em] text-ink sm:text-6xl"
            >
              {person.name}
              <span className="text-electric">.</span>
            </Link>
            <p className="mt-4 max-w-sm font-grotesk text-sm leading-relaxed text-ink-soft">
              {person.role} — building software solutions in {person.location}.
            </p>
            <button
              onClick={downloadResume}
              className="mt-4 inline-flex items-center gap-2 font-grotesk text-sm text-electric transition-colors hover:underline"
            >
              <Download className="h-4 w-4" />
              Download résumé
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="label !text-ink-soft">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {"id" in l ? (
                        <button
                          onClick={() => go((l as { id: string }).id)}
                          className="group inline-flex items-center gap-1.5 font-grotesk text-sm text-ink-soft transition-colors hover:text-electric"
                        >
                          {l.label}
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      ) : (
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1.5 font-grotesk text-sm text-ink-soft transition-colors hover:text-electric"
                        >
                          {l.label}
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="label !text-ink-soft">Typography</p>
              <p className="mt-5 font-grotesk text-sm text-ink-soft">
                Geist
                <br />
                &amp; Inter
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 font-grotesk text-[11px] uppercase tracking-[0.14em] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {person.name}. All rights reserved. Designed and built by {person.name}.
          </p>
          <p>Designed in Figma, set in code, printed in the browser.</p>
        </div>
      </div>
    </footer>
  );
}
