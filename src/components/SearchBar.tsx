import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onSearch: (query: string) => void;
  isLoading?: boolean;
};

export default function SearchBar({ onSearch, isLoading = false }: Props) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6"
      role="search"
      aria-label={t('search')}
    >
      <div className="flex gap-2 items-center">
        <label htmlFor="search-input" className="sr-only">
          {t('search')}
        </label>

        <div className="flex-1 relative">
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            aria-label={t('search')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none pr-8"
            disabled={isLoading}
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label={t('clear', { defaultValue: 'Clear search' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          disabled={isLoading}
        >
          {t('search')}
        </button>
      </div>
    </form>
  );
}