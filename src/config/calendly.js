// URL Calendly : définir VITE_CALENDLY_URL dans .env ou utiliser le démo
// En prod (Netlify, etc.), définir la variable dans les paramètres du projet puis redéployer.
const raw = import.meta.env.VITE_CALENDLY_URL;
const valid =
  typeof raw === "string" &&
  raw.startsWith("https://calendly.com/") &&
  raw.length > 25;
export const CALENDLY_URL = valid ? raw : "https://calendly.com/demo";
