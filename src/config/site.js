/**
 * Configuration site pour SEO (canonical, nom, etc.)
 */

const SITE_NAME = "Attitude Voyages";
const TITLE_SUFFIX = ` | ${SITE_NAME}`;

/** Basename du routeur (ex: /attitudevoyages sur GitHub Pages). Défini à la build via VITE_BASENAME. */
export const BASENAME = (typeof import.meta !== "undefined" && import.meta.env?.VITE_BASENAME) || "";

/** Retourne le pathname sans le basename (pour comparaisons et tracking). */
export function getPathWithoutBasename(pathname) {
  if (!BASENAME) return pathname;
  if (pathname === BASENAME || pathname === BASENAME + "/") return "/";
  if (pathname.startsWith(BASENAME + "/")) return pathname.slice(BASENAME.length);
  return pathname;
}

function getBaseUrl() {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") return window.location.origin + (BASENAME || "");
  return "";
}

export { SITE_NAME, TITLE_SUFFIX, getBaseUrl };
