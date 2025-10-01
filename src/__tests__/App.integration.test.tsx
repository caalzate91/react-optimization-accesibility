import { render, screen, waitFor } from '@testing-library/react';
import '../i18n';
import App from '../App';

// Mock del módulo entero: substituye las funciones por jest.fn()
jest.mock('../services/rickAndMortyApi', () => {
  const sample = {
    info: { count: 2, pages: 1, next: null, prev: null },
    results: [
      { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Citadel', url: '' }, image: '', episode: [], url: '', created: '' },
      { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Citadel', url: '' }, image: '', episode: [], url: '', created: '' },
    ],
  };

  return {
    rickAndMortyApi: {
      getCharacters: jest.fn().mockResolvedValue(sample),
      searchCharacters: jest.fn().mockResolvedValue(sample),
      getCharacter: jest.fn(),
    },
  };
});

describe('App (integración ligera)', () => {
  it('muestra la lista de personajes con datos del api mockeado', async () => {
    render(<App />);

    // el grid/lista tiene aria-label en App.tsx
    const list = await screen.findByRole('list', { name: /characters list/i });
    expect(list).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeVisible();
      expect(screen.getByText('Morty Smith')).toBeVisible();
    });
  });
});
