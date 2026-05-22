# Module de réservation + back-office

Le site est désormais propulsé par **Cloudflare Pages + Functions + D1 + Resend**.
Calendly et Formspree ont été retirés.

---

## Architecture

```
[Vite SPA (dist/)]  →  Cloudflare Pages
       │
       ├─ /                public assets, prerender HTML statique
       ├─ /reservation     wizard 3-étapes (BookingWidget)
       ├─ /admin/*         back-office (login + dashboard + bookings + dispos)
       │
       └─ /api/*           Cloudflare Pages Functions (functions/)
                              │
                              ├─ D1 (SQLite) — bookings, types, dispos, messages, admins
                              └─ Resend API — emails de confirmation + notif admin
```

| Endpoint                          | Méthode | Auth   | Rôle                                              |
| --------------------------------- | ------- | ------ | ------------------------------------------------- |
| `/api/contact`                    | POST    | Public | Stocke un message + envoi email                   |
| `/api/consultation-types`         | GET     | Public | Liste les types de RDV actifs                     |
| `/api/availability?type=…`        | GET     | Public | Calcule les créneaux dispo pour un type           |
| `/api/bookings`                   | POST    | Public | Crée un RDV + envoie confirmation client + admin  |
| `/api/admin/login`                | POST    | Public | Authentifie (cookie de session 7j)                |
| `/api/admin/logout`               | POST    | Admin  | Détruit la session                                |
| `/api/admin/me`                   | GET     | Admin  | Retourne l'admin connecté                         |
| `/api/admin/bookings`             | GET     | Admin  | Liste filtrable par statut + plage de dates       |
| `/api/admin/bookings/:id`         | PATCH   | Admin  | Change le statut (confirm/cancel/no_show/etc.)    |
| `/api/admin/bookings/:id`         | DELETE  | Admin  | Supprime un booking                               |
| `/api/admin/availability`         | GET     | Admin  | Règles hebdo + overrides à venir                  |
| `/api/admin/availability`         | POST    | Admin  | Ajoute un override (blocage / plage exceptionnelle) |
| `/api/admin/availability/:id`     | DELETE  | Admin  | Supprime un override                              |
| `/api/admin/messages`             | GET     | Admin  | Liste des messages reçus via /api/contact         |

---

## Setup initial Cloudflare

### 1. Créer la base D1

```bash
wrangler login                    # une fois
npm run db:create
```

Wrangler retourne un `database_id` — copie-le dans `wrangler.toml` (champ `database_id`).

### 2. Lancer la migration

```bash
npm run db:migrate:remote         # ou :local pour dev en sandbox
```

### 3. Créer le projet CF Pages

Via le dashboard (ou `wrangler pages project create attitude-voyages`).
- **Build command** : `npm run build:prerender`
- **Build output directory** : `dist`
- **Production branch** : `main`

Bind la D1 dans **Settings → Functions → D1 database bindings** :
- Variable name : `DB`
- D1 database : `attitude_voyages`

### 4. Secrets Cloudflare Pages

Dans **Settings → Environment variables → Production** :

| Nom                       | Type    | Exemple                                             |
| ------------------------- | ------- | --------------------------------------------------- |
| `RESEND_API_KEY`          | Secret  | `re_xxx…` (depuis resend.com)                       |
| `RESEND_FROM_EMAIL`       | Plain   | `Attitude Voyages <noreply@attitude-voyages.fr>`    |
| `ADMIN_EMAIL`             | Plain   | `contact@attitude-voyages.fr`                       |
| `TEST_RECIPIENT_EMAIL`    | Plain   | `heyarlow@gmail.com` (à supprimer une fois en prod) |
| `SITE_URL`                | Plain   | `https://attitude-voyages.fr`                       |
| `TIMEZONE`                | Plain   | `Europe/Paris`                                      |
| `BOOKING_LEAD_MINUTES`    | Plain   | `720`                                               |
| `BOOKING_HORIZON_DAYS`    | Plain   | `60`                                                |

> Tant que `TEST_RECIPIENT_EMAIL` est défini, **tous** les emails admin (contact +
> nouvelle réservation) vont sur cette adresse, pas sur `ADMIN_EMAIL`. Pour passer
> en prod, **supprimer la variable `TEST_RECIPIENT_EMAIL`**.

### 5. GitHub Actions

Dans **GitHub → Settings → Secrets and variables → Actions** :

| Secret                    | Description                                     |
| ------------------------- | ----------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`    | Token avec scope « Cloudflare Pages : Edit »    |
| `CLOUDFLARE_ACCOUNT_ID`   | ID compte Cloudflare                            |
| `VITE_GA4_MEASUREMENT_ID` | (optionnel) ID GA4                              |
| `VITE_GTM_ID`             | (optionnel) ID GTM                              |

### 6. Créer le premier admin

```bash
npm run admin:seed -- heyarlow@gmail.com 'mot_de_passe_solide_12+chars' 'Alex' --remote
```

(Retire `--remote` pour la DB locale de dev.)

### 7. Bascule DNS

Dans Cloudflare Pages → **Custom domains** → ajouter `attitude-voyages.fr` puis
`www.attitude-voyages.fr`. Cloudflare gère le DNS si le domaine y est déjà rattaché
(sinon : créer un CNAME `attitude-voyages.fr` → `attitude-voyages.pages.dev`).

> Le `CNAME` à la racine du repo (pointe GitHub Pages) peut être supprimé une
> fois la migration validée. Garder-le en attendant pour pouvoir revenir en arrière.

---

## Développement local

```bash
# 1. Lance Vite + Pages Functions (avec D1 locale)
npm run build && npm run cf:dev

# 2. Dans un autre terminal, dev frontend hot-reload
npm run dev
```

Le `cf:dev` démarre Wrangler avec la D1 locale (un fichier SQLite dans
`.wrangler/`). Les emails partent en `console.log` quand `RESEND_API_KEY` est absent.

---

## Tests fonctionnels (à la main, après deploy)

| Test                              | Attendu                                               |
| --------------------------------- | ----------------------------------------------------- |
| Submit /contact                   | Message stocké en DB, email reçu à `heyarlow@gmail.com` |
| Réserver un RDV via /contact#rdv  | Booking en DB, email client + email admin             |
| Login `/admin/login`              | Cookie posé, redirige vers `/admin/dashboard`         |
| Lister `/admin/bookings`          | Le RDV créé apparaît                                  |
| Bloquer une journée dans /admin   | Cette date disparaît du calendrier public             |

---

## TODO post-MVP

- [ ] Génération ICS attachée au mail confirmation client
- [ ] Édition inline des règles hebdomadaires depuis l'admin
- [ ] Pagination côté admin (au-delà de 500 bookings)
- [ ] Stats : nombre de RDV / mois, conversion contact → booking
- [ ] Rate limiting basique côté API (Cloudflare WAF rules suffit dans un 1er temps)
- [ ] 2FA admin (TOTP via authenticator)
