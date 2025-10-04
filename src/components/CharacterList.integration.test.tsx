// src/tests/CharacterList.integration.test.tsx

import { render, screen } from '@testing-library/react';
import React from 'react';

import CharacterList from '../components/CharacterList'; 
import * as RickAndMortyService from '../services/rickAndMortyApi'; 

// --- Configuración del HTTP Mock (Datos de Respuesta) ---
const mockCharacterData = {
  info: { pages: 1, count: 2 },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: 'rick.jpg',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      image: 'morty.jpg',
    },
  ],
};

// Creamos un "espía" (spy) sobre la función getCharacters del servicio.
const getCharactersSpy = jest.spyOn(RickAndMortyService, 'getCharacters');


describe('Integración Ligera: Componente + Servicio + HTTP Mock con Jest', () => {
  
  beforeEach(() => {
    // Control del Servicio: Configuramos el Spy para que devuelva los datos simulados.
    getCharactersSpy.mockResolvedValue(mockCharacterData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('debe llamar al servicio y renderizar los datos mockeados en el DOM', async () => {
    render(<CharacterList />);

    // Verificación del Servicio
    expect(getCharactersSpy).toHaveBeenCalledTimes(1);
    expect(getCharactersSpy).toHaveBeenCalledWith(1); 

    // El componente inicialmente muestra carga
    expect(screen.getByText(/cargando.../i)).toBeInTheDocument(); 

    // Verificación del DOM (RTL) - Esperamos que los datos aparezcan
    const rickName = await screen.findByText('Rick Sanchez');
    const mortyName = await screen.findByText('Morty Smith');

    expect(rickName).toBeInTheDocument();
    expect(mortyName).toBeInTheDocument();
    
    // Verificamos accesibilidad de imágenes
    expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toBeInTheDocument();
    
    // Verificamos que la carga ha desaparecido
    expect(screen.queryByText(/cargando.../i)).not.toBeInTheDocument();
  });
});