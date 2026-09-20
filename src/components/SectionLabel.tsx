import { Asterisk } from "lucide-react";
import type { ReactNode } from "react";

interface SectionLabelProps {
  index: string;
  children: ReactNode;
}

/** "01 ━─ Selected Works" — the recurring editorial section header. */
export default function SectionLabel({ index, children }: SectionLabelProps) {
  return (
    <p className="label flex items-center gap-3">
      <Asterisk className="h-3.5 w-3.5 text-vermilion" aria-hidden="true" />
      <span className="text-vermilion tabular-nums">{index}</span>
      <span className="h-px w-8 bg-ink/20" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}