import {
  exportKnowledgeBaseDocument,
  getBackendStatusLabel,
  getKnowledgeBaseDocument,
  isApiAvailable,
  upsertKnowledgeEntry
} from "./lib/kb-client.js";

const form = document.getElementById("entry-form");
const preview = document.getElementById("json-preview");
const queueList = document.getElementById("queue-list");
const queueCount = document.getElementById("queue-count");
const fillDemoButton = document.getElementById("fill-demo");
const saveDraftButton = document.getElementById("save-draft");
const saveFileButton = document.getElementById("save-file");
const resetButton = document.getElementById("reset-form");
const saveStatus = document.getElementById("save-status");
const backendStatus = document.getElementById("backend-status");
const coverUpload = document.getElementById("cover-upload");
const galleryUpload = document.getElementById("gallery-upload");
const galleryUrlsInput = document.getElementById("gallery-urls");
const galleryPreview = document.getElementById("gallery-preview");

let fileHandle = null;
let uploadedCoverImage = null;
let uploadedGalleryImages = [];

const demoData = {
  sourceUrl: "https://www.xiaohongshu.com/explore/demo-jiuxi-route",
  sourceTitle: "杭州九溪徒步真的很适合春天，溪流和茶园太治愈了",
  sourceAuthor: "周末出走计划",
  module: "outdoor",
  city: "杭州",
  season: "spring",
  confidence: "medium",
  title: "九溪到龙井的春日放松徒步线",
  summary: "适合周末半天到一天的轻中度徒步，沿途有溪流、茶园和山脊风景，适合从高压工作里抽离出来。",
  tags: "杭州,九溪,春季,徒步,茶园,周末放松",
  experience: "上午 9 点前出发人会少很多，五云山到十里琅珰那一段最好看，但雨后石阶会比较滑。",
  ascent: "九溪公交站",
  descent: "龙井村",
  duration: "半天到一天",
  difficulty: "轻中度",
  passBy: "五云山,真际寺,十里琅珰,棋盘山,龙井村",
  coverImage: "assets/outdoor/jiuxi.jpg",
  galleryUrls: "assets/outdoor/jiuxi.jpg\nassets/outdoor/baoshi.jpg"
};

