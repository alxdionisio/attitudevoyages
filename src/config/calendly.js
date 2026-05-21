// URL Calendly : définir VITE_CALENDLY_URL dans .env (ou secrets CI).
// Si la variable est absente, CALENDLY_URL = null et le widget affichera un fallback "indisponible".
const raw = import.meta.env.VITE_CALENDLY_URL;
const valid =
  typeof raw === "string" &&
  raw.startsWith("https://calendly.com/") &&
  raw.length > 25;
export const CALENDLY_URL = valid ? raw : null;
