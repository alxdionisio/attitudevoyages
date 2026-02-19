/**
 * Configuration site pour SEO (canonical, nom, etc.)
 */

const SITE_NAME = "Attitude Voyages";
const TITLE_SUFFIX = ` | ${SITE_NAME}`;

function getBaseUrl() {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

export { SITE_NAME, TITLE_SUFFIX, getBaseUrl };
