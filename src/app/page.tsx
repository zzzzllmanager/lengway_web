import Link from "next/link";
import { products } from "@/lib/content";
import { HomeHero } from "@/components/HomeHero";

export default function HomePage() {
  return (
    <div>
      <HomeHero />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="section-kicker">Demos</p>
            <h2 className="section-title">可申请试用的演示产品</h2>
            <p className="section-desc">
              当前为演示级方案，适合先体验方向，再决定采购或定制。
            </p>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products#${product.slug}`}
                className="product-link"
              >
                <div className="product-meta">
                  <span className="pill">{product.status}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.summary}</p>
                <span className="more">查看详情 →</span>
              </Link>
            ))}
          </div>

          <div className="cta-band">
            <div>
              <h2>有明确需求，想直接聊定制？</h2>
              <p>说明场景与目标，我们会评估是否适合合作。</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              去申请 / 沟通
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
