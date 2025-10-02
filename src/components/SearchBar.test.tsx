import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar accessibility and interaction', () => {
  it('should call onSearch when user submits', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} isLoading={false} />);
    const input = screen.getByRole('textbox', { name: /search/i });
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.submit(input.form!);
    expect(onSearch).toHaveBeenCalledWith('Rick');
  });

  it('should have accessible label for input', () => {
    render(<SearchBar onSearch={() => {}} isLoading={false} />);
    const input = screen.getByRole('textbox', { name: /search/i });
    expect(input).toBeInTheDocument();
  });
});
