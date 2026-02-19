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

Le site inclut des balises meta optimisées pour le référencement :
- Titre et description dans `index.html`
- Structure sémantique HTML5
- Balises alt sur toutes les images
- Liens internes optimisés

Pensez à :
- Ajouter un fichier `sitemap.xml`
- Configurer Google Analytics
- Créer un compte Google My Business

## 🌐 Déploiement

### Netlify (recommandé)
1. Connectez votre repository GitHub
2. Build command : `npm run build`
3. Publish directory : `dist`

### Vercel
1. Importez votre projet
2. Configuration automatique pour Vite

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
