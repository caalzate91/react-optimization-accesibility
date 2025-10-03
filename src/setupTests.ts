/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';

// Mock global para i18n en todos los tests
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const dictionary: Record<string, string> = {
          'search.button': 'Search',
          'errors.notFound': 'No characters found',
          'errors.generic': 'Error',
          'header.title': 'Rick and Morty Explorer',
          'header.subtitle': 'Discover characters across the multiverse',
        };
        return dictionary[key] || key;
      },
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

// Mock IntersectionObserver
(globalThis as any).IntersectionObserver = class MockIntersectionObserver {
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock fetch
(globalThis as any).fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
);

// Mock import.meta.env for Vite
(globalThis as any).import = {
  meta: {
    env: {
      VITE_USE_MOCK_API: 'false'
    }
  }
};

