import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import i18n from '../i18n';
import { act } from '@testing-library/react';

describe('i18n integration', () => {
  it('cambia el título al cambiar de idioma', async () => {
    // Forzamos a español antes del render
    await i18n.changeLanguage('es');

    render(<App />);

    // Ahora debería estar en español
    expect(
      await screen.findByRole('heading', { level: 1, name: /personajes de rick y morty/i })
    ).toBeInTheDocument();

    // Cambiamos a inglés y verificamos
    await act(async () => {
  await i18n.changeLanguage('en');
});
expect(
  await screen.findByRole('heading', { level: 1, name: /rick and morty characters/i })
).toBeInTheDocument();
  });
});