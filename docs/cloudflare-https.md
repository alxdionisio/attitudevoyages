# Hébergement 100 % sur Cloudflare

Le site **Attitude Voyages** est hébergé sur **Cloudflare Pages** (plus de déploiement sur GitHub Pages). Le domaine **attitude-voyages.fr** et **www.attitude-voyages.fr** pointent vers Cloudflare avec HTTPS.

---

## Vue d’ensemble

- **Code** : dépôt GitHub (byModule/attitudevoyages).
- **Build** : `npm run build` (Vite) → dossier `dist/`.
- **Déploiement** : Cloudflare Pages via `wrangler deploy` (config dans `wrangler.toml`).
- **DNS** : zone **attitude-voyages.fr** sur Cloudflare (nameservers Gandi → Cloudflare).
- **HTTPS** : fourni par Cloudflare (Always Use HTTPS dans SSL/TLS).

---

## 1. Projet Cloudflare Pages

1. **https://dash.cloudflare.com** → **Workers & Pages**.
2. **Create** → **Pages** → **Connect to Git**.
3. Choisis le dépôt **byModule/attitudevoyages** et autorise Cloudflare.
4. **Build settings** :
   - **Framework preset** : None (ou Vite si proposé).
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Root directory** : (vide)
   - Si le projet utilise une commande de déploiement personnalisée (ex. `npx wrangler deploy`), elle doit être configurée dans les paramètres du projet (la config est dans `wrangler.toml` à la racine).

5. **Environment variables** (Variables d’environnement) pour le build :
   - `VITE_CALENDLY_URL` = `https://calendly.com/alex-bymodule/60min` (ou ton URL Calendly).
   - `VITE_FORMSPREE_FORM_ID` = ton ID Formspree (ex. `mbdajdqe`).
   - Optionnel : `VITE_GTM_ID`, `VITE_GA4_MEASUREMENT_ID`, `VITE_SITE_URL`.

6. **Save** et lancer un premier déploiement.

---

## 2. Domaine personnalisé (attitude-voyages.fr)

1. Dans le projet **Pages** → onglet **Custom domains** (ou **Domaines personnalisés**).
2. **Set up a custom domain** :
   - Ajoute **www.attitude-voyages.fr** → Valider.
   - Ajoute **attitude-voyages.fr** → Valider.
3. Si la zone **attitude-voyages.fr** est déjà sur Cloudflare (nameservers Gandi pointent vers Cloudflare), les enregistrements nécessaires sont créés ou réutilisés automatiquement.
4. Sinon, Cloudflare affiche les instructions (CNAME ou A) à créer chez ton hébergeur DNS.

---

## 3. DNS (Gandi → Cloudflare)

- **Nameservers** du domaine **attitude-voyages.fr** doivent pointer vers Cloudflare (ex. `dawn.ns.cloudflare.com`, `seth.ns.cloudflare.com`).
- C’est configuré dans **Gandi** → **attitude-voyages.fr** → **Serveurs de noms**.
- Une fois les domaines ajoutés au projet Pages, Cloudflare gère les enregistrements (CNAME pour www, et pour la racine selon la config).

---

## 4. HTTPS

1. **Cloudflare** → zone **attitude-voyages.fr** → **SSL / TLS**.
2. **Overview** : mode **Full** ou **Full (strict)**.
3. **Edge Certificates** : activer **Always Use HTTPS**.

Le site est alors servi en **https://www.attitude-voyages.fr** et **https://attitude-voyages.fr**.

---

## 5. Fichiers du dépôt

- **`wrangler.toml`** : décrit le déploiement (nom du projet, dossier `dist`, SPA).
- **Pas de workflow GitHub Actions** pour GitHub Pages : le déploiement se fait uniquement via Cloudflare (connexion Git ou `wrangler deploy` selon ta config).

---

## Dépannage

- **Build échoue** : vérifier les variables d’environnement (VITE_*) dans les paramètres du projet Pages.
- **404 sur une route** : `wrangler.toml` contient `not_found_handling = "single-page-application"` pour que les routes (ex. `/contact`) renvoient `index.html`.
- **Domaine inaccessible** : vérifier les nameservers chez Gandi et les Custom domains dans le projet Pages.
