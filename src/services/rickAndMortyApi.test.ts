import axios from 'axios';
jest.mock('axios'); 

import { rickAndMortyApi } from './rickAndMortyApi'; 
import type { CharacterResponse, Character } from '../types/api'; 
import { mockApi } from './mockApi'; 

jest.mock('./mockApi', () => ({
  mockApi: {
    getCharacters: jest.fn(),
    getCharacter: jest.fn(),
    searchCharacters: jest.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedMockApi = mockApi as jest.Mocked<typeof mockApi>;

let apiInstanceMock: any; 

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Earth (Replacement Dimension)', url: '' },
  image: 'rick.jpg',
  episode: ['ep1', 'ep2'],
  url: '',
  created: new Date().toISOString(),
};

const mockSuccessResponseData: CharacterResponse = {
  info: { count: 826, pages: 42, next: 'http://nextpage.com', prev: null },
  results: [mockCharacter],
};

const mockFallbackData: CharacterResponse = {
  info: { count: 1, pages: 1, next: null, prev: null },
  results: [{ ...mockCharacter, id: 999, name: 'Mock Character' }],
};


describe('rickAndMortyApi - Servicio HTTP', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    beforeEach(() => {
        jest.clearAllMocks(); 
        mockedMockApi.getCharacters.mockResolvedValue(mockFallbackData);

        if (mockedAxios.create.mock.results.length > 0) {
            apiInstanceMock = mockedAxios.create.mock.results[0].value;
            apiInstanceMock.get.mockClear(); 
        } else {
            throw new Error("Axios create was not called. Check module loading order.");
        }
        
        process.env.VITE_USE_MOCK_API = 'false'; 
    });

    afterAll(() => {
        consoleWarnSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    test('debe obtener personajes correctamente, verificando URL, método GET y respuesta simulada', async () => {
        const page = 5;
        
        const mockAxiosResponse = {
            data: mockSuccessResponseData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        apiInstanceMock.get.mockResolvedValue(mockAxiosResponse);

        const result = await rickAndMortyApi.getCharacters(page);

        expect(apiInstanceMock.get).toHaveBeenCalledTimes(1);
        expect(apiInstanceMock.get).toHaveBeenCalledWith(
            '/character', 
            { params: { page: 5 } } 
        );
        expect(mockedMockApi.getCharacters).not.toHaveBeenCalled();
        expect(result).toEqual(mockSuccessResponseData);
    });

    test('debe manejar el fallo de la API real y hacer fallback a mockApi', async () => {
        const page = 1;
        const axiosError = new Error('Request failed with status code 404');
        
        apiInstanceMock.get.mockRejectedValue(axiosError);

        const result = await rickAndMortyApi.getCharacters(page);

        expect(apiInstanceMock.get).toHaveBeenCalledTimes(1); 
        expect(mockedMockApi.getCharacters).toHaveBeenCalledTimes(1); 
        expect(mockedMockApi.getCharacters).toHaveBeenCalledWith(page);

        expect(consoleWarnSpy).toHaveBeenCalledWith(
            'Real API failed, falling back to mock data:', 
            axiosError
        );

        expect(result).toEqual(mockFallbackData); 
    });
});