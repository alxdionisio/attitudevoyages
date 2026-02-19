# Variables d’environnement en production (GitHub Actions)

En local, les variables sont lues depuis le fichier `.env`. En production, le build s’exécute sur GitHub Actions **sans** accès à `.env` (fichier non versionné). Il faut donc définir les variables nécessaires comme **secrets** du dépôt.

## Configurer un secret

1. Ouvre **https://github.com/byModule/attitudevoyages/settings/secrets/actions**
2. Clique sur **New repository secret**
3. **Name** : le nom exact de la variable (ex. `VITE_CALENDLY_URL`)
4. **Secret** : la valeur (ex. `https://calendly.com/alex-bymodule/60min`)
5. Enregistre

Après ajout ou modification d’un secret, **relance un déploiement** (push sur `main` ou « Re-run all jobs » sur le dernier workflow) pour que le nouveau build prenne en compte la valeur.

## Variables utilisées par le build

| Secret / Variable       | Obligatoire | Description |
|------------------------|------------|-------------|
| `VITE_CALENDLY_URL`    | Recommandé | URL de la page Calendly (ex. `https://calendly.com/alex-bymodule/60min`). Sans ce secret, l’app utilise l’URL de démo Calendly. |
| `VITE_FORMSPREE_FORM_ID`| **Recommandé** | ID du formulaire Formspree pour le formulaire de contact. **Sans ce secret, le formulaire affiche « Formulaire de contact non configuré » et n’envoie pas les messages.** |
| `VITE_GTM_ID`          | Optionnel  | ID du container Google Tag Manager. |
| `VITE_GA4_MEASUREMENT_ID` | Optionnel | ID de mesure Google Analytics 4. |
| `VITE_SITE_URL`        | Optionnel  | URL publique du site (ex. `https://www.attitude-voyages.fr`) pour les canonical. |

Pour que **Calendly** et le **formulaire de contact** fonctionnent en production, ajoute au minimum :
- **`VITE_CALENDLY_URL`** : ta vraie URL Calendly (ex. `https://calendly.com/alex-bymodule/60min`)
- **`VITE_FORMSPREE_FORM_ID`** : l’ID de ton formulaire Formspree (visible dans l’URL du formulaire sur formspree.io, ex. `mbdajdqe`)
