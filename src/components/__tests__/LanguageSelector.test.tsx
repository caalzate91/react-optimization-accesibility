import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const mockUseTranslation = useTranslation as jest.Mock;

describe('LanguageSelector', () => {
  const mockChangeLanguage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (language: string) => {
    mockUseTranslation.mockReturnValue({
      i18n: {
        changeLanguage: mockChangeLanguage,
        language: language,
      },
    });
    return render(<LanguageSelector />);
  };

  it('should render both language buttons', () => {
    renderComponent('en');

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
  });

  it('should correctly identify English as the active language', () => {
    renderComponent('en');

    const englishButton = screen.getByText('English');
    const spanishButton = screen.getByText('Español');

    expect(englishButton).toBeDisabled();
    expect(englishButton).toHaveAttribute('aria-current', 'true');
    expect(spanishButton).not.toBeDisabled();
    expect(spanishButton).toHaveAttribute('aria-current', 'false');
  });

  it('should correctly identify Spanish as the active language', () => {
    renderComponent('es');

    const englishButton = screen.getByText('English');
    const spanishButton = screen.getByText('Español');

    expect(spanishButton).toBeDisabled();
    expect(spanishButton).toHaveAttribute('aria-current', 'true');
    expect(englishButton).not.toBeDisabled();
    expect(englishButton).toHaveAttribute('aria-current', 'false');
  });

  it('should call changeLanguage with "es" when the Spanish button is clicked', () => {
    renderComponent('en');
    const spanishButton = screen.getByText('Español');

    fireEvent.click(spanishButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
  });

  it('should call changeLanguage with "en" when the English button is clicked', () => {
    renderComponent('es');
    const englishButton = screen.getByText('English');

    fireEvent.click(englishButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
  });

  it('should not call changeLanguage if the active language button is clicked', () => {
    renderComponent('en');
    const englishButton = screen.getByText('English');

    fireEvent.click(englishButton);
    
    expect(mockChangeLanguage).not.toHaveBeenCalled();
  });
});
