import { rickAndMortyApi, api } from '../rickAndMortyApi';
jest.mock('../mockApi', () => ({
  mockApi: {
    getCharacters: jest.fn(),
    searchCharacters: jest.fn(),
  },
}));
// Usa require para obtener el mock real
const { mockApi } = require('../mockApi');

const character = {
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
  created: '2017-11-04T18:48:46.250Z'
};

describe('rickAndMortyApi.getCharacter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.VITE_USE_MOCK_API;
  });

  it('should return character from mockApi when shouldUseMockApi is true', async () => {
    process.env.VITE_USE_MOCK_API = 'true';
    (mockApi.getCharacters as jest.Mock).mockResolvedValue({ results: [character] });

    const result = await rickAndMortyApi.getCharacter(1);
    expect(result).toEqual(character);
    expect(mockApi.getCharacters).toHaveBeenCalledWith(1);
  });
  it('should return character from real API when shouldUseMockApi is false', async () => {
    process.env.VITE_USE_MOCK_API = 'false';
    jest.spyOn(api, 'get').mockResolvedValue({ data: character });
    const result = await rickAndMortyApi.getCharacter(1);
    expect(result).toEqual(character);
    expect(api.get).toHaveBeenCalledWith(`/character/1`);
  });
  it('should fallback to mockApi if real API fails', async () => {
    process.env.VITE_USE_MOCK_API = 'false';
    jest.spyOn(api, 'get').mockRejectedValue(new Error('API error'));
    (mockApi.getCharacters as jest.Mock).mockResolvedValue({ results: [character] });

    const result = await rickAndMortyApi.getCharacter(1);
    expect(result).toEqual(character);
    expect(mockApi.getCharacters).toHaveBeenCalledWith(1);
  });

  it('should throw error if character not found in mockApi', async () => {
    process.env.VITE_USE_MOCK_API = 'true';
    (mockApi.getCharacters as jest.Mock).mockResolvedValue({ results: [] });

    await expect(rickAndMortyApi.getCharacter(999)).rejects.toThrow('Character 999 not found');
  });
});