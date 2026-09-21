import { brand } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>
            {brand.name} · {brand.english}
          </strong>
          <span> — AI 应用与全栈交付工作室</span>
        </div>
        <div>演示产品可申请试用 · 定制需求欢迎沟通</div>
      </div>
    </footer>
  );
}
