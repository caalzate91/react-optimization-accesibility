import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const clickedForEnglish = () => changeLanguage('en');
  const clickedForSpanish = () => changeLanguage('es');

  const setClass = (lang: string) => {
    const baseClasses = "px-3 py-1 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
    if (i18n.language.startsWith(lang)) {
      return `${baseClasses} bg-blue-600 text-white cursor-default`;
    }
    return `${baseClasses} bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600`;
  };

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      <button 
        onClick={clickedForEnglish}
        className={setClass('en')}
        disabled={i18n.language.startsWith('en')}
        aria-current={i18n.language.startsWith('en')}
      >
        English
      </button>
      <button 
        onClick={clickedForSpanish}
        className={setClass('es')}
        disabled={i18n.language.startsWith('es')}
        aria-current={i18n.language.startsWith('es')}
      >
        Español
      </button>
    </div>
  );
};

export default LanguageSelector;