import {
  createKnowledgeBaseDocument,
  demoEntries,
  normalizeKnowledgeBaseDocument,
  storageKey
} from "./kb-data.js";

export function readLocalDocument() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      const seeded = createKnowledgeBaseDocument(demoEntries);
      writeLocalDocument(seeded);
      return seeded;
    }

    return normalizeKnowledgeBaseDocument(JSON.parse(raw));
  } catch {
    const seeded = createKnowledgeBaseDocument(demoEntries);
    writeLocalDocument(seeded);
    return seeded;
  }
}

export function writeLocalDocument(doc) {
  const normalized = normalizeKnowledgeBaseDocument(doc);
  localStorage.setItem(storageKey, JSON.stringify(normalized));
  return normalized;
}

export function upsertEntry(entry) {
  const doc = readLocalDocument();
  const nextEntries = [entry, ...doc.entries.filter((item) => item.id !== entry.id)];
  return writeLocalDocument(createKnowledgeBaseDocument(nextEntries));
}

export function exportDocumentBlob(doc) {
  return new Blob([JSON.stringify(normalizeKnowledgeBaseDocument(doc), null, 2)], {
    type: "application/json"
  });
}

export async function saveDocumentToFile(doc, handle) {
  const normalized = normalizeKnowledgeBaseDocument(doc);
  const blob = exportDocumentBlob(normalized);

  if (handle) {
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return { saved: true, handle, method: "file-system-access" };
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "knowledge-base.json";
  link.click();
  URL.revokeObjectURL(url);
  return { saved: true, handle: null, method: "download" };
}

export async function pickJsonFileHandle() {
  if (!window.showSaveFilePicker) return null;

  return window.showSaveFilePicker({
    suggestedName: "knowledge-base.json",
    types: [
      {
        description: "JSON Files",
        accept: {
          "application/json": [".json"]
        }
      }
    ]
  });
}

export function parseImportedDocument(text) {
  return normalizeKnowledgeBaseDocument(JSON.parse(text));
}
