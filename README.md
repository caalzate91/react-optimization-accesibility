Reto tecnico - optimizacion, i18n (a11y) y pruebas con jest en react

a)  Identifica la imagen que más impacta el LCP de la vista inicial.
• Ejecutamos lighthouse
 ![Ejecucion lighthouse inicial](src/assets/img1.PNG)

• Identifica la imagen que más impacta el LCP de la vista inicial.
 ![Revisamos reporte de lighthouse](src/assets/img2.PNG)

• Revisamos la imagen que mas impacta en lighthouse
 ![Imagen identificada](src/assets/img3.PNG)

• Entramos al codigo donde esta la imagen
![Imagen identificada](src/assets/img4.PNG)

Cambiamos el codigo para imementar preload y srcset para darle una carga mas eficiente
![Imagen identificada](src/assets/img5.PNG)

Ejecutamos nuevamente Lighthouse
![Imagen identificada](src/assets/img6.PNG)

• Para imágenes no críticas, aplica lazy-load. Validamos las imágenes no criticas (En este caso las imagenes no criticas son las cartas)
![Imagen identificada](src/assets/img7.PNG)

Identificamos que las cartas ya tienen lazy-load
![Imagen identificada](src/assets/img8.PNG)

Revisamos el codigo para la imagen que tenemos en el footer
![Imagen identificada](src/assets/img9.PNG)

Aplicamos lazy-load
![Imagen identificada](src/assets/img10.PNG)

• Ejecutamos nuevamente Lighthouse
![Imagen identificada](src/assets/img11.PNG)

b) Ajusta la aplicación para que detecte el idioma y que se pueda cambiar a otro idioma 
usando react-i18next

Instalamos React-i18next
![Imagen identificada](src/assets/img12.PNG)

Creamos el archivo en la ruta SRC/i18n.ts para hacer las traducciones
![Imagen identificada](src/assets/img13.PNG)

Hacemos la traduccion de aquellos testos que se encuentran en la pagina tanto en ingles como en español
![Imagen identificada](src/assets/img14.PNG)

Creamos 2 botones en el App.tsx para poder cambiar entre idiomas
![Imagen identificada](src/assets/img15.PNG)

Miramos como se ve la pagina en ingles
![Imagen identificada](src/assets/img16.PNG)

Miramos como se ve la pagina en español
![Imagen identificada](src/assets/img17.PNG)

c) Pruebas con Jest:
- 1 Servicio con HTTP: caso de éxito (y opcional error) verificando método/URL y 
respuesta simulada. 
Instalamos Jest
![Imagen identificada](src/assets/img18.PNG)

Creamos el archivo jest.config 
![Imagen identificada](src/assets/img19.PNG)
Creamos el archivo setup.test
![Imagen identificada](src/assets/img20.PNG)

Creamos el archivo rickandmortyApi.test.ts
![Imagen identificada](src/assets/img21.PNG)

Añadimos el primer escenario para de exito
![Imagen identificada](src/assets/img22.PNG)

Añadimos el escenario opcional:
![Imagen identificada](src/assets/img23.PNG)

Ejecutamos npm test
![Imagen identificada](src/assets/img28.PNG)

- 2 Componente: interacción del usuario y verificación del DOM con selectores 
accesibles.  
Creamos el archivo SearchBar.test.tsx con la prueba debe obtener personajes correctamente, verificando URL, método GET y respuesta simulada
![Imagen identificada](src/assets/img24.PNG)

Ejecutamos npm test
![Imagen identificada](src/assets/img27.PNG)
- 3 Integración ligera: componente + servicio + HTTP mock. 
Creamos el archivo characterlist.integration.test.tsx
![Imagen identificada](src/assets/img25.PNG)
Ejecutamos npm test
![Imagen identificada](src/assets/img26.PNG)