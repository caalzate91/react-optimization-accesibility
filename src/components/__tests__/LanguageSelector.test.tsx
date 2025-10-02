import { render, fireEvent } from '@testing-library/react';
import LanguageSelector from '../LanguageSelector';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

describe('LanguageSelector', () => {
  it('should change the language to English', () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    fireEvent.click(getByText('English'));
    expect(i18n.language).toBe('en');
  });

  it('should change the language to Spanish', () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    fireEvent.click(getByText('Español'));
    expect(i18n.language).toBe('es');
  });
});
