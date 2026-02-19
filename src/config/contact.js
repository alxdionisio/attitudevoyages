// Formulaire de contact : envoi des messages via Formspree vers la boîte mail configurée
// Définir VITE_FORMSPREE_FORM_ID dans .env (ID du formulaire Formspree)
export const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;
export const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${FORMSPREE_FORM_ID}`
  : null;
