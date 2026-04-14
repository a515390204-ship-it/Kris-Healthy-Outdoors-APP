export const moduleOptions = [
  { value: "outdoor", label: "户外运动" },
  { value: "nutrition", label: "健康饮食" },
  { value: "supplements", label: "保健品知识" },
  { value: "pets", label: "宠物饲养" },
  { value: "knowledge-anxiety", label: "知识焦虑" },
  { value: "social-anxiety", label: "社交焦虑" }
];

export const workflowStatusOptions = [
  { value: "draft", label: "待审核" },
  { value: "approved", label: "审核通过" },
  { value: "needs_revision", label: "待补充" },
  { value: "rejected", label: "已驳回" }
];

export const sources = [
  {
    id: "xiaohongshu",
    name: "小红书",
    status: "已接入类型",
    mode: "人工导入 / 半自动导入",
    description: "适合作为真实体验、路线评价、用户语气和踩坑提醒的补充来源。",
    note: "当前建议通过人工筛选链接、摘要、标签和图片引用进入知识库，不直接依赖不稳定的内容抓取链路。"
  },
  {
    id: "official",
    name: "官方文旅 / 景区 / 政务信息",
    status: "建议主来源",
    mode: "结构化采集",
    description: "用于提供路线事实、开放信息、交通说明和安全事项等更稳定内容。",
    note: "适合作为攻略事实底稿和校验来源。"
  },
  {
    id: "editorial",
    name: "站内编辑整理",
    status: "站内沉淀",
    mode: "人工编辑",
    description: "把多来源信息压缩成站内攻略、问答、清单和专题页。",
    note: "适合作为最终对外展示内容。"
  }
];

export const contentSchema = {
  id: "string",
  module: "outdoor | nutrition | supplements | pets | knowledge-anxiety | social-anxiety",
  title: "string",
  summary: "string",
  tags: ["string"],
  season: "spring | summer | autumn | winter",
  city: "string",
  source: {
    type: "xiaohongshu | official | editorial | other",
    title: "string",
    url: "string",
    author: "string | null",
    publishedAt: "ISO date | null"
  },
  route: {
    ascent: "string | null",
    passBy: ["string"],
    descent: "string | null",
    duration: "string | null",
    difficulty: "string | null"
  },
  media: {
    coverImage: "string | null",
    gallery: ["string"]
  },
  notes: {
    experience: "string"
  },
  quality: {
    verified: "boolean",
    confidence: "low | medium | high"
  },
  workflow: {
    status: "draft | approved | needs_revision | rejected",
    reviewer: "string | null",
    reviewNote: "string | null",
    importedFrom: "manual-xiaohongshu | api | import",
    updatedAt: "ISO date"
  }
};

export const demoEntries = [
  {
    id: "outdoor-jiuxi-001",
    module: "outdoor",
    title: "九溪到龙井的一日放松线",
    summary: "适合春天半天到一天出发，兼具溪流、茶园和山脊线体验。",
    tags: ["杭州", "徒步", "九溪", "龙井", "春季"],
    season: "spring",
    city: "杭州",
    source: {
      type: "official",
      title: "九溪-五云山-十里琅珰公开路线整理",
      url: "https://mdaily.hangzhou.com.cn/dskb/2024/04/11/article_detail_2_20240411A036.html",
      author: null,
      publishedAt: "2024-04-11"
    },
    route: {
      ascent: "九溪公交站",
      passBy: ["五云山", "真际寺", "十里琅珰", "龙井村"],
      descent: "龙井村",
      duration: "半天到一天",
      difficulty: "轻中度"
    },
    media: {
      coverImage: "assets/outdoor/jiuxi.jpg",
      gallery: []
    },
    notes: {
      experience: "官方路线事实清晰，适合作为站内长线徒步攻略底稿。"
    },
    quality: {
      verified: true,
      confidence: "high"
    },
    workflow: {
      status: "approved",
      reviewer: "编辑部",
      reviewNote: "可作为官方参考路线保留。",
      importedFrom: "import",
      updatedAt: "2026-04-12T00:00:00.000Z"
    }
  },
  {
    id: "outdoor-xhs-001",
    module: "outdoor",
    title: "用户视角：春天去径山更适合慢走和发呆",
    summary: "用于补充真实体验、拍照点、出发节奏和踩坑提醒，不直接作为唯一事实来源。",
    tags: ["杭州", "径山", "春季", "经验帖"],
    season: "spring",
    city: "杭州",
    source: {
      type: "xiaohongshu",
      title: "示例：小红书经验帖条目",
      url: "https://www.xiaohongshu.com/",
      author: null,
      publishedAt: null
    },
    route: {
      ascent: null,
      passBy: [],
      descent: null,
      duration: null,
      difficulty: null
    },
    media: {
      coverImage: null,
      gallery: []
    },
    notes: {
      experience: "适合作为体验补充，但还需要路线事实校验。"
    },
    quality: {
      verified: false,
      confidence: "medium"
    },
    workflow: {
      status: "needs_revision",
      reviewer: "编辑部",
      reviewNote: "需要补充更明确的上山口、下山方式和时间建议。",
      importedFrom: "manual-xiaohongshu",
      updatedAt: "2026-04-12T00:00:00.000Z"
    }
  }
];

export const storageKey = "relaxlab-kb-entries";

export function createKnowledgeBaseDocument(entries = demoEntries) {
  return {
    updatedAt: new Date().toISOString(),
    entries
  };
}

export function normalizeKnowledgeBaseDocument(data) {
  if (!data || typeof data !== "object") {
    return createKnowledgeBaseDocument();
  }

  const entries = Array.isArray(data.entries) ? data.entries : [];
  return {
    updatedAt: data.updatedAt || new Date().toISOString(),
    entries
  };
}

export function getModuleLabel(value) {
  return moduleOptions.find((item) => item.value === value)?.label || value;
}

export function getWorkflowLabel(value) {
  return workflowStatusOptions.find((item) => item.value === value)?.label || value;
}
