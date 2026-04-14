import { contentSchema, sources } from "./lib/kb-data.js";
import { getKnowledgeBaseDocument } from "./lib/kb-client.js";

const sourceList = document.getElementById("source-list");
const schemaView = document.getElementById("schema-view");
const entryList = document.getElementById("entry-list");

function renderSources() {
  sourceList.innerHTML = sources
    .map(
      (source) => `
        <article class="source-card">
          <div class="source-row">
            <h3>${source.name}</h3>
            <span class="source-badge">${source.status}</span>
          </div>
          <p>${source.description}</p>
          <p><strong>接入方式：</strong>${source.mode}</p>
          <p><strong>说明：</strong>${source.note}</p>
        </article>
      `
    )
    .join("");
}

function renderSchema() {
  schemaView.textContent = JSON.stringify(contentSchema, null, 2);
}

async function renderEntries() {
  const { entries } = await getKnowledgeBaseDocument();

  entryList.innerHTML = entries
    .map(
      (entry) => `
        <article class="entry-card">
          <div class="entry-row">
            <h3>${entry.title}</h3>
            <span class="source-badge">${entry.source.type}</span>
          </div>
          <p>${entry.summary}</p>
          <p class="entry-meta">模块：${entry.module} | 标签：${(entry.tags || []).join(" / ")}</p>
          <p class="entry-meta">来源标题：${entry.source.title}</p>
          <p class="entry-meta">原始链接：<a href="${entry.source.url}" target="_blank" rel="noreferrer">${entry.source.url}</a></p>
        </article>
      `
    )
    .join("");
}

renderSources();
renderSchema();
renderEntries();
