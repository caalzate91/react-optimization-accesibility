/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import './i18n';
import i18n from './i18n';

// Mock IntersectionObserver
(globalThis as any).IntersectionObserver = class MockIntersectionObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
};

// Mock fetch
if (!(globalThis as any).fetch) {
  (globalThis as any).fetch = jest.fn();
}

// Mock import.meta.env for Vite
(globalThis as any).import = {
  meta: {
    env: {
      VITE_USE_MOCK_API: 'false'
    }
  }
};

beforeAll(async () => {
  await i18n.changeLanguage('en');
});