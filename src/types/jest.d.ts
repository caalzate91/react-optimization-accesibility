// src/types/jest.d.ts
import '@testing-library/jest-dom';

export {}; // 👈 Esto es clave para evitar conflictos de ámbito

declare global {
  namespace jest {
    interface Mock {
      mockResolvedValue: (value: any) => Mock;
      mockRejectedValue: (value: any) => Mock;
      mockReturnValue: (value: any) => Mock;
      mockClear: () => void;
    }
  }
}