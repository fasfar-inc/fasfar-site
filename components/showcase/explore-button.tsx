"use client";

import type { Venture } from "@/content/ventures";
import { useMagnetic } from "@/lib/motion/use-magnetic";
import { ArrowRight } from "@/components/ui/icons";

/** Magnetic "Explore …" button that opens the venture's details sheet. */
export function ExploreButton({ venture, onExplore }: { venture: Venture; onExplore: (v: Venture) => void }) {
  const magnet = useMagnetic<HTMLDivElement>({ strength: 0.3, radius: 60 });
  const { primary } = venture.colors;
  return (
    <div ref={magnet} className="w-fit">
      <button
        type="button"
        onClick={() => onExplore(venture)}
        aria-haspopup="dialog"
        className="group relative inline-flex h-[52px] items-center gap-5 overflow-hidden rounded-full pl-7 pr-2 text-[15px] tracking-[-0.01em] text-white focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{ background: primary, outlineColor: primary }}
      >
        <span aria-hidden="true" className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-[320%]" />
        <span className="relative">Explore {venture.name}</span>
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform duration-500 group-hover:rotate-[-45deg]" style={{ color: primary }}>
          <ArrowRight className="h-4 w-4" />
        </span>
      </button>
    </div>
  );
}
