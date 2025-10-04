import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('Componente SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderizado', () => {
    it('debe renderizar el input de búsqueda con el placeholder correcto', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('placeholder', 'search.placeholder');
    });

    it('should render search button', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchButton = screen.getByRole('button', { name: /search\.button/i });
      expect(searchButton).toBeInTheDocument();
    });

    it('should not show clear button initially', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const clearButton = screen.queryByRole('button', { name: /search\.clear/i });
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should update input value when user types', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      
      await user.type(searchInput, 'Rick');
      
      expect(searchInput).toHaveValue('Rick');
    });

    it('should show clear button when input has value', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      
      await user.type(searchInput, 'Rick');
      
      const clearButton = screen.getByRole('button', { name: /search\.clear/i });
      expect(clearButton).toBeInTheDocument();
    });

    it('should call onSearch when form is submitted', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      const searchButton = screen.getByRole('button', { name: /search\.button/i });
      
      await user.type(searchInput, 'Rick Sanchez');
      await user.click(searchButton);
      
      expect(mockOnSearch).toHaveBeenCalledWith('Rick Sanchez');
    });

    it('should call onSearch when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      
      await user.type(searchInput, 'Morty Smith');
      await user.keyboard('{Enter}');
      
      expect(mockOnSearch).toHaveBeenCalledWith('Morty Smith');
    });

    it('should clear input and call onSearch with empty string when clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      
      // Type something first
      await user.type(searchInput, 'Test search');
      expect(searchInput).toHaveValue('Test search');
      
      // Click clear button
      const clearButton = screen.getByRole('button', { name: /search\.clear/i });
      await user.click(clearButton);
      
      expect(searchInput).toHaveValue('');
      expect(mockOnSearch).toHaveBeenCalledWith('');
    });

    it('should trim whitespace from search query', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      const searchButton = screen.getByRole('button', { name: /search\.button/i });
      
      await user.type(searchInput, '  Rick Sanchez  ');
      await user.click(searchButton);
      
      expect(mockOnSearch).toHaveBeenCalledWith('Rick Sanchez');
    });
  });

  describe('Loading State', () => {
    it('should disable input when loading', () => {
      render(<SearchBar onSearch={mockOnSearch} isLoading={true} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      expect(searchInput).toBeDisabled();
    });

    it('should disable search button when loading', () => {
      render(<SearchBar onSearch={mockOnSearch} isLoading={true} />);
      
      const searchButton = screen.getByRole('button', { name: /search\.button/i });
      expect(searchButton).toBeDisabled();
    });

    it('should not disable clear button when loading', async () => {
      const user = userEvent.setup();
      
      // First render without loading to add text
      const { rerender } = render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      await user.type(searchInput, 'test');
      
      // Then rerender with loading state
      rerender(<SearchBar onSearch={mockOnSearch} isLoading={true} />);
      
      const clearButton = screen.getByRole('button', { name: /search\.clear/i });
      expect(clearButton).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      expect(searchInput).toHaveAttribute('aria-label', 'search.placeholder');
    });

    it('should maintain focus management', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      
      await user.click(searchInput);
      expect(searchInput).toHaveFocus();
    });

    it('should support keyboard navigation for clear button', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByRole('textbox', { name: /search\.placeholder/i });
      
      await user.type(searchInput, 'test');
      
      const clearButton = screen.getByRole('button', { name: /search\.clear/i });
      
      await user.tab(); // Should focus the clear button
      expect(clearButton).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(searchInput).toHaveValue('');
      expect(mockOnSearch).toHaveBeenCalledWith('');
    });
  });
});