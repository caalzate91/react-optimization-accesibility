import CharacterCard from './components/CharacterCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import Pagination from './components/Pagination';
import { useCharacters } from './hooks/useCharacters';

import headerImage from './assets/o6cwlzg3exk41.png';
import footerImage from './assets/rick-and-morty-escape-facebook-cover.jpg';

import ResponsiveImage from './components/ResponsiveImage';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

function App() {
  const {
    characters,
    loading,
    error,
    pagination,
    handleSearch,
    handlePageChange,
  } = useCharacters();

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-green-400 to-blue-600 overflow-hidden" aria-label="Site header">
        <div className="absolute inset-0">
          <ResponsiveImage
  src={headerImage}
  srcSet={`${headerImage} 1x, ${headerImage} 2x`}
  sizes="(max-width: 768px) 100vw, 1280px"
  alt={t('hero_alt', { defaultValue: 'Background with Rick and Morty portal behind the page title' })}
  width={1280}
  height={320}
  priority
  className="w-full h-full object-cover opacity-80"
/>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 text-center">
          {/* Switcher de idioma en la esquina */}
          <div className="absolute right-4 top-4">
            <LanguageSwitcher />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            {t('title')}
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md">
            {t('subtitle')}
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1" aria-labelledby="main-title">
        <h2 id="main-title" className="sr-only">{t('title')}</h2>

        <div className="container mx-auto px-4 py-8">
          {/* Barra de búsqueda (el componente interno puede usar su placeholder propio) */}
          <SearchBar onSearch={handleSearch} isLoading={loading} />

          {error && (
            <div
              role="alert"
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            >
              <div className="font-medium">{t('error_label', { defaultValue: 'Error:' })}</div>
              <div>{error}</div>
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {characters.length === 0 && !error ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-xl">
                    {t('no_results', { defaultValue: 'No characters found' })}
                  </p>
                </div>
              ) : (
                <>
                  <ul
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8"
  role="list"
  aria-label={t('characters_list', { defaultValue: 'Characters list' })}
>
  {characters.map((character) => (
    <CharacterCard key={character.id} character={character} />
  ))}
</ul>


                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    hasNext={pagination.hasNext}
                    hasPrev={pagination.hasPrev}
                  />
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white overflow-hidden" aria-label="Site footer">
        <div className="absolute inset-0">
          <ResponsiveImage
  src={footerImage}
  alt={t('footer_alt', { defaultValue: 'Rick and Morty background in footer' })}
  width={1280}
  height={320}
  loading="lazy"
  className="w-full h-full object-cover opacity-40"
/>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">{t('footer_title', { defaultValue: 'Adventure Awaits!' })}</div>
            <p className="text-gray-300 mb-4">
              {t('footer_subtitle', {
                defaultValue: 'Discover more characters from the infinite multiverse of Rick and Morty',
              })}
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
              <span>© 2024 {t('app_name', { defaultValue: 'Rick and Morty Character Explorer' })}</span>
              <span>•</span>
              <span>{t('powered_by', { defaultValue: 'Powered by Rick and Morty API' })}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
