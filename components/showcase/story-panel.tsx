"use client";

import Image from "next/image";
import type { StoryIcon } from "@/content/ventures";
import { cn } from "@/lib/cn";
import { ExploreButton } from "./explore-button";
import type { VenturePanelProps } from "./venture-panel";
import styles from "./story-panel.module.css";

/**
 * Editorial showcase panel (used by GARDAŞ): kicker, heavy name, a large
 * headline, a short paragraph, highlights and the call to action, beside a
 * full-bleed scene image. Shares the `data-sv*` hooks with the standard panel
 * so the showcase timeline and the venture's recipe drive it the same way.
 */
export function StoryPanel({ venture, index, total, previousSurface, onExplore }: VenturePanelProps) {
  const { surface, ink } = venture.colors;
  const story = venture.story!;
  const scene = venture.media.scene!;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <article
      data-venture-panel
      data-index={index}
      aria-labelledby={`venture-${venture.slug}`}
      className="relative min-h-svh overflow-hidden [background:var(--sv-surface)] group-data-[mode=cinematic]/showcase:absolute group-data-[mode=cinematic]/showcase:inset-0 group-data-[mode=cinematic]/showcase:min-h-0 group-data-[mode=stacked]/showcase:[background:linear-gradient(180deg,var(--sv-prev)_0,var(--sv-surface)_26svh)]"
      style={{ ["--sv-surface" as string]: surface, ["--sv-prev" as string]: previousSurface, color: ink, zIndex: index + 1 }}
    >
      <div data-panel-inner className={styles.inner}>
        <div className={styles.visual}>
          <div data-sv="rig" className={styles.rig}>
            <Image
              data-sv="scene"
              src={scene.src}
              alt={scene.alt}
              width={scene.width}
              height={scene.height}
              sizes="(min-width: 768px) 40vw, 100vw"
              className={styles.scene}
            />
          </div>
        </div>

        <header className={styles.head}>
          <p data-sv-copy className="eyebrow flex items-center gap-3" style={{ color: ink }}>
            <span className="tabular-nums opacity-80">{`${pad(index + 1)} / ${pad(total)}`}</span>
            <span className={styles.rule} />
            <span className="opacity-70">{venture.industry}</span>
          </p>
          <p data-sv-copy className={styles.kicker}>
            {story.kicker}
          </p>
          <h3 id={`venture-${venture.slug}`} className={styles.nameWrap}>
            <span data-sv-name className={styles.name}>
              {venture.name}
            </span>
          </h3>
          <p data-sv-copy className={styles.headline}>
            {story.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </header>

        <div className={styles.body}>
          <p data-sv-copy className={styles.desc}>
            {venture.description}
          </p>
          <ul className={styles.features}>
            {story.highlights.map((h) => (
              <li key={h.title} data-sv-copy className={styles.feature}>
                <span className={styles.icon}>
                  <HighlightIcon name={h.icon} className={styles.svg} />
                </span>
                <span className={styles.featureCopy}>
                  <strong>{h.title}</strong>
                  <span>{h.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div data-sv-copy className={cn(styles.cta, "flex flex-wrap items-center gap-4")}>
            <ExploreButton venture={venture} onExplore={onExplore} />
          </div>
        </div>
      </div>
    </article>
  );
}

function HighlightIcon({ name, className }: { name: StoryIcon; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  if (name === "car") {
    return (
      <svg {...common}>
        <path d="M3.5 15.6v-2.7c0-.5.2-1 .5-1.4L6 9.3l1.3-2.7A2 2 0 0 1 9.1 5.5h5.8a2 2 0 0 1 1.8 1.1L18 9.3l2 2.2c.3.4.5.9.5 1.4v2.7a.9.9 0 0 1-.9.9H4.4a.9.9 0 0 1-.9-.9Z" />
        <path d="M6 9.3h12M8.5 13.2h7M5.6 16.5v1.6M18.4 16.5v1.6" />
        <circle cx="6.9" cy="13.1" r=".9" />
        <circle cx="17.1" cy="13.1" r=".9" />
      </svg>
    );
  }
  if (name === "plane") {
    return (
      <svg {...common}>
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="7.6" r="2.9" />
      <path d="M6.6 19.5v-1.2a4.2 4.2 0 0 1 4.2-4.2h2.4a4.2 4.2 0 0 1 4.2 4.2v1.2" />
      <circle cx="5.4" cy="9.4" r="2.1" />
      <path d="M2.2 18.4v-.6a3.3 3.3 0 0 1 3.3-3.3h.9" />
      <circle cx="18.6" cy="9.4" r="2.1" />
      <path d="M21.8 18.4v-.6a3.3 3.3 0 0 0-3.3-3.3h-.9" />
    </svg>
  );
}
