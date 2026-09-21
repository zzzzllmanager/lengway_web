export const brand = {
  name: "棱维",
  english: "Lengway",
  tagline: "将 AI 能力转化为可上线的业务系统",
  description:
    "棱维专注 AI 应用落地与全栈工程交付。既可基于现有演示快速试用，亦可按业务场景定制实施。",
};

export const nav = [
  { href: "/", label: "首页" },
  { href: "/#ai", label: "AI" },
  { href: "/#fullstack", label: "全栈" },
  { href: "/#engage", label: "合作" },
  { href: "/contact", label: "开始沟通" },
] as const;

export type Showcase = {
  slug: string;
  name: string;
  summary: string;
  status: string;
  highlights: readonly string[];
  experienceHref?: string;
};

export type StudioModule = {
  id: "ai" | "fullstack";
  kicker: string;
  heroLabel: string;
  title: string;
  summary: string;
  detail: string;
  stageLabel: string;
  ctaLabel?: string;
  ctaHref?: string;
  showcases: readonly Showcase[];
};

export const modules: readonly StudioModule[] = [
  {
    id: "ai",
    kicker: "AI",
    heroLabel: "AI 场景落地",
    title: "AI 全场景落地",
    summary: "把模型能力做成可用的业务功能，嵌进真实流程。",
    detail:
      "从场景拆解、提示与工作流设计，到前后端接入与上线运维，帮你把 AI 嵌进真实流程。",
    stageLabel: "演示产品",
    showcases: [
      {
        slug: "bi",
        name: "BI 智能管理系统",
        summary: "把业务数据做成可看、可问、可决策的智能看板。",
        status: "演示",
        highlights: ["多源数据汇聚", "自然语言问数", "决策视图定制"],
        experienceHref: "/experience/bi",
      },
      {
        slug: "stock",
        name: "股票智能分析系统",
        summary: "用 AI 辅助行情解读与分析视角，加快研究节奏。",
        status: "演示",
        highlights: ["行情解读辅助", "多维指标视图", "分析笔记沉淀"],
        experienceHref: "/experience/stock",
      },
      {
        slug: "promo",
        name: "智能产品推广系统",
        summary: "帮产品做更精准的内容与投放辅助。",
        status: "演示",
        highlights: ["内容生成辅助", "人群与渠道建议", "效果复盘草稿"],
        experienceHref: "/experience/promo",
      },
    ],
  },
  {
    id: "fullstack",
    kicker: "Full-stack",
    heroLabel: "全栈交付与维护",
    title: "互联网全栈工程交付",
    summary:
      "新项目建设、已有系统二次开发与上线后运维保障，均可承接。",
    detail:
      "覆盖 App、Web、小程序与后台，从立项到上架。已有项目可按范围进行功能建设与系统对接；上线后可提供缺陷修复与运行保障。",
    stageLabel: "服务范围",
    ctaLabel: "沟通需求",
    ctaHref: "/contact?product=fullstack",
    showcases: [
      {
        slug: "mobile",
        name: "移动端应用",
        summary:
          "覆盖 iOS、Android、鸿蒙原生，以及 Flutter、React Native 跨端，从立项到上架全流程落地。",
        status: "新建",
        highlights: ["iOS / Android / 鸿蒙", "Flutter / RN", "上架发布"],
      },
      {
        slug: "web",
        name: "Web、小程序与后台",
        summary:
          "覆盖官网、H5、各端小程序及管理后台，从界面、接口到发布提供全案落地。",
        status: "新建",
        highlights: ["官网 / H5 / 小程序", "管理后台", "接口与发布"],
      },
      {
        slug: "secondary",
        name: "已有项目二次开发",
        summary:
          "在现有系统上承接有明确范围的功能建设，包括新模块、能力扩展与第三方对接。",
        status: "二开",
        highlights: ["新功能 / 新模块", "系统对接", "按范围交付"],
      },
      {
        slug: "maintain",
        name: "系统运维与保障",
        summary:
          "面向已上线系统，提供缺陷修复、兼容处理与日常运行保障。",
        status: "维护",
        highlights: ["缺陷修复", "兼容处理", "运行保障"],
      },
    ],
  },
];

export const capabilities = modules;

export const products = modules.flatMap((item) => item.showcases);

export const engagement = {
  id: "engage",
  kicker: "Engagement",
  title: "服务宗旨与收费",
  summary: "先对齐目标与范围，再进入实施。费用按合作形态评估，沟通后给出书面方案。",
  principles: [
    {
      title: "以可上线为标准",
      body: "从场景拆解到发布运维，交付物要能进入真实业务使用。",
    },
    {
      title: "先对齐再实施",
      body: "开工前确认目标、边界与验收标准，范围清楚后再进入开发。",
    },
    {
      title: "评估后立项",
      body: "先判断场景是否适合承接，再进入报价与实施。",
    },
  ],
  fees: [
    {
      name: "演示产品落地",
      model: "先体验，再按场景评估",
      body: "现有演示可先行体验。若需接入真实数据与业务流程，按场景评估实施范围与费用。",
    },
    {
      name: "新项目全案",
      model: "按范围报价，分阶段结算",
      body: "覆盖立项到上架的全流程交付，按确认后的范围报价，并按阶段结算。",
    },
    {
      name: "二次开发",
      model: "按功能范围评估",
      body: "在现有系统上按明确功能范围评估工期与费用，验收后交付。",
    },
    {
      name: "运维保障",
      model: "按周期或按次约定",
      body: "面向已上线系统，可按周期约定保障，或按次处理缺陷与兼容问题。",
    },
  ],
  note: "具体金额取决于范围、周期与现有系统状况，沟通后提供书面评估。",
};

export const contactOptions = [
  { slug: "bi", name: "BI 智能管理系统" },
  { slug: "stock", name: "股票智能分析系统" },
  { slug: "promo", name: "智能产品推广系统" },
  { slug: "fullstack", name: "全栈新项目交付" },
  { slug: "secondary", name: "已有项目二次开发" },
  { slug: "maintain", name: "系统运维与保障" },
];
