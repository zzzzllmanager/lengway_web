"use client";

import dynamic from "next/dynamic";
import { capabilities } from "@/lib/content";

const StarRiver = dynamic(
  () => import("@/components/StarRiver").then((m) => m.StarRiver),
  {
    ssr: false,
    loading: () => <div className="starflow-fallback" aria-hidden="true" />,
  },
);

/** Fixed viewport galaxy — stays visible as the page scrolls underneath. */
export function HomeStarflowBg() {
  return (
    <div className="starflow-page-bg" aria-hidden="true">
      <StarRiver />
    </div>
  );
}

export function HomeHero() {
  const [left, right] = capabilities;

  return (
    <section className="hero hero-starflow">
      <div className="hero-stage">
        <div className="hero-layout">
          <aside className="hero-side hero-side-left">
            <h2 className="hero-cap-title">{left.heroLabel}</h2>
          </aside>
          <div className="hero-core" aria-hidden="true" />
          <aside className="hero-side hero-side-right">
            <h2 className="hero-cap-title">{right.heroLabel}</h2>
          </aside>
        </div>
      </div>
    </section>
  );
}
