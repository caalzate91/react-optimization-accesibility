import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { rickAndMortyApi } from '../rickAndMortyApi';
import type { CharacterResponse, Character } from '../../types/api';

// Create a mock instance
const mock = new MockAdapter(axios);

describe('rickAndMortyApi', () => {
  beforeEach(() => {
    // Clear console logs and reset mocks before each test
    jest.clearAllMocks();
    mock.reset();
    
    // Mock console methods to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock shouldUseMockApi to return false for testing real API behavior
    jest.mock('../rickAndMortyApi', () => ({
      ...jest.requireActual('../rickAndMortyApi'),
      shouldUseMockApi: () => false
    }));
  });

  afterEach(() => {
    // Restore console methods
    jest.restoreAllMocks();
  });

  describe('getCharacters', () => {
    it('should fetch characters successfully from API', async () => {
      // Arrange
      const mockResponse: CharacterResponse = {
        info: {
          count: 826,
          pages: 42,
          next: 'https://rickandmortyapi.com/api/character?page=2',
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
            origin: {
              name: 'Earth (C-137)',
              url: 'https://rickandmortyapi.com/api/location/1',
            },
            location: {
              name: 'Citadel of Ricks',
              url: 'https://rickandmortyapi.com/api/location/3',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: ['https://rickandmortyapi.com/api/episode/1'],
            url: 'https://rickandmortyapi.com/api/character/1',
            created: '2017-11-04T18:48:46.250Z',
          },
        ],
      };

      mock.onGet('/character').reply(200, mockResponse);

      // Act
      const result = await rickAndMortyApi.getCharacters(1);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(result.results).toHaveLength(1);
      expect(result.results[0].name).toBe('Rick Sanchez');
      expect(result.info.count).toBe(826);
    });

    it('should handle API error and fallback to mock data', async () => {
      // Arrange
      mock.onGet('/character').networkError();

      // Act
      const result = await rickAndMortyApi.getCharacters(1);

      // Assert
      expect(result).toBeDefined();
      expect(result.results).toBeDefined();
      expect(Array.isArray(result.results)).toBe(true);
      expect(console.warn).toHaveBeenCalledWith(
        'Real API failed, falling back to mock data:',
        expect.any(Error)
      );
    });

    it('should make correct HTTP request with proper parameters', async () => {
      // Arrange
      const mockResponse: CharacterResponse = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [],
      };

      mock.onGet('/character', { params: { page: 2 } }).reply(200, mockResponse);

      // Act
      await rickAndMortyApi.getCharacters(2);

      // Assert
      expect(mock.history.get).toHaveLength(1);
      expect(mock.history.get[0].url).toBe('/character');
      expect(mock.history.get[0].params).toEqual({ page: 2 });
    });
  });

  describe('searchCharacters', () => {
    it('should search characters with correct parameters', async () => {
      // Arrange
      const searchTerm = 'Rick';
      const mockResponse: CharacterResponse = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth', url: '' },
            location: { name: 'Earth', url: '' },
            image: 'image.jpg',
            episode: [],
            url: '',
            created: '2023-01-01',
          },
        ],
      };

      mock.onGet('/character', { params: { name: searchTerm, page: 1 } }).reply(200, mockResponse);

      // Act
      const result = await rickAndMortyApi.searchCharacters(searchTerm, 1);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(mock.history.get).toHaveLength(1);
      expect(mock.history.get[0].params).toEqual({ name: searchTerm, page: 1 });
    });

    it('should handle search API error gracefully', async () => {
      // Arrange
      mock.onGet('/character').reply(500, { error: 'Internal Server Error' });

      // Act
      const result = await rickAndMortyApi.searchCharacters('nonexistent', 1);

      // Assert
      expect(result).toBeDefined();
      expect(console.warn).toHaveBeenCalledWith(
        'Real API failed, falling back to mock data:',
        expect.any(Error)
      );
    });
  });
});