export const brand = {
  name: "棱维",
  english: "Lengway",
  tagline: "把想法做成能上线的智能应用",
  description:
    "棱维是一家面向国内团队的 AI 应用与全栈交付工作室。可先试用演示方案，也可按需求定制落地。",
};

export const nav = [
  { href: "/", label: "首页" },
  { href: "/services", label: "能力" },
  { href: "/products", label: "产品" },
  { href: "/contact", label: "申请试用" },
] as const;

export const capabilities = [
  {
    heroLabel: "AI 场景落地",
    title: "AI 全场景落地",
    summary: "把模型能力做成可用的业务功能，嵌进真实流程。",
    detail:
      "从场景拆解、提示与工作流设计，到前后端接入与上线运维，帮你把 AI 嵌进真实流程。",
  },
  {
    heroLabel: "全栈一体交付",
    title: "互联网项目一体式交付",
    summary: "移动端与 Web 一体推进，从需求到可发布版本。",
    detail:
      "覆盖产品梳理、界面实现、接口与数据、发布上架。适合从 0 到 1，也适合既有系统改造。",
  },
] as const;

export const products = [
  {
    slug: "bi",
    name: "BI 智能管理系统",
    summary: "把业务数据做成可看、可问、可决策的智能看板。",
    status: "演示",
    highlights: ["多源数据汇聚", "自然语言问数", "决策视图定制"],
  },
  {
    slug: "stock",
    name: "股票智能分析系统",
    summary: "用 AI 辅助行情解读与分析视角，加快研究节奏。",
    status: "演示",
    highlights: ["行情解读辅助", "多维指标视图", "分析笔记沉淀"],
  },
  {
    slug: "promo",
    name: "智能产品推广系统",
    summary: "帮产品做更精准的内容与投放辅助。",
    status: "演示",
    highlights: ["内容生成辅助", "人群与渠道建议", "效果复盘草稿"],
  },
] as const;
