import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { modules } from "@/lib/content";

type ExperiencePageProps = {
  params: Promise<{ slug: string }>;
};

function findShowcase(slug: string) {
  return modules
    .flatMap((item) => item.showcases)
    .find((item) => item.slug === slug && item.experienceHref);
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = findShowcase(slug);
  return {
    title: product ? `体验 ${product.name}` : "演示体验",
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const product = findShowcase(slug);
  if (!product) notFound();

  return (
    <div className="container">
      <header className="page-hero">
        <h1>{product.name}</h1>
        <p>{product.summary}</p>
      </header>
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-desc">
          演示体验通道接入后，将在此直接进入对应系统。
        </p>
        <div className="btn-row" style={{ marginTop: "1.25rem" }}>
          <Link href="/#ai" className="btn btn-secondary">
            返回 AI
          </Link>
          <Link href="/contact" className="btn btn-primary">
            沟通需求
          </Link>
        </div>
      </section>
    </div>
  );
}
