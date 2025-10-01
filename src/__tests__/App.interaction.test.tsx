import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
jest.mock('axios');
import App from '../App';

test('interacción: búsqueda y verificación accesible', async () => {
  (axios.get as jest.Mock).mockResolvedValue({ data: { results: [{ id: 1, name: 'Rick Sanchez', image: 'rick.png' }] } });
  render(<App />);
  // Busca el input por su label accesible
  const searchInput = screen.getByLabelText(/search/i);
  fireEvent.change(searchInput, { target: { value: 'Rick' } });
  fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
  // Espera a que aparezca el personaje
  const card = await screen.findByRole('heading', { name: /Rick Sanchez/i });
  expect(card).toBeInTheDocument();
});
