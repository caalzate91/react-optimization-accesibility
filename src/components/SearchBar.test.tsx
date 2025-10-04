// src/components/SearchBar.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SearchBar from './SearchBar'; // Importamos el componente de tu estructura

describe('SearchBar: Interacción y Selectores Accesibles', () => {
  const user = userEvent.setup();
  
  // 1. Mock de la función de callback que debe ser llamada al buscar
  const mockOnSearch = jest.fn();

  test('debe llamar a la función onSearch con el término correcto al hacer clic en el botón', async () => {
    // 2. Renderizamos el componente, pasándole la función mock
    render(<SearchBar onSearch={mockOnSearch} />); 

    // 3. Identificación del DOM con Selectores Accesibles

    // Usamos ByRole para el campo de texto. Si no tiene 'name' o 'aria-label', 
    // se podría usar ByPlaceholderText, pero ByRole es más robusto si el componente está bien construido.
    const searchInput = screen.getByRole('textbox', { 
        name: /nombre del personaje/i // Asume que el input tiene un label asociado
    }); 
    
    // Identificar el botón por su Rol y el nombre visible (texto)
    const searchButton = screen.getByRole('button', { name: /buscar/i }); 
    
    
    // 4. Simulación de Interacción del Usuario
    
    const searchTerm = 'Morty';
    
    // Escribir el término de búsqueda
    await user.type(searchInput, searchTerm); 
    
    // Simular el clic en el botón
    await user.click(searchButton);
    
    
    // 5. Verificación del Comportamiento (Lógica de la API)
    
    // Verificamos que la función de callback fue llamada
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    
    // Verificamos que fue llamada con el término de búsqueda correcto
    expect(mockOnSearch).toHaveBeenCalledWith(searchTerm);
  });
  
  test('el botón de búsqueda debe estar deshabilitado inicialmente si el campo está vacío', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    
    // Verificación de Estado
    expect(searchButton).toBeDisabled();
  });
});