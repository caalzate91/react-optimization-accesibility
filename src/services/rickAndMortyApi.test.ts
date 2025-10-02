import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fetchCharacter } from '../services/rickAndMortyApi';

describe('rickAndMortyApi service', () => {
  const server = setupServer(
    rest.get('https://rickandmortyapi.com/api/character/1', (req, res, ctx) => {
      return res(ctx.json({ id: 1, name: 'Rick Sanchez' }));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should call correct URL and return mocked response', async () => {
    const character = await fetchCharacter(1);
    expect(character).toEqual({ id: 1, name: 'Rick Sanchez' });
  });
});
