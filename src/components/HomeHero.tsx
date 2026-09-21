import { capabilities } from "@/lib/content";

export function HomeHero() {
  const [left, right] = capabilities;

  return (
    <section className="hero">
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
