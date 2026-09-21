import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/content";

export const metadata: Metadata = {
  title: "产品",
  description: "棱维演示产品：BI 智能管理、股票智能分析、智能产品推广。",
};

export default function ProductsPage() {
  return (
    <div className="container">
      <header className="page-hero">
        <h1>演示产品</h1>
        <p>
          以下方案可申请试用。当前为演示级，具体开通方式沟通后确认；也支持在此基础上定制。
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        {products.map((product) => (
          <article
            className="product-detail"
            key={product.slug}
            id={product.slug}
          >
            <div className="product-meta">
              <span className="pill">{product.status}</span>
            </div>
            <h2>{product.name}</h2>
            <p className="section-desc">{product.summary}</p>
            <ul className="highlights">
              {product.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="btn-row">
              <Link
                href={`/contact?product=${product.slug}`}
                className="btn btn-primary"
              >
                申请试用
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
