/**
 * Ensures the image URL is an absolute URL with "https://".
 * @param url - The image URL (e.g., "//images.ctfassets.net/...").
 * @returns The absolute URL (e.g., "https://images.ctfassets.net/...").
 */
export function getAbsoluteImageUrl(url: string): string {
    if (url.startsWith("//")) {
        return `https:${url}`;
    }
    return url;
}
