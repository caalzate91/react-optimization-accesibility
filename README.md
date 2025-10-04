# Rick and Morty Character Explorer# React + TypeScript + Vite



Una aplicación React optimizada para rendimiento y accesibilidad que explora personajes del universo de Rick y Morty.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## 🚀 Características ImplementadasCurrently, two official plugins are available:



### A) Optimización de Imágenes para LCP- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh

- **Imagen crítica identificada**: Header background (o6cwlzg3exk41.png)- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Optimizaciones aplicadas**:

  - `preload` en HTML para la imagen crítica del header## Expanding the ESLint configuration

  - `fetchPriority="high"` para priorizar la carga

  - `loading="eager"` para carga inmediataIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

  - `loading="lazy"` en CharacterCard para imágenes no críticas

  - `loading="lazy"` en footer para imagen decorativa```js

export default defineConfig([

### B) Internacionalización con react-i18next  globalIgnores(['dist']),

- **Detección automática** de idioma del navegador  {

- **Selector de idioma** accesible en el header    files: ['**/*.{ts,tsx}'],

- **Traducciones completas** para Español e Inglés    extends: [

- **Persistencia** del idioma seleccionado en localStorage      // Other configs...

- **Componentes totalmente traducidos**:

  - App.tsx (títulos, mensajes de error, footer)      // Remove tseslint.configs.recommended and replace with this

  - SearchBar.tsx (placeholder, botones)      tseslint.configs.recommendedTypeChecked,

  - CharacterCard.tsx (etiquetas de información)      // Alternatively, use this for stricter rules

  - Pagination.tsx (botones navegación)      tseslint.configs.strictTypeChecked,

  - LoadingSpinner.tsx (mensaje de carga)      // Optionally, add this for stylistic rules

      tseslint.configs.stylisticTypeChecked,

### C) Testing con Jest

Se implementaron **3 suites de pruebas**:      // Other configs...

    ],

#### 1. Prueba de Servicio HTTP (`rickAndMortyApi.test.ts`)    languageOptions: {

- ✅ Casos de éxito con respuesta simulada      parserOptions: {

- ✅ Manejo de errores con fallback a mock data        project: ['./tsconfig.node.json', './tsconfig.app.json'],

- ✅ Verificación de métodos/URLs correctas        tsconfigRootDir: import.meta.dirname,

- ✅ Parámetros de búsqueda y paginación      },

      // other options...

#### 2. Prueba de Componente (`SearchBar.test.tsx`)    },

- ✅ Renderizado correcto con traducciones  },

- ✅ Interacciones del usuario (escritura, click, Enter)])

- ✅ Verificación del DOM con selectores accesibles```

- ✅ Estados de carga y deshabilitación

- ✅ Navegación por teclado y ARIA labelsYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:



#### 3. Prueba de Integración (`App.integration.test.tsx`)```js

- ✅ Componente + servicio + HTTP mock// eslint.config.js

- ✅ Flujo completo de búsquedaimport reactX from 'eslint-plugin-react-x'

- ✅ Cambio de idioma integradoimport reactDom from 'eslint-plugin-react-dom'

- ✅ Manejo de errores end-to-end

export default defineConfig([

## 🛠️ Tecnologías Utilizadas  globalIgnores(['dist']),

- **React 19** con TypeScript  {

- **Vite** para desarrollo y build    files: ['**/*.{ts,tsx}'],

- **Tailwind CSS** para estilos    extends: [

- **react-i18next** para internacionalización      // Other configs...

- **Axios** para peticiones HTTP      // Enable lint rules for React

- **Jest + React Testing Library** para testing      reactX.configs['recommended-typescript'],

      // Enable lint rules for React DOM

## 🎯 Optimizaciones de Rendimiento      reactDom.configs.recommended,

    ],

### Imágenes    languageOptions: {

```html      parserOptions: {

<!-- Preload de imagen crítica -->        project: ['./tsconfig.node.json', './tsconfig.app.json'],

<link rel="preload" as="image" href="/src/assets/o6cwlzg3exk41.png" fetchpriority="high" />        tsconfigRootDir: import.meta.dirname,

      },

<!-- Imagen crítica optimizada -->      // other options...

<img     },

  src={headerImage}   },

  alt="Rick and Morty multiverse background"])

  loading="eager"```

  fetchPriority="high"
  decoding="async"
/>

<!-- Imágenes no críticas con lazy loading -->
<img 
  src={character.image}
  alt={`${character.name} - ${character.species}`}
  loading="lazy"
/>
```

### Estructura de i18n
```typescript
// Configuración automática de idioma
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });
```

## 🧪 Ejecutar Pruebas

```bash
# Todas las pruebas
npm test

# Solo SearchBar
npm test -- --testPathPatterns="SearchBar.test.tsx"

# Con coverage
npm run test:coverage
```

## 🌐 Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Testing
npm test
npm run test:watch
npm run test:coverage

# Linting
npm run lint
```

## 🔧 Configuración de Testing

- **Jest** configurado con TypeScript
- **React Testing Library** para testing de componentes
- **axios-mock-adapter** para mock de HTTP
- **@testing-library/jest-dom** para assertions extendidas

## 📈 Métricas de Rendimiento

### Antes de Optimizaciones
- LCP impactado por imagen grande del header sin optimizar
- Imágenes de personajes cargando inmediatamente

### Después de Optimizaciones
- ✅ Preload de imagen crítica
- ✅ Lazy loading de imágenes no críticas
- ✅ Mejora en First Contentful Paint
- ✅ Reducción en tiempo de carga inicial

## 🌍 Accesibilidad

- **ARIA labels** en todos los controles
- **Navegación por teclado** completa
- **Selector de idioma** accesible
- **Mensajes de estado** con `aria-live`
- **Contraste adecuado** en todos los elementos
- **Etiquetas semánticas** (form, button, select)

## 📱 Características de UX

- **Detección automática** de idioma del sistema
- **Persistencia** de preferencia de idioma
- **Feedback visual** en estados de carga
- **Limpieza rápida** de búsqueda con botón X
- **Navegación intuitiva** con paginación

---

**Desarrollado por**: Kate Zuleta  
**Fecha**: Octubre 2024  
**Curso**: L3 Optimización React