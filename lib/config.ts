/**
 * Public Power BI embed URL (Publish to web or an embed link).
 * Leave this as an empty string to hide the live iframe and show dashboard.png.
 * Changing it requires a rebuild — this site is a static export.
 */
export const POWERBI_EMBED_URL = "";

export function getEmbedUrl(): string | null {
  const value = POWERBI_EMBED_URL.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}
