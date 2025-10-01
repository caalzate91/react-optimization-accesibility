import { render, screen, fireEvent } from '@testing-library/react';
import '../i18n'; // importante: incluye tu setup i18n real
import LanguageSwitcher from '../components/LanguageSwitcher';

describe('LanguageSwitcher', () => {
  it('tiene un combobox accesible y cambia el idioma', () => {
    render(<LanguageSwitcher />);

    const combo = screen.getByRole('combobox', { name: /cambiar idioma|change language/i });
    expect(combo).toBeInTheDocument();

    fireEvent.change(combo, { target: { value: 'en' } });
    expect((combo as HTMLSelectElement).value).toBe('en');
  });
});
