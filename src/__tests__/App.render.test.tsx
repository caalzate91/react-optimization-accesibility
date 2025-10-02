import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main title', () => {
    render(<App />);
    expect(screen.getByText(/Rick and Morty Characters/i)).toBeInTheDocument();
  });
});
