import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { CharacterResponse, Character } from '../types/api';
import { mockApi } from './mockApi';

const BASE_URL = 'https://rickandmortyapi.com/api';

// Configurar instancia de axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar interceptor de request para logging
api.interceptors.request.use((config) => {
  console.log(`Making API request to: ${config.baseURL}${config.url}`);
  return config;
});

// Agregar interceptor de response para manejo de errores
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`API response received: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('API request failed:', error.message);
    return Promise.reject(error);
  }
);

const shouldUseMockApi = () => {
  // Usar mock API cuando esté configurado explícitamente o cuando la API real no esté disponible
  // En modo desarrollo, intenta la API real primero pero usa mock si falla
  return import.meta.env.VITE_USE_MOCK_API === 'true' || typeof window === 'undefined';
};

export const rickAndMortyApi = {
  getCharacters: async (page: number = 1): Promise<CharacterResponse> => {
    try {
      if (shouldUseMockApi()) {
        return await mockApi.getCharacters(page);
      }
      
      const response = await api.get<CharacterResponse>('/character', {
        params: { page }
      });
      
      return response.data;
    } catch (error) {
      console.warn('Real API failed, falling back to mock data:', error);
      return await mockApi.getCharacters(page);
    }
  },

  getCharacter: async (id: number): Promise<Character> => {
    try {
      if (shouldUseMockApi()) {
        const result = await mockApi.getCharacters(1);
        const character = result.results.find(c => c.id === id);
        if (!character) {
          throw new Error(`Character ${id} not found`);
        }
        return character;
      }
      
      const response = await api.get<Character>(`/character/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Real API failed, falling back to mock data:', error);
      const result = await mockApi.getCharacters(1);
      const character = result.results.find(c => c.id === id);
      if (!character) {
        throw new Error(`Character ${id} not found`);
      }
      return character;
    }
  },

  searchCharacters: async (name: string, page: number = 1): Promise<CharacterResponse> => {
    try {
      if (shouldUseMockApi()) {
        return await mockApi.searchCharacters(name, page);
      }
      
      const response = await api.get<CharacterResponse>('/character', {
        params: { name, page }
      });
      
      return response.data;
    } catch (error) {
      console.warn('Real API failed, falling back to mock data:', error);
      return await mockApi.searchCharacters(name, page);
    }
  }
};