import CharacterCard from './components/CharacterCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import Pagination from './components/Pagination';
import { useCharacters } from './hooks/useCharacters';
import headerImage from './assets/o6cwlzg3exk41.png';
import footerImageSm from './assets/rick-and-morty-escape-facebook-cover-640.jpg';
import footerImageMd from './assets/rick-and-morty-escape-facebook-cover-1280.jpg';
import footerImageLg from './assets/rick-and-morty-escape-facebook-cover-1920.jpg';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const { 
    characters, 
    loading, 
    error, 
    pagination, 
    handleSearch, 
    handlePageChange 
  } = useCharacters();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="relative bg-gradient-to-r from-green-400 to-blue-600 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={headerImage} 
            className="w-full h-full object-cover opacity-50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            {t("Rick and Morty Characters")}
          </h1>
          <h2 className="text-xl text-white/90 drop-shadow-md">
            {t("Explore characters from the multiverse")}
          </h2>
        </div>
      </header>

      <LanguageSelector />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <SearchBar onSearch={handleSearch} isLoading={loading} />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {characters.length === 0 && !error ? (
                <section className="text-center py-12">
                  <p className="text-gray-500 text-xl">{t("No characters found")}</p>
                </section>
              ) : (
                <>
                  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {characters.map((character) => (
                      <CharacterCard key={character.id} character={character} />
                    ))}
                  </section>

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

      <footer className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            srcSet={`${footerImageSm} 640w, ${footerImageMd} 1280w, ${footerImageLg} 1920w`}
            sizes="100vw"
            src={footerImageSm} 
            className="w-full h-full object-cover opacity-40"
            loading='eager'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{t("Adventure Awaits!")}</h2>
            <p className="text-gray-300 mb-4">
              {t("Discover more characters from the infinite multiverse of Rick and Morty")}
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
              <span>© 2024 {t("Rick and Morty Character Explorer")}</span>
              <span>•</span>
              <span>{t("Powered by Rick and Morty API")}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
