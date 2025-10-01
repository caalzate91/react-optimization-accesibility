import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <label className="text-sm text-white/90 flex items-center gap-2">
      {t('change_language')}
      <select
        aria-label={t('change_language')}
        value={i18n.resolvedLanguage}
        onChange={onChange}
        className="text-black rounded px-2 py-1"
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </label>
  );
}
