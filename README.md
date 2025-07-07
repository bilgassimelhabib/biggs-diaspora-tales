# Bigg's Media - Cultures de la Diaspora Mondiale

Bigg's Media est un média innovant dédié aux cultures de la diaspora mondiale, avec une forte orientation multiculturelle, inclusive et créative. Nous connectons les communautés, racontons leurs histoires et promouvons le dialogue interculturel à travers nos podcasts authentiques.

## 🎯 Mission

Créer un espace où les voix des communautés de la diaspora peuvent s'exprimer librement et toucher un public mondial. Nous célébrons la diversité, racontons des histoires authentiques et créons des ponts entre les cultures.

## 🎧 Fonctionnalités Actuelles

### ✅ Implémentées
- **Page d'accueil dynamique** avec présentation du média
- **Section podcasts** avec grille de podcasts disponibles
- **Pages dédiées aux podcasts** avec :
  - Bannière et couverture visuelle
  - Description complète du podcast
  - Liste des épisodes (titre, durée, date)
  - Lecteur audio HTML5 intégré et moderne
  - Boutons de partage social
  - Interface responsive (mobile/tablette/desktop)
- **Design system complet** avec :
  - Palette de couleurs inspirée du logo (dégradés de bleus)
  - Animations et transitions fluides
  - Composants réutilisables
- **Navigation intuitive** avec header responsive
- **Système de recherche et filtres** pour les podcasts
- **SEO optimisé** avec métadonnées appropriées

### 🔄 En Cours de Développement
- **Lecteur flottant** pour navigation continue pendant l'écoute
- **Système de téléchargement** des épisodes
- **Intégration réseaux sociaux** avancée

## 🚀 Fonctionnalités à Implémenter

### Pages Manquantes
- [ ] **Page À propos** - Mission, équipe, valeurs
- [ ] **Page Contact** - Formulaire, email, réseaux sociaux
- [ ] **Blog** (optionnel) - Articles liés aux cultures de la diaspora

### Fonctionnalités Avancées
- [ ] **Multi-langue** (FR/EN) avec système i18n
- [ ] **Newsletter** - Système d'abonnement fonctionnel
- [ ] **Recherche avancée** avec filtres par région/thème
- [ ] **Commentaires et évaluations** sur les épisodes
- [ ] **Playlists personnalisées** pour les utilisateurs
- [ ] **Mode hors-ligne** pour écoute sans connexion
- [ ] **Notifications push** pour nouveaux épisodes

### Intégrations Techniques
- [ ] **CMS headless** pour gestion de contenu
- [ ] **Analytics** pour suivi d'audience
- [ ] **CDN** pour optimisation des médias
- [ ] **API REST** pour applications mobiles futures

## 🏗️ Architecture Technique

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le bundling et développement
- **Tailwind CSS** avec design system personnalisé
- **Shadcn/ui** pour les composants de base
- **React Router** pour la navigation
- **Lucide React** pour les icônes

### Design System
- **Couleurs** : Dégradés de bleus inspirés du logo
- **Tokens sémantiques** : Variables CSS pour cohérence
- **Composants** : Bibliothèque extensible et réutilisable
- **Responsive** : Mobile-first avec breakpoints adaptatifs

### Structure des Fichiers
```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants de base (shadcn)
│   ├── Header.tsx      # Navigation principale
│   ├── PodcastCard.tsx # Carte de podcast
│   └── AudioPlayer.tsx # Lecteur audio
├── pages/              # Pages de l'application
│   ├── Index.tsx       # Page d'accueil
│   ├── Podcasts.tsx    # Liste des podcasts
│   └── PodcastDetail.tsx # Détail d'un podcast
├── lib/                # Utilitaires
└── assets/             # Images et médias
```

## 🐳 Docker

Le projet inclut une configuration Docker complète pour faciliter le développement et le déploiement.

### Commandes Docker

**Production :**
```bash
# Build et lancement
docker-compose up --build

# Accès : http://localhost:3000
```

**Développement :**
```bash
# Lancement en mode dev avec hot-reload
docker-compose --profile dev up --build

# Accès : http://localhost:8080
```

### Fichiers Docker
- `Dockerfile` - Image de production optimisée
- `Dockerfile.dev` - Image de développement avec hot-reload
- `docker-compose.yml` - Orchestration des services
- `.dockerignore` - Exclusions pour optimiser le build

## 🚀 Installation et Développement

### Prérequis
- Node.js 18+ et npm
- Docker (optionnel)

### Installation locale
```bash
# Cloner le repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

### Avec Docker
```bash
# Développement
docker-compose --profile dev up

# Production
docker-compose up
```

## 🎨 Design et Inspiration

### Références Stylistiques
- [AfroQueer Podcast](https://www.afroqueerpodcast.com)
- [Queerency](https://www.queerency.com)
- [StoryCorps](https://www.storycorps.org)

### Identité Visuelle
- **Logo** : Formes géométriques modernes en dégradé de bleus
- **Palette** : Bleus vibrants du cyan au bleu profond
- **Style** : Moderne, inclusif, accessible et engageant

## 📈 Roadmap

### Phase 1 (Actuelle) - Foundation
- [x] Design system et composants de base
- [x] Pages principales (Accueil, Podcasts, Détail)
- [x] Lecteur audio intégré
- [x] Configuration Docker

### Phase 2 - Content & Features
- [ ] Pages manquantes (À propos, Contact)
- [ ] Système de newsletter
- [ ] Multi-langue (FR/EN)

### Phase 3 - Advanced Features
- [ ] CMS intégration
- [ ] Lecteur flottant
- [ ] Mode hors-ligne
- [ ] Analytics avancés

### Phase 4 - Scale & Mobile
- [ ] Application mobile (React Native)
- [ ] API backend complète
- [ ] Système de recommandations
- [ ] Communauté et interactions

## 🤝 Contribution

Ce projet est conçu pour évoluer avec la communauté. Les contributions sont les bienvenues pour :
- Nouvelles fonctionnalités
- Améliorations UX/UI
- Corrections de bugs
- Traductions
- Optimisations performances

## 📄 Licence

Ce projet représente l'identité de Bigg's Media. Voir les conditions d'utilisation pour plus de détails.

---

**Bigg's Media** - Connecter les cultures, raconter les histoires 🌍🎙️
