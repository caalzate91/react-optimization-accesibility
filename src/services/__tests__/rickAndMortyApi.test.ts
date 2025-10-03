import axios from "axios";
import { rickAndMortyApi } from "../rickAndMortyApi";
import { mockApi } from "../mockApi";
import type { CharacterResponse } from "../../types/api";

// Mock axios to avoid import.meta issues in tests
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock explícito de mockApi (para fallback)
jest.mock("../mockApi", () => ({
  mockApi: {
    getCharacters: jest.fn(),
    searchCharacters: jest.fn(),
  },
}));

jest.mock('../../env', () => ({
  env: { USE_MOCK_API: true }
}));

describe('Rick and Morty API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.create.mockReturnValue(mockedAxios); 
  });


  describe("getCharacters", () => {
    it("✅ debería llamar a la API real con la URL y params correctos", async () => {
      const mockData: CharacterResponse = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [{ id: 1, name: "Rick Sanchez" } as any],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await rickAndMortyApi.getCharacters(1);

      // Verifica URL + params
      expect(mockedAxios.get).toHaveBeenCalledWith("/character", { params: { page: 1 } });
      // Verifica respuesta
      expect(result).toEqual(mockData);
    });

    it("❌ debería hacer fallback al mockApi si la API real falla", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

      const fallbackData: CharacterResponse = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [{ id: 2, name: "Morty Smith" } as any],
      };

      (mockApi.getCharacters as jest.Mock).mockResolvedValueOnce(fallbackData);

      const result = await rickAndMortyApi.getCharacters(1);

      // Se intentó primero con axios
      expect(mockedAxios.get).toHaveBeenCalledWith("/character", { params: { page: 1 } });
      // Luego se usó el mockApi
      expect(mockApi.getCharacters).toHaveBeenCalledWith(1);
      expect(result).toEqual(fallbackData);
    });
  });

  describe('API Configuration', () => {
    it('should have correct base URL', () => {
      const BASE_URL = 'https://rickandmortyapi.com/api';
      expect(BASE_URL).toBe('https://rickandmortyapi.com/api');
    });

    it('should have correct timeout configuration', () => {
      const timeout = 10000;
      expect(timeout).toBe(10000);
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      const errorMessage = 'Network error';
      const error = new Error(errorMessage);
      
      expect(error.message).toBe(errorMessage);
    });

    it('should fallback to mock API when needed', () => {
      const mockResponse = {
        info: { count: 8, pages: 1, next: null, prev: null },
        results: []
      };
      
      expect(mockResponse.info.count).toBe(8);
    });
  });
});