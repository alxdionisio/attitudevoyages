# Attitude Voyages - Site Web

Site web moderne et élégant pour l'agence de voyage Attitude Voyages, basée à Nîmes.

## 🌟 Fonctionnalités

- **Design moderne et visuel** : Interface élégante inspirée des meilleures pratiques du web design
- **Responsive** : Adapté à tous les écrans (mobile, tablette, desktop)
- **Navigation fluide** : Scroll smooth et animations soignées
- **Sections principales** :
  - Hero avec image immersive
  - Offres du moment avec cartes interactives
  - À propos de l'agence avec statistiques
  - Système de réservation de rendez-vous
  - Formulaire de contact
  - Footer complet

## 🚀 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Accéder au site**
   Ouvrez votre navigateur à l'adresse : `http://localhost:5173`

## 📦 Build pour la production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `src/index.css` :
- `--color-primary` : Vert principal (#1a4d2e)
- `--color-secondary` : Doré (#d4a574)
- `--color-accent` : Doré clair (#e8b86d)

### Images
Remplacez les URLs Unsplash par vos propres images dans les composants :
- `src/components/Hero.jsx`
- `src/components/Offres.jsx`
- `src/components/APropos.jsx`

### Contenu
Modifiez le contenu dans chaque composant selon vos besoins :
- Offres : `src/components/Offres.jsx` (tableau `offresData`)
- Coordonnées : `src/components/Contact.jsx` et `src/components/RendezVous.jsx`

## 🔧 Intégration Calendly

Pour intégrer Calendly dans la section rendez-vous :

1. Créez un compte sur [Calendly](https://calendly.com)
2. Configurez vos disponibilités
3. Dans `src/components/RendezVous.jsx`, remplacez le formulaire par le widget Calendly :

```jsx
<div className="calendly-inline-widget" 
     data-url="https://calendly.com/votre-compte/rendez-vous" 
     style={{ minWidth: '320px', height: '700px' }}>
</div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

## 📱 SEO

### URL canonique (https://attitude-voyages.fr)

- **Une seule URL canonique** : `https://attitude-voyages.fr` (https, sans www).
- **Balise canonical** : présente sur chaque page (gérée par le composant SEO).
- **Sitemap** (`public/sitemap.xml`) : ne contient que des URLs en `https://attitude-voyages.fr/...` (jamais http ni www).
- **Build** : `VITE_SITE_URL=https://attitude-voyages.fr` est défini en CI pour que canonical et Open Graph pointent toujours vers la canonique.

### Redirections 301 (GitHub Pages)

GitHub Pages ne gère pas de fichier de redirections. Pour rediriger vers la canonique `https://attitude-voyages.fr` :

- **http → https** : dans le dépôt, *Settings → Pages* : cocher **Enforce HTTPS** (GitHub redirige alors le http vers https).
- **www → non-www** : configurer le DNS du domaine pour que seul `attitude-voyages.fr` (sans www) pointe vers GitHub Pages, ou mettre un proxy (ex. [Cloudflare](https://www.cloudflare.com)) qui redirige `www.attitude-voyages.fr` vers `attitude-voyages.fr` en 301.

### Autre

- Titre et description par page, structure sémantique, balises alt, liens internes.
- Sitemap à jour avec les pages et offres publiées.
- Pensez à : Google Analytics, Google Search Console, Google My Business.

## 🌐 Déploiement (GitHub Pages)

Le site est déployé via **GitHub Actions** (voir `.github/workflows/deploy.yml`) :

1. À chaque push sur `main`, le workflow build le projet et déploie le dossier `dist` sur GitHub Pages.
2. **Settings → Pages** : source = *GitHub Actions*.
3. Domaine personnalisé : fichier `CNAME` à la racine (ex. `attitude-voyages.fr`), puis configurer le DNS chez le registrar.
4. Fallback SPA : le workflow copie `index.html` en `404.html` pour que les routes client (/offre/xxx, /contact, etc.) affichent l’app au lieu d’une 404.

## 📄 Structure du projet

```
attitude-voyages/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx / .css
│   │   ├── Hero.jsx / .css
│   │   ├── Offres.jsx / .css
│   │   ├── APropos.jsx / .css
│   │   ├── RendezVous.jsx / .css
│   │   ├── Contact.jsx / .css
│   │   └── Footer.jsx / .css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Prochaines étapes

1. **Back-office** : Ajouter un système de gestion des offres (CMS headless comme Strapi ou Contentful)
2. **Paiement** : Intégrer Stripe pour les acomptes
3. **Newsletter** : Connecter à Mailchimp ou Sendinblue
4. **Blog** : Ajouter une section blog pour le SEO
5. **Multilingue** : Support anglais/espagnol avec i18n

## 📞 Support

Pour toute question technique, contactez le développeur ou consultez la documentation de :
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Calendly](https://developer.calendly.com)

---

**Créé avec ❤️ pour Attitude Voyages**
