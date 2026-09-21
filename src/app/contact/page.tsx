import type { Metadata } from "next";
import { TrialForm } from "@/components/TrialForm";

export const metadata: Metadata = {
  title: "申请试用",
  description: "申请试用棱维演示产品，或留下定制需求。",
};

type ContactPageProps = {
  searchParams: Promise<{ product?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const defaultProduct = params.product ?? "";

  return (
    <div className="container">
      <header className="page-hero">
        <h1>申请试用 / 沟通需求</h1>
        <p>
          试用演示产品，或直接说明定制场景。表单先本地占位，联系通道稍后接入。
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0, paddingBottom: "4rem" }}>
        <TrialForm defaultProduct={defaultProduct} />
      </section>
    </div>
  );
}
