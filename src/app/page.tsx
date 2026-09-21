import Link from "next/link";
import { brand, engagement, modules, type Showcase, type StudioModule } from "@/lib/content";
import { HomeHero, HomeStarflowBg } from "@/components/HomeHero";

function ShowcaseCard({ item }: { item: Showcase }) {
  const body = (
    <>
      <div className="product-meta">
        <span className="pill">{item.status}</span>
      </div>
      <h3>{item.name}</h3>
      <p>{item.summary}</p>
      <ul className="highlights">
        {item.highlights.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      {item.experienceHref ? <span className="more">点击体验 →</span> : null}
    </>
  );

  if (item.experienceHref) {
    return (
      <Link href={item.experienceHref} className="showcase-card showcase-card-link">
        {body}
      </Link>
    );
  }

  return <article className="showcase-card">{body}</article>;
}

function ModuleSection({ item }: { item: StudioModule }) {
  return (
    <section
      id={item.id}
      className="section home-section module"
      aria-labelledby={`${item.id}-title`}
    >
      <div className="container">
        <div className="module-head">
          <p className="section-kicker">{item.kicker}</p>
          <h2 id={`${item.id}-title`} className="section-title">
            {item.title}
          </h2>
          <p className="module-lead">{item.summary}</p>
          <p className="section-desc">{item.detail}</p>
        </div>

        <div className="module-stage">
          <p className="module-stage-label">{item.stageLabel}</p>
          <div className={`product-grid${item.showcases.length > 3 ? " product-grid-2x2" : ""}`}>
            {item.showcases.map((showcase) => (
              <ShowcaseCard key={showcase.slug} item={showcase} />
            ))}
          </div>
          {item.ctaHref && item.ctaLabel ? (
            <Link href={item.ctaHref} className="module-cta">
              {item.ctaLabel} →
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="home-with-starflow">
      <HomeStarflowBg />

      <HomeHero />

      <div className="home-sheet">
        <section className="section home-intro" aria-label="关于棱维">
          <div className="container">
            <p className="section-kicker">Studio</p>
            <h2 className="intro-title">
              将 AI 能力
              <br />
              转化为可上线的业务系统
            </h2>
            <p className="intro-lead">{brand.description}</p>
          </div>
        </section>

        {modules.map((item) => (
          <ModuleSection key={item.id} item={item} />
        ))}

        <section
          id={engagement.id}
          className="section home-section module"
          aria-labelledby="engage-title"
        >
          <div className="container">
            <div className="module-head">
              <p className="section-kicker">{engagement.kicker}</p>
              <h2 id="engage-title" className="section-title">
                {engagement.title}
              </h2>
              <p className="module-lead">{engagement.summary}</p>
            </div>

            <div className="principle-grid">
              {engagement.principles.map((item) => (
                <article key={item.title} className="principle-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>

            <div className="module-stage fee-stage">
              <p className="module-stage-label">收费方式</p>
              <div className="split-list fee-list">
                {engagement.fees.map((item) => (
                  <article key={item.name} className="split-item">
                    <div>
                      <h3>{item.name}</h3>
                      <p className="fee-model">{item.model}</p>
                    </div>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
              <p className="fee-note">{engagement.note}</p>
            </div>
          </div>
        </section>

        <section className="section home-section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="cta-band">
              <div>
                <h2>有明确需求，想直接聊定制？</h2>
                <p>说明场景与目标，我们会评估是否适合合作。</p>
              </div>
              <Link href="/contact" className="btn btn-primary">
                开始沟通
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
