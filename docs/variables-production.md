# Variables d'environnement en production (Cloudflare Pages)

En local, les variables sont lues depuis le fichier `.env`. En production, le build s'exécute sur **Cloudflare Pages** sans accès à `.env`. Il faut définir les variables dans les **paramètres du projet** Cloudflare.

## Configurer les variables sur Cloudflare

1. **https://dash.cloudflare.com** → **Workers & Pages** → ton projet **attitude-voyages**.
2. **Settings** → **Environment variables** (Variables d'environnement).
3. Pour **Production** (et optionnellement Preview), ajoute :
   - **Variable name** : `VITE_CALENDLY_URL`  
     **Value** : `https://calendly.com/alex-bymodule/60min` (ou ton URL).
   - **Variable name** : `VITE_FORMSPREE_FORM_ID`  
     **Value** : ton ID Formspree (ex. `mbdajdqe`).
4. **Save**. Relance un déploiement (nouveau push ou **Retry deployment**) pour que le build prenne en compte les valeurs.

## Variables utilisées par le build

| Variable                  | Recommandé | Description |
|---------------------------|------------|-------------|
| `VITE_CALENDLY_URL`       | Oui        | URL de la page Calendly. Sans elle, l'app utilise l'URL de démo. |
| `VITE_FORMSPREE_FORM_ID`  | Oui        | ID du formulaire Formspree. Sans lui, le formulaire de contact ne peut pas envoyer. |
| `VITE_GTM_ID`             | Optionnel  | ID du container Google Tag Manager. |
| `VITE_GA4_MEASUREMENT_ID` | Optionnel  | ID de mesure Google Analytics 4. |
| `VITE_SITE_URL`           | Optionnel  | URL du site (ex. `https://www.attitude-voyages.fr`) pour les canonical. |
