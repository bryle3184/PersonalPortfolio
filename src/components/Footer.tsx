import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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
      { label: "Selected works", id: "work" },
      { label: "About & principles", id: "about" },
      { label: "Experience", id: "experience" },
      { label: "Capabilities", id: "skills" },
      { label: "Credentials", id: "credentials" },
      { label: "Contact", id: "contact" },
    ],
  },
  {
    title: "Elsewhere",
    external: true,
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com" },
      { label: "Are.na", url: "https://www.are.na" },
      { label: "Read.cv", url: "https://read.cv" },
    ] as { label: string; url: string; id?: never }[],
  },
];

export default function Footer({ person, marquee }: FooterProps) {
  const navigate = useNavigate();

  const go = (id: string) => navigate("/", { state: { scrollTo: id } });

  return (
    <footer className="bg-ink text-paper">
      <Marquee items={[...marquee, "Available for work"]} />

      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="font-display text-4xl font-light leading-[1.0] tracking-[-0.01em] sm:text-6xl"
            >
              {person.name}
              <span className="text-vermilion">©</span>
            </Link>
            <p className="mt-4 max-w-sm font-grotesk text-sm leading-relaxed text-paper/60">
              {person.role.replace("&", "&amp;")} — designing warm, exact things in {person.location}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="label !text-paper/40">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {"id" in l ? (
                        <button
                          onClick={() => go((l as { id: string }).id)}
                          className="group inline-flex items-center gap-1.5 font-grotesk text-sm text-paper/80 transition-colors hover:text-vermilion"
                        >
                          {l.label}
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      ) : (
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1.5 font-grotesk text-sm text-paper/80 transition-colors hover:text-vermilion"
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
              <p className="label !text-paper/40">Set in</p>
              <p className="mt-5 font-grotesk text-sm text-paper/80">
                Fraunces
                <br />
                &amp; Space Grotesk
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/15 pt-6 font-grotesk text-[11px] uppercase tracking-[0.14em] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2015–{new Date().getFullYear()} {person.name}. All artefacts kept.
          </p>
          <p>Drawn in Figma, set in code, printed in the browser.</p>
        </div>
      </div>
    </footer>
  );
}