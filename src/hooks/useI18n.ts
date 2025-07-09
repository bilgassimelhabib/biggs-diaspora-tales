import { useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.podcasts': {
    fr: 'Podcasts',
    en: 'Podcasts'
  },
  'nav.about': {
    fr: 'À propos',
    en: 'About'
  },
  'nav.contact': {
    fr: 'Contact',
    en: 'Contact'
  },
  'nav.signin': {
    fr: 'Se connecter',
    en: 'Sign In'
  },

  // Hero section
  'hero.badge': {
    fr: '🎧 Nouveau média multiculturel',
    en: '🎧 New multicultural media'
  },
  'hero.title': {
    fr: "Bigg's Media",
    en: "Bigg's Media"
  },
  'hero.subtitle': {
    fr: 'Cultures de la Diaspora Mondiale',
    en: 'Global Diaspora Cultures'
  },
  'hero.description': {
    fr: 'Découvrez des podcasts authentiques qui célèbrent la diversité, racontent les histoires uniques des communautés de la diaspora et créent des ponts entre les cultures.',
    en: 'Discover authentic podcasts that celebrate diversity, tell unique stories of diaspora communities and create bridges between cultures.'
  },
  'hero.listen': {
    fr: 'Écouter maintenant',
    en: 'Listen now'
  },
  'hero.discover': {
    fr: 'Découvrir nos podcasts',
    en: 'Discover our podcasts'
  },

  // Podcasts section
  'podcasts.badge': {
    fr: '🎙️ Nos Podcasts',
    en: '🎙️ Our Podcasts'
  },
  'podcasts.title': {
    fr: 'Histoires Authentiques',
    en: 'Authentic Stories'
  },
  'podcasts.description': {
    fr: 'Plongez dans nos podcasts multiculturels qui donnent la parole aux communautés de la diaspora mondiale et célèbrent leur richesse culturelle.',
    en: 'Dive into our multicultural podcasts that give voice to global diaspora communities and celebrate their cultural richness.'
  },
  'podcasts.viewAll': {
    fr: 'Voir tous les podcasts',
    en: 'View all podcasts'
  },

  // Mission section
  'mission.badge': {
    fr: '🌍 Notre Mission',
    en: '🌍 Our Mission'
  },
  'mission.title': {
    fr: 'Connecter les Cultures, Raconter les Histoires',
    en: 'Connecting Cultures, Telling Stories'
  },
  'mission.description': {
    fr: "Bigg's Media est né de la conviction que chaque culture de la diaspora a des histoires uniques à raconter. Nous créons un espace où ces voix peuvent s'exprimer librement et toucher un public mondial.",
    en: "Bigg's Media was born from the conviction that every diaspora culture has unique stories to tell. We create a space where these voices can express themselves freely and reach a global audience."
  },
  'mission.learnMore': {
    fr: 'En savoir plus',
    en: 'Learn more'
  },

  // Newsletter
  'newsletter.title': {
    fr: 'Restez Connectés',
    en: 'Stay Connected'
  },
  'newsletter.description': {
    fr: 'Recevez les derniers épisodes, les actualités de nos créateurs et les événements de la communauté directement dans votre boîte mail.',
    en: 'Receive the latest episodes, creator news and community events directly in your inbox.'
  },
  'newsletter.placeholder': {
    fr: 'Votre adresse email',
    en: 'Your email address'
  },
  'newsletter.subscribe': {
    fr: "S'abonner",
    en: 'Subscribe'
  },

  // Common
  'common.loading': {
    fr: 'Chargement...',
    en: 'Loading...'
  },
  'common.episode': {
    fr: 'épisode',
    en: 'episode'
  },
  'common.episodes': {
    fr: 'épisodes',
    en: 'episodes'
  }
};

export const useI18n = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const switchLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  return {
    language,
    setLanguage,
    switchLanguage,
    t
  };
};