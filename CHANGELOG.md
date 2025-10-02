# Cambios recientes

## Mejoras implementadas

- **Optimización de imágenes para LCP:**
  - Se agregó preload y srcSet a la imagen principal del header para mejorar el Largest Contentful Paint.
  - Se aplicó lazy-loading a la imagen del footer para optimizar la carga.
- **Internacionalización (i18n):**
  - Se instaló y configuró `react-i18next` e `i18next` para detección automática y cambio de idioma en la aplicación.
- **Pruebas unitarias y de integración:**
  - Se agregaron pruebas unitarias para servicios HTTP, componentes con interacción y accesibilidad, e integración ligera entre componentes y servicios usando mocks.
- **Gestión de cambios:**
  - Todos los cambios fueron integrados en la rama `feature/tests-i18n-optimizations`.
