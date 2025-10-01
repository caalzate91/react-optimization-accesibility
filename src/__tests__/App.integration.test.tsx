import { render, screen } from '@testing-library/react';
import axios from 'axios';
jest.mock('axios');
import App from '../App';

test('integración: muestra personaje desde servicio mockeado', async () => {
  (axios.get as jest.Mock).mockResolvedValue({ data: { results: [{ id: 1, name: 'Rick Sanchez', image: 'rick.png' }] } });
  render(<App />);
  const card = await screen.findByRole('heading', { name: /Rick Sanchez/i });
  expect(card).toBeInTheDocument();
});