function normalizeList(value) {
  return value
    .split(/[\n,\uFF0C\u3001]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function readFilesAsDataUrls(files) {
  return Promise.all(Array.from(files).map((file) => readFileAsDataUrl(file)));
}

function renderGalleryPreview() {
  const urlImages = normalizeList(galleryUrlsInput.value);
  const images = [...(uploadedCoverImage ? [uploadedCoverImage] : []), ...uploadedGalleryImages, ...urlImages];

  if (!images.length) {
    galleryPreview.innerHTML = `<div class="queue-empty">这里会预览封面图和多图字段。</div>`;
    return;
  }

  galleryPreview.innerHTML = images
    .map((image) => `<img src="${image}" alt="上传预览">`)
    .join("");
}

function buildRecord() {
  const data = new FormData(form);
  const sourceTitle = data.get("sourceTitle")?.toString().trim() || "";
  const sourceUrl = data.get("sourceUrl")?.toString().trim() || "";
  const coverImageInput = data.get("coverImage")?.toString().trim() || "";
  const galleryUrls = normalizeList(galleryUrlsInput.value);

  return {
    id: `xhs-${Date.now()}`,
    module: data.get("module"),
    title: data.get("title")?.toString().trim() || sourceTitle || "未命名条目",
    summary: data.get("summary")?.toString().trim() || "",
    tags: normalizeList(data.get("tags")?.toString() || ""),
    season: data.get("season"),
    city: data.get("city")?.toString().trim() || "",
    source: {
      type: "xiaohongshu",
      title: sourceTitle,
      url: sourceUrl,
      author: data.get("sourceAuthor")?.toString().trim() || null,
      publishedAt: null
    },
    route: {
      ascent: data.get("ascent")?.toString().trim() || null,
      passBy: normalizeList(data.get("passBy")?.toString() || ""),
      descent: data.get("descent")?.toString().trim() || null,
      duration: data.get("duration")?.toString().trim() || null,
      difficulty: data.get("difficulty")?.toString().trim() || null
    },
    media: {
      coverImage: uploadedCoverImage || coverImageInput || null,
      gallery: [...galleryUrls, ...uploadedGalleryImages]
    },
    notes: {
      experience: data.get("experience")?.toString().trim() || ""
    },
    quality: {
      verified: false,
      confidence: data.get("confidence")
    },
    workflow: {
      status: "draft",
      reviewer: null,
      reviewNote: null,
      importedFrom: "manual-xiaohongshu",
      updatedAt: new Date().toISOString()
    }
  };
}

function renderPreview() {
  preview.textContent = JSON.stringify(buildRecord(), null, 2);
}

async function renderQueue() {
  const { entries } = await getKnowledgeBaseDocument();
  const queue = entries.filter((item) => item.workflow?.status === "draft");
  queueCount.textContent = `${queue.length} 条`;

  if (!queue.length) {
    queueList.innerHTML = `<div class="queue-empty">导入队列还是空的。你可以先填一条示例内容，确认字段设计是否顺手。</div>`;
    return;
  }

  queueList.innerHTML = queue
    .map(
      (item) => `
        <article class="entry-card">
          <div class="entry-row">
            <h3>${item.title}</h3>
            <span class="status-chip">待审核</span>
          </div>
          <p>${item.summary || "这条内容还没有填写摘要。"}</p>
          <p class="entry-meta">来源：${item.source.title || "未填写"} | 作者：${item.source.author || "未填写"}</p>
          <p class="entry-meta">模块：${item.module} | 标签：${item.tags.join(" / ") || "未填写"}</p>
          <p class="entry-meta">上山：${item.route.ascent || "未填写"} | 下山：${item.route.descent || "未填写"}</p>
        </article>
      `
    )
    .join("");
}

function fillDemo() {
  Object.entries(demoData).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (field) field.value = value;
  });
  uploadedCoverImage = null;
  uploadedGalleryImages = [];
  renderGalleryPreview();
  renderPreview();
}

async function hydrateUploads() {
  if (coverUpload.files?.length) {
    const [cover] = await readFilesAsDataUrls(coverUpload.files);
    uploadedCoverImage = cover;
  }

  if (galleryUpload.files?.length) {
    uploadedGalleryImages = await readFilesAsDataUrls(galleryUpload.files);
  }

  renderGalleryPreview();
  renderPreview();
}

async function initialize() {
  const available = await isApiAvailable();
  backendStatus.textContent = getBackendStatusLabel(available);
  await renderQueue();
}

form.addEventListener("input", renderPreview);
galleryUrlsInput.addEventListener("input", () => {
  renderGalleryPreview();
  renderPreview();
});

coverUpload.addEventListener("change", hydrateUploads);
galleryUpload.addEventListener("change", hydrateUploads);

saveDraftButton.addEventListener("click", async () => {
  const record = buildRecord();
  await upsertKnowledgeEntry(record);
  await renderQueue();
  saveStatus.textContent = "已写入知识库";
});

fillDemoButton.addEventListener("click", fillDemo);

saveFileButton.addEventListener("click", async () => {
  const result = await exportKnowledgeBaseDocument(fileHandle);
  if (result.handle) fileHandle = result.handle;
  saveStatus.textContent =
    result.method === "file-system-access"
      ? "已保存到本地 JSON 文件"
      : "已下载 knowledge-base.json";
});

resetButton.addEventListener("click", () => {
  uploadedCoverImage = null;
  uploadedGalleryImages = [];
  window.setTimeout(() => {
    renderGalleryPreview();
    renderPreview();
  }, 0);
});

renderGalleryPreview();
renderPreview();
initialize();
