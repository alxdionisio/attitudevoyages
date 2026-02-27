/**
 * Configuration site pour SEO (canonical, nom, etc.)
 */

const SITE_NAME = "Attitude Voyages";
const TITLE_SUFFIX = ` | ${SITE_NAME}`;

/** Image par défaut pour Open Graph / Twitter (1200×630 px recommandé). À placer dans public/og-image.jpg */
const DEFAULT_OG_IMAGE_PATH = "/og-image.jpg";

/** Basename du routeur (ex: /attitudevoyages sur GitHub Pages). Défini à la build via VITE_BASENAME. */
export const BASENAME = (typeof import.meta !== "undefined" && import.meta.env?.VITE_BASENAME) || "";

/** Retourne le pathname sans le basename (pour comparaisons et tracking). */
export function getPathWithoutBasename(pathname) {
  if (!BASENAME) return pathname;
  if (pathname === BASENAME || pathname === BASENAME + "/") return "/";
  if (pathname.startsWith(BASENAME + "/")) return pathname.slice(BASENAME.length);
  return pathname;
}

/** URL canonique du site (https, sans www). À définir en build via VITE_SITE_URL pour que canonical/OG soient toujours identiques. */
function getBaseUrl() {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SITE_URL) {
    const url = import.meta.env.VITE_SITE_URL.replace(/\/$/, "");
    return url;
  }
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path === "/" || path === "") return window.location.origin;
    if (BASENAME && (path === BASENAME || path.startsWith(BASENAME + "/"))) return window.location.origin + BASENAME;
    return window.location.origin;
  }
  return "";
}

export { SITE_NAME, TITLE_SUFFIX, getBaseUrl, DEFAULT_OG_IMAGE_PATH };
