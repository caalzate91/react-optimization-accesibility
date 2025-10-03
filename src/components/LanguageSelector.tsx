import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md bg-white/10 text-white border border-white/20 
                hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30
                transition-colors duration-200"
      aria-label={i18n.language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
    >
      {i18n.language === 'en' ? '🇪🇸 ES' : '🇬🇧 EN'}
    </button>
  );
};

export default LanguageSelector;