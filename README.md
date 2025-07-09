# Bigg's Media - Podcast Platform for Global Diaspora Cultures

A modern podcast platform celebrating multicultural content and diaspora communities worldwide. Built with React, TypeScript, and Supabase.

## 🚀 Features

### Core Features
- 🎧 **Podcast Streaming** - High-quality audio streaming
- 📱 **Responsive Design** - Optimized for all devices
- 🌐 **Multi-language Support** - French and English interface
- 🎨 **Modern UI** - Beautiful design with dark/light mode

### Advanced Features (Powered by Supabase)
- 🔐 **User Authentication** - Secure user accounts and profiles
- 💬 **Comments & Ratings** - Episode feedback system
- 📋 **Personal Playlists** - Save and organize favorite episodes
- 🔔 **Push Notifications** - Alerts for new episodes
- 📱 **Offline Mode** - Download episodes for offline listening
- 🌍 **Internationalization** - Built-in i18n system

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Backend**: Supabase (PostgreSQL, Auth, Real-time, Storage)
- **Deployment**: Netlify
- **Icons**: Lucide React
- **State Management**: React Query (TanStack Query)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd biggs-media
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - The project uses Supabase configuration from `src/integrations/supabase/client.ts`
   - No additional environment variables needed for basic functionality

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### Netlify Deployment
The project is configured for easy deployment on Netlify:

1. **Connect to Netlify**
   - Connect your repository to Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Automatic Deployment**
   - The `netlify.toml` configuration handles:
     - SPA routing redirects
     - Asset optimization
     - Cache headers

3. **Domain Configuration**
   - Update Supabase Auth settings with your domain
   - Configure redirect URLs in Supabase Dashboard

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🗄️ Database Schema

The project uses the following main tables:
- `profiles` - User profile information
- `podcasts` - Podcast metadata
- `episodes` - Episode content and metadata
- `comments` - User comments and ratings
- `playlists` - User-created playlists
- `playlist_items` - Episodes in playlists
- `newsletter_subscribers` - Email subscribers

## 🔐 Authentication

User authentication is handled through Supabase Auth with:
- Email/password registration and login
- User profiles with additional metadata
- Row Level Security (RLS) for data protection
- Automatic profile creation on signup

## 🌍 Internationalization

The platform supports multiple languages:
- **French** (default)
- **English**

To add new languages:
1. Update `src/hooks/useI18n.ts` with new translations
2. Add language option to `LanguageToggle` component

## 📱 Progressive Web App Features

Future enhancements include:
- Service Worker for offline functionality
- Push notification support
- App-like experience on mobile devices

## 🎨 Design System

The project uses a comprehensive design system with:
- Semantic color tokens
- Consistent spacing and typography
- Dark/light mode support
- Responsive breakpoints
- Custom component variants

## 📊 Performance

- Lazy loading for components and routes
- Optimized images with proper caching
- Bundle splitting and code optimization
- CDN delivery through Netlify

## 🔄 Real-time Features

Powered by Supabase Real-time:
- Live comments and ratings
- Real-time notifications
- User presence tracking

## 📖 API Documentation

The project integrates with Supabase APIs:
- **Database**: PostgreSQL with auto-generated TypeScript types
- **Authentication**: Built-in user management
- **Storage**: File upload and management
- **Real-time**: Live data synchronization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary. All rights reserved.

## 🆘 Support

For support and questions:
- Check the documentation in `/docs`
- Review Supabase integration guide
- Contact the development team

## 🚀 Roadmap

- [ ] Enhanced offline capabilities
- [ ] Advanced analytics dashboard
- [ ] Social sharing features
- [ ] Live streaming support
- [ ] Mobile application (React Native)
- [ ] Content creator tools
- [ ] Advanced search and filtering
- [ ] Integration with external podcast platforms

---

Built with ❤️ for the global diaspora community