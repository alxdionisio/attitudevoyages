/**
 * Google Tag Manager – chargement du container via variable d'environnement.
 * Définir VITE_GTM_ID dans .env (ex: GTM-XXXXXX) pour activer GTM.
 */

const GTM_ID = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GTM_ID;

export function loadGTM() {
  if (typeof window === "undefined" || !GTM_ID || GTM_ID === "GTM-XXXXXX") return;
  if (window.__GTM_LOADED__) return;
  window.__GTM_LOADED__ = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  const noscript = document.createElement("noscript");
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
}

export { GTM_ID };
