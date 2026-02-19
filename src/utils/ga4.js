/**
 * Google Analytics 4 – chargement via gtag.js.
 * ID de mesure : VITE_GA4_MEASUREMENT_ID dans .env (ex. G-PVBE1XMV9V).
 */

const MEASUREMENT_ID =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GA4_MEASUREMENT_ID) ||
  "G-PVBE1XMV9V";

let loaded = false;

function ensureGtag() {
  if (typeof window === "undefined") return false;
  if (window.gtag) return true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  return true;
}

/**
 * Charge le script gtag et configure GA4 (consent par défaut : refusé jusqu'au choix utilisateur).
 */
export function loadGA4() {
  if (typeof window === "undefined" || loaded) return;
  ensureGtag();
  loaded = true;

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

/**
 * Envoie une page_view à GA4 (à appeler à chaque changement de route SPA).
 */
export function sendPageView(pathname, pageTitle = null) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: pathname,
    page_title: pageTitle || document.title,
    page_location: window.location.origin + pathname,
  });
}

/**
 * Met à jour le consentement (à appeler après choix dans la bannière cookies).
 * Si accepté, envoie une page_view pour la page actuelle.
 */
export function updateConsent(accepted) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: accepted ? "granted" : "denied",
    ad_storage: accepted ? "granted" : "denied",
    ad_user_data: accepted ? "granted" : "denied",
    ad_personalization: accepted ? "granted" : "denied",
  });
  if (accepted) {
    sendPageView(window.location.pathname, document.title);
  }
}

export { MEASUREMENT_ID };
