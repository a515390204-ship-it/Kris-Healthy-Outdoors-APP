import {
  parseImportedDocument,
  readLocalDocument,
  saveDocumentToFile,
  upsertEntry,
  writeLocalDocument
} from "./kb-storage.js";
import { createKnowledgeBaseDocument } from "./kb-data.js";

const API_BASE = "http://127.0.0.1:3047/api";

let apiAvailability;

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function isApiAvailable() {
  if (typeof apiAvailability === "boolean") return apiAvailability;

  try {
    await request("/health");
    apiAvailability = true;
  } catch {
    apiAvailability = false;
  }

  return apiAvailability;
}

export async function getKnowledgeBaseDocument() {
  if (await isApiAvailable()) {
    return request("/kb");
  }

  return readLocalDocument();
}

export async function upsertKnowledgeEntry(entry) {
  if (await isApiAvailable()) {
    return request("/entries", {
      method: "POST",
      body: JSON.stringify(entry)
    });
  }

  return upsertEntry(entry);
}

export async function updateKnowledgeWorkflow(entryId, workflow) {
  if (await isApiAvailable()) {
    return request(`/entries/${encodeURIComponent(entryId)}/workflow`, {
      method: "PATCH",
      body: JSON.stringify(workflow)
    });
  }

  const doc = readLocalDocument();
  const nextEntries = doc.entries.map((entry) =>
    entry.id === entryId
      ? {
          ...entry,
          workflow: {
            ...entry.workflow,
            ...workflow,
            updatedAt: new Date().toISOString()
          }
        }
      : entry
  );

  return writeLocalDocument(createKnowledgeBaseDocument(nextEntries));
}

export async function importKnowledgeBaseDocument(text) {
  const doc = parseImportedDocument(text);

  if (await isApiAvailable()) {
    return request("/kb", {
      method: "PUT",
      body: JSON.stringify(doc)
    });
  }

  return writeLocalDocument(doc);
}

export async function exportKnowledgeBaseDocument(handle) {
  const doc = await getKnowledgeBaseDocument();
  return saveDocumentToFile(doc, handle);
}

export function getBackendStatusLabel(available) {
  return available ? "已连接本地后端" : "当前使用浏览器本地存储";
}
