
import axios from 'axios';
import { rickAndMortyApi } from '../services/rickAndMortyApi';

jest.mock('axios');

describe('Servicio RickAndMortyApi', () => {
  afterEach(() => jest.clearAllMocks());

  it('caso de éxito: retorna personajes', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { results: [{ id: 1, name: 'Rick Sanchez', image: 'rick.png' }] } });
    const data = await rickAndMortyApi.getCharacters(1);
    expect(data.results[0].name).toBe('Rick Sanchez');
  });

  it('caso de error: retorna error', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));
    await expect(rickAndMortyApi.getCharacters(1)).resolves.toBeDefined(); // Si tienes fallback al mockApi
  });
});
