import { useMemo } from "react";

/** A slow rolling ticker between major sections. */
export default function Marquee({ items }: { items: string[] }) {
  const side = useMemo(() => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : undefined), []);

  return (
    <div className="relative overflow-hidden border-y border-border bg-charcoal text-ink-soft" aria-hidden="true">
      <div
        className="flex w-max py-3.5"
        style={side === 0 ? { animation: "none" } : { animation: "marquee 42s linear infinite" }}
      >
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={`${group}-${i}`} className="flex items-center font-display text-lg italic text-electric">
                <span className="px-6">{item}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
