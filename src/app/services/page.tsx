import type { Metadata } from "next";
import Link from "next/link";
import { capabilities } from "@/lib/content";

export const metadata: Metadata = {
  title: "能力",
  description: "棱维的 AI 应用落地、全栈交付与产品梳理能力。",
};

export default function ServicesPage() {
  return (
    <div className="container">
      <header className="page-hero">
        <h1>能力与合作方式</h1>
        <p>
          我们是 4–5 人的交付工作室：可以把 AI 和应用做成可用系统，也可以按你的场景定制落地。
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="service-blocks">
          {capabilities.map((item) => (
            <article className="service-block" key={item.title}>
              <h2>{item.title}</h2>
              <p className="lead">{item.summary}</p>
              <p className="body">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="cta-band">
          <div>
            <h2>不确定该买演示还是做定制？</h2>
            <p>先申请试用或留下场景，我们帮你判断路径。</p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            申请沟通
          </Link>
        </div>
      </section>
    </div>
  );
}
