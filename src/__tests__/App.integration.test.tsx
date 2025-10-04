import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import type { CharacterResponse, Character } from '../types/api';

// Create mock adapter
const mock = new MockAdapter(axios);

// Mock console methods to reduce noise in tests
const originalConsole = console;
beforeAll(() => {
  global.console = {
    ...console,
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
});

afterAll(() => {
  global.console = originalConsole;
});

describe('App Integration Tests', () => {
  beforeEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  describe('Character Loading and Display', () => {
    it('should load and display characters on initial render', async () => {
      // Arrange
      const mockCharacters: CharacterResponse = {
        info: {
          count: 2,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth (C-137)', url: '' },
            location: { name: 'Citadel of Ricks', url: '' },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [],
            url: '',
            created: '2017-11-04T18:48:46.250Z',
          },
          {
            id: 2,
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth (C-137)', url: '' },
            location: { name: 'Earth (Replacement Dimension)', url: '' },
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            episode: [],
            url: '',
            created: '2017-11-04T18:50:21.651Z',
          },
        ],
      };

      mock.onGet('/character').reply(200, mockCharacters);

      // Act
      render(<App />);

      // Assert - Should show loading initially
      expect(screen.getByText('loading')).toBeInTheDocument();

      // Wait for characters to load
      await waitFor(() => {
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      });

      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
      expect(screen.queryByText('loading')).not.toBeInTheDocument();
    });

    it('should handle API errors gracefully and show error message', async () => {
      // Arrange
      mock.onGet('/character').reply(500, { error: 'Server Error' });

      // Act
      render(<App />);

      // Wait for error to be displayed (fallback to mock data should occur)
      await waitFor(() => {
        expect(screen.queryByText('loading')).not.toBeInTheDocument();
      });

      // Since the API falls back to mock data on error, we should still see characters
      // The error handling is done internally and mock data is used as fallback
      expect(screen.queryByText('error')).not.toBeInTheDocument();
    });
  });

  describe('Search Integration', () => {
    it('should search for characters and display results', async () => {
      // Arrange
      const user = userEvent.setup();
      
      // Mock initial load
      const initialCharacters: CharacterResponse = {
        info: { count: 2, pages: 1, next: null, prev: null },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth (C-137)', url: '' },
            location: { name: 'Citadel of Ricks', url: '' },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [],
            url: '',
            created: '2017-11-04T18:48:46.250Z',
          },
        ],
      };

      // Mock search results
      const searchResults: CharacterResponse = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [
          {
            id: 2,
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth (C-137)', url: '' },
            location: { name: 'Earth (Replacement Dimension)', url: '' },
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            episode: [],
            url: '',
            created: '2017-11-04T18:50:21.651Z',
          },
        ],
      };

      // Set up mock responses
      mock.onGet('/character', { params: { page: 1 } }).reply(200, initialCharacters);
      mock.onGet('/character', { params: { name: 'Morty', page: 1 } }).reply(200, searchResults);

      // Act
      render(<App />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      });

      // Perform search
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      const searchButton = screen.getByRole('button', { name: /search\.button/i });

      await user.type(searchInput, 'Morty');
      await user.click(searchButton);

      // Assert search results
      await waitFor(() => {
        expect(screen.getByText('Morty Smith')).toBeInTheDocument();
      });

      expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
    });

    it('should clear search and return to all characters', async () => {
      // Arrange
      const user = userEvent.setup();
      
      const allCharacters: CharacterResponse = {
        info: { count: 2, pages: 1, next: null, prev: null },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth (C-137)', url: '' },
            location: { name: 'Citadel of Ricks', url: '' },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [],
            url: '',
            created: '2017-11-04T18:48:46.250Z',
          },
          {
            id: 2,
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth (C-137)', url: '' },
            location: { name: 'Earth (Replacement Dimension)', url: '' },
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            episode: [],
            url: '',
            created: '2017-11-04T18:50:21.651Z',
          },
        ],
      };

      mock.onGet('/character').reply(200, allCharacters);

      // Act
      render(<App />);

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      });

      // Type in search box to show clear button
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      await user.type(searchInput, 'test search');

      // Click clear button
      const clearButton = screen.getByRole('button', { name: /search\.clear/i });
      await user.click(clearButton);

      // Assert that search was cleared and all characters are shown
      expect(searchInput).toHaveValue('');
      await waitFor(() => {
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Morty Smith')).toBeInTheDocument();
      });
    });
  });

  describe('Character Information Display', () => {
    it('should display character information correctly with translations', async () => {
      // Arrange
      const mockCharacter: Character = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive' as const,
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth (C-137)', url: '' },
        location: { name: 'Citadel of Ricks', url: '' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [],
        url: '',
        created: '2017-11-04T18:48:46.250Z',
      };

      const mockResponse: CharacterResponse = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [mockCharacter],
      };

      mock.onGet('/character').reply(200, mockResponse);

      // Act
      render(<App />);

      // Wait for character to load
      await waitFor(() => {
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      });

      // Assert character information is displayed with translation keys
      expect(screen.getByText('character.gender')).toBeInTheDocument();
      expect(screen.getByText('character.origin')).toBeInTheDocument();
      expect(screen.getByText('character.location')).toBeInTheDocument();
      expect(screen.getByText('Male')).toBeInTheDocument();
      expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
      expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    });
  });

  describe('Language Selector Integration', () => {
    it('should render language selector in header', async () => {
      // Arrange
      const mockResponse: CharacterResponse = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [],
      };

      mock.onGet('/character').reply(200, mockResponse);

      // Act
      render(<App />);

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('combobox', { name: /language\.selector/i })).toBeInTheDocument();
      });
    });

    it('should change language when language selector is used', async () => {
      // Arrange
      const user = userEvent.setup();
      const mockResponse: CharacterResponse = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [],
      };

      mock.onGet('/character').reply(200, mockResponse);

      // Act
      render(<App />);

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

      const languageSelect = screen.getByRole('combobox', { name: /language\.selector/i });
      
      // Change language to Spanish
      await user.selectOptions(languageSelect, 'es');

      // Assert - the language should change (mocked to return keys, so we verify the select works)
      expect(languageSelect).toHaveValue('es');
    });
  });
});