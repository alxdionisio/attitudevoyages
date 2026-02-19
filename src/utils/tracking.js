/**
 * Plan de tracking pour Google Tag Manager (GTM).
 * Le dataLayer est alimenté de façon cohérente ; GTM est chargé si VITE_GTM_ID est défini dans .env.
 * Événements poussés : page_view, consent_accepted, consent_refused.
 */

import { getVilleBySlug } from "../data/villes";

const DATALAYER_EVENT_PAGE_VIEW = "page_view";
const DATALAYER_EVENT_CONSENT_ACCEPTED = "consent_accepted";
const DATALAYER_EVENT_CONSENT_REFUSED = "consent_refused";

export const CONSENT_STORAGE_KEY = "attitude-voyages-consent";
export const CONSENT_VERSION = 1;

/** Initialise le dataLayer s'il n'existe pas (appelé au chargement). */
export function initDataLayer() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
}

/** Retourne le titre de page dérivé du pathname (pour cohérence tracking). */
export function getPageTitleFromPath(pathname) {
  const map = {
    "/": "Accueil",
    "/destinations": "Destinations",
    "/a-propos": "À propos",
    "/contact": "Contact",
    "/cgv": "CGV",
    "/mentions-legales": "Mentions légales",
    "/politique-confidentialite": "Politique de confidentialité",
    "/faq": "FAQ",
  };
  if (map[pathname]) return map[pathname];
  if (pathname.startsWith("/offre/")) return "Détail offre";
  if (pathname.startsWith("/agence-voyages/")) {
    const slug = pathname.replace(/^\/agence-voyages\//, "").split("?")[0];
    const ville = getVilleBySlug(slug);
    return ville ? `Agence de voyages à ${ville.nom}` : "Agence de voyages";
  }
  return "Page";
}

/**
 * Envoie un événement "page_view" dans le dataLayer (pour GTM).
 * À appeler à chaque changement de route.
 */
export function pushPageView(pathname, pageTitle = null) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  const title = pageTitle || getPageTitleFromPath(pathname);
  window.dataLayer.push({
    event: DATALAYER_EVENT_PAGE_VIEW,
    page_path: pathname,
    page_title: title,
    page_location: window.location.origin + pathname,
  });
}

/**
 * Envoie l'événement de consentement accepté (pour GTM).
 */
export function pushConsentAccepted() {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({
    event: DATALAYER_EVENT_CONSENT_ACCEPTED,
    consent_tracking: true,
  });
}

/**
 * Envoie l'événement de consentement refusé (pour GTM).
 */
export function pushConsentRefused() {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({
    event: DATALAYER_EVENT_CONSENT_REFUSED,
    consent_tracking: false,
  });
}

/**
 * Lit le consentement stocké (localStorage).
 * @returns { 'accepted' | 'refused' | null } null = pas encore de choix
 */
export function getConsent() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && data.version === CONSENT_VERSION) return data.value;
    return null;
  } catch {
    return null;
  }
}

/**
 * Enregistre le choix de consentement (localStorage).
 * @param { boolean } accepted
 */
export function setConsent(accepted) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ value: accepted ? "accepted" : "refused", version: CONSENT_VERSION })
    );
  } catch {
    // ignore
  }
}
