import {
  exportKnowledgeBaseDocument,
  getBackendStatusLabel,
  getKnowledgeBaseDocument,
  importKnowledgeBaseDocument,
  isApiAvailable,
  updateKnowledgeWorkflow
} from "./lib/kb-client.js";
import { getModuleLabel, getWorkflowLabel } from "./lib/kb-data.js";

const searchInput = document.getElementById("search-input");
const moduleFilter = document.getElementById("module-filter");
const sourceFilter = document.getElementById("source-filter");
const confidenceFilter = document.getElementById("confidence-filter");
const workflowFilter = document.getElementById("workflow-filter");
const resultCount = document.getElementById("result-count");
const entryList = document.getElementById("entry-list");
const exportButton = document.getElementById("export-json");
const importInput = document.getElementById("import-json");
const fileStatus = document.getElementById("file-status");
const backendStatus = document.getElementById("backend-status");

let currentDocument = { entries: [] };
let fileHandle = null;

function getFilters() {
  return {
    query: searchInput.value.trim().toLowerCase(),
    module: moduleFilter.value,
    source: sourceFilter.value,
    confidence: confidenceFilter.value,
    workflow: workflowFilter.value
  };
}

function getFilteredEntries() {
  const filters = getFilters();

  return currentDocument.entries.filter((entry) => {
    const haystack = [
      entry.title,
      entry.summary,
      entry.city,
      entry.source?.title,
      entry.source?.author,
      entry.notes?.experience,
      ...(entry.tags || [])
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    if (filters.query && !haystack.includes(filters.query)) return false;
    if (filters.module && entry.module !== filters.module) return false;
    if (filters.source && entry.source?.type !== filters.source) return false;
    if (filters.confidence && entry.quality?.confidence !== filters.confidence) return false;
    if (filters.workflow && entry.workflow?.status !== filters.workflow) return false;
    return true;
  });
}

function renderEntries() {
  const entries = getFilteredEntries();
  resultCount.textContent = `${entries.length} 条`;

  if (!entries.length) {
    entryList.innerHTML = `<div class="empty-state">没有匹配到内容，试试放宽筛选条件。</div>`;
    return;
  }

  entryList.innerHTML = entries
    .map(
      (entry) => `
        <article class="entry-card">
          <div class="entry-top">
            <div>
              <h3>${entry.title}</h3>
              <p>${entry.summary || "暂无摘要"}</p>
            </div>
            <span class="type-chip">${entry.source?.type || "unknown"}</span>
          </div>
          <div class="meta-row">
            <span>模块：${getModuleLabel(entry.module)}</span>
            <span>城市：${entry.city || "未填写"}</span>
            <span>可信度：${entry.quality?.confidence || "未填写"}</span>
            <span>审核：${getWorkflowLabel(entry.workflow?.status || "draft")}</span>
          </div>
          <div class="meta-row">
            <span>来源标题：${entry.source?.title || "未填写"}</span>
            <span>作者：${entry.source?.author || "未填写"}</span>
          </div>
          <p class="entry-tags">标签：${(entry.tags || []).join(" / ") || "未填写"}</p>
          <p class="entry-tags">审核备注：${entry.workflow?.reviewNote || "暂无"}</p>
          <div class="workflow-actions">
            <button class="primary-button small" data-id="${entry.id}" data-status="approved">审核通过</button>
            <button class="ghost-button small" data-id="${entry.id}" data-status="needs_revision">待补充</button>
            <button class="ghost-button small" data-id="${entry.id}" data-status="rejected">驳回</button>
          </div>
        </article>
      `
    )
    .join("");
}

async function refreshDocument() {
  currentDocument = await getKnowledgeBaseDocument();
  renderEntries();
}

async function exportJson() {
  const result = await exportKnowledgeBaseDocument(fileHandle);
  if (result.handle) fileHandle = result.handle;
  fileStatus.textContent =
    result.method === "file-system-access"
      ? "已保存到本地 JSON 文件。"
      : "已下载 knowledge-base.json。";
}

async function importJsonFile(file) {
  const text = await file.text();
  await importKnowledgeBaseDocument(text);
  await refreshDocument();
  fileStatus.textContent = "已导入 JSON 文件并刷新列表。";
}

async function handleWorkflowClick(event) {
  const button = event.target.closest("[data-id][data-status]");
  if (!button) return;

  const reviewNoteMap = {
    approved: "内容结构已确认，可进入正式知识库。",
    needs_revision: "需要补充路线事实、标签或图片信息。",
    rejected: "当前内容不适合进入知识库。"
  };

  await updateKnowledgeWorkflow(button.dataset.id, {
    status: button.dataset.status,
    reviewer: "后台运营",
    reviewNote: reviewNoteMap[button.dataset.status]
  });

  await refreshDocument();
}

[searchInput, moduleFilter, sourceFilter, confidenceFilter, workflowFilter].forEach((node) => {
  node.addEventListener("input", renderEntries);
  node.addEventListener("change", renderEntries);
});

exportButton.addEventListener("click", exportJson);

importInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  await importJsonFile(file);
  event.target.value = "";
});

entryList.addEventListener("click", handleWorkflowClick);

async function initialize() {
  const available = await isApiAvailable();
  backendStatus.textContent = getBackendStatusLabel(available);
  await refreshDocument();
}

initialize();
