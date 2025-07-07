
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
- **Page À propos** complète avec :
  - Mission et présentation de Bigg's Media
  - Valeurs fondamentales (Inclusion, Diversité, Communauté, Authenticité)
  - Présentation de l'équipe
  - Section d'appel à l'action
- **Page Contact** avec :
  - Formulaire de contact complet et fonctionnel
  - Informations de contact (email, téléphone, localisation)
  - Liens vers les réseaux sociaux
  - Section collaboration et partenariats
- **Design system complet** avec :
  - Palette de couleurs inspirée du logo (dégradés de bleus)
  - Animations et transitions fluides
  - Composants réutilisables
  - Amélioration des contrastes et visibilité du texte
- **Navigation intuitive** avec header responsive
- **SEO optimisé** avec métadonnées appropriées
- **Configuration Docker** pour développement et production

### 🔄 En Cours de Développement
- **Lecteur flottant** pour navigation continue pendant l'écoute
- **Système de téléchargement** des épisodes
- **Intégration réseaux sociaux** avancée

## 🚀 Fonctionnalités à Implémenter

### Pages et Fonctionnalités Principales
- [ ] **Blog** - Système de blog avec catégories pour articles culturels
- [ ] **Système de recherche avancée** avec filtres par région/thème
- [ ] **Newsletter** - Système d'abonnement fonctionnel avec intégration email

### Fonctionnalités Avancées (Nécessitent Supabase)
- [ ] **Multi-langue** (FR/EN) avec système i18n
- [ ] **Authentification utilisateur** - Comptes et profils
- [ ] **Commentaires et évaluations** sur les épisodes
- [ ] **Playlists personnalisées** pour les utilisateurs
- [ ] **Notifications push** pour nouveaux épisodes
- [ ] **Mode hors-ligne** pour écoute sans connexion

### Intégrations Techniques à Prévoir
- [ ] **Supabase** - Base de données, authentification, stockage
- [ ] **CMS headless** pour gestion de contenu
- [ ] **Service d'emailing** (Mailchimp, SendGrid) pour newsletter
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
- **React Hook Form** + **Zod** pour la gestion des formulaires
- **Lucide React** pour les icônes

### Design System
- **Couleurs** : Dégradés de bleus inspirés du logo
- **Tokens sémantiques** : Variables CSS pour cohérence
- **Composants** : Bibliothèque extensible et réutilisable
- **Responsive** : Mobile-first avec breakpoints adaptatifs
- **Accessibilité** : Contrastes améliorés et lisibilité optimisée

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
│   ├── PodcastDetail.tsx # Détail d'un podcast
│   ├── About.tsx       # Page à propos
│   ├── Contact.tsx     # Page contact
│   └── NotFound.tsx    # Page 404
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

## 🔗 Intégration Backend (Supabase)

Pour les fonctionnalités avancées nécessitant un backend (authentification, base de données, etc.), nous recommandons l'intégration native avec Supabase :

### Fonctionnalités Backend Disponibles
- **Authentification** - Login/logout, gestion des profils
- **Base de données** - Stockage des contenus, commentaires, playlists
- **Stockage de fichiers** - Upload d'images, audio, documents
- **Edge Functions** - APIs personnalisées, intégrations tierces
- **Real-time** - Notifications en temps réel

### Activation
1. Cliquer sur le bouton Supabase (vert) en haut à droite
2. Connecter ou créer un projet Supabase
3. Configurer les tables et politiques RLS
4. Implémenter les fonctionnalités une par une

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

### Phase 1 (✅ Terminée) - Foundation
- [x] Design system et composants de base
- [x] Pages principales (Accueil, Podcasts, Détail, À propos, Contact)
- [x] Lecteur audio intégré
- [x] Configuration Docker
- [x] Formulaires fonctionnels

### Phase 2 - Content & Backend
- [ ] Intégration Supabase
- [ ] Système de newsletter
- [ ] Blog avec CMS
- [ ] Authentification utilisateur

### Phase 3 - Advanced Features
- [ ] Multi-langue (FR/EN)
- [ ] Lecteur flottant
- [ ] Commentaires et évaluations
- [ ] Playlists personnalisées

### Phase 4 - Scale & Mobile
- [ ] Mode hors-ligne
- [ ] Application mobile (React Native)
- [ ] Notifications push
- [ ] Analytics avancés

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
