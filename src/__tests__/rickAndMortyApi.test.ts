/* eslint-disable @typescript-eslint/no-explicit-any */
// src/__tests__/rickAndMortyApi.test.ts
import axios from 'axios';

// 1) Mock de axios ANTES de importar el módulo bajo prueba
jest.mock('axios');
const mockAxiosCreate = axios.create as unknown as jest.Mock;

// helpers de este test
const mGet = jest.fn();

let rickAndMortyApi: any; // tipo simple para el test

beforeAll(async () => {
  // 2) Cuando rickAndMortyApi.ts haga axios.create(), devolvemos un cliente con interceptors
  mockAxiosCreate.mockReturnValue({
    get: mGet,
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  });

  // 3) Import dinámico DESPUÉS de preparar el mock
  ({ rickAndMortyApi } = await import('../services/rickAndMortyApi'));
});

beforeEach(() => {
  jest.clearAllMocks();
});

// Datos de ejemplo
const sample = {
  info: { count: 2, pages: 1, next: null, prev: null },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Citadel', url: '' },
      image: '',
      episode: [],
      url: '',
      created: '',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Citadel', url: '' },
      image: '',
      episode: [],
      url: '',
      created: '',
    },
  ],
};

describe('rickAndMortyApi (axios.create + interceptors)', () => {
  it('retorna datos cuando axios responde 200', async () => {
    mGet.mockResolvedValueOnce({ data: sample });

    const out = await rickAndMortyApi.getCharacters(1);

    expect(mGet).toHaveBeenCalledWith('/character', { params: { page: 1 } });
    expect(out.results.length).toBe(2);
    expect(out.results[0].name).toBe('Rick Sanchez');
  });

  it('si axios falla, hace fallback a mockApi.getCharacters', async () => {
    mGet.mockRejectedValueOnce(new Error('Boom'));

    const out = await rickAndMortyApi.getCharacters(1);

    // sólo verificamos que devolvió algo válido (mockApi fallback)
    expect(Array.isArray(out.results)).toBe(true);
  });
});
