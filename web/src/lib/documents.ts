export type DocumentId = "slides";

export type DocumentEntry = {
  id: DocumentId;
  label: string;
  shortTitle: string;
  fileName: string;
  /** Path relative to Vite base (served from public/) */
  path: string;
};

export const DOCUMENTS: readonly DocumentEntry[] = [
  {
    id: "slides",
    label: "Apresentação",
    shortTitle: "Slides",
    fileName: "slides.pdf",
    path: "documents/slides.pdf",
  },
] as const;

export function getDocument(id: DocumentId): DocumentEntry {
  const found = DOCUMENTS.find((d) => d.id === id);
  if (!found) {
    throw new Error(`Unknown document id: ${id}`);
  }
  return found;
}

/** Resolve a public asset path against Vite `base`. */
export function publicUrl(relativePath: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = relativePath.replace(/^\//, "");
  return `${base}${normalized}`;
}
