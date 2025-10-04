import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="language-select" className="text-sm font-medium text-white">
        {t('language.selector')}:
      </label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-white/10 text-white text-sm rounded px-2 py-1 border border-white/20 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none"
        aria-label={t('language.selector')}
      >
        <option value="en" className="text-gray-900">
          {t('language.english')}
        </option>
        <option value="es" className="text-gray-900">
          {t('language.spanish')}
        </option>
      </select>
    </div>
  );
};

export default LanguageSelector;