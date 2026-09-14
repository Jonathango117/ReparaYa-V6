Repara Ya
Proyecto Integrador — Avance 1: Arquitectura, Maquetación y Validación
Repara Ya es un servicio técnico especializado en la reparación de celulares, tablets y computadores.

La aplicación web permite que los clientes consulten los servicios disponibles y soliciten una cita de diagnóstico. Además, contempla un módulo administrativo para que el técnico o administrador pueda gestionar las solicitudes y órdenes de servicio.

Este primer avance contempla tres aspectos principales:

Definición de la arquitectura del sistema utilizando el estándar C4, niveles 1 y 2.
Maquetación de tres vistas principales utilizando HTML5 semántico y CSS3 puro.
Validación del formulario mediante JavaScript puro, sin utilizar librerías externas.
1. Arquitectura propuesta — Modelo C4
La arquitectura se presenta mediante dos niveles del modelo C4:

Nivel 1: Diagrama de contexto.
Nivel 2: Diagrama de contenedores.
1.1 Nivel 1 — Diagrama de contexto
El diagrama de contexto representa a Repara Ya como sistema principal y muestra los actores externos que interactúan con él.

Actores
Cliente: persona que necesita reparar un celular, tablet o computador.
Técnico / Administrador: encargado de revisar y gestionar las citas y órdenes de servicio.
Servicio de correo: sistema externo utilizado para enviar confirmaciones y notificaciones.
Funcionamiento general
El cliente utiliza Repara Ya para consultar los servicios disponibles y agendar citas. El técnico o administrador utiliza el sistema para gestionar las citas y las órdenes de servicio.

A su vez, Repara Ya se comunica con un servicio externo de correo para enviar las notificaciones correspondientes.

1.2 Nivel 2 — Diagrama de contenedores
El segundo nivel del modelo C4 presenta los principales bloques técnicos que conforman el sistema.

Contenedores principales
Frontend Web: interfaz utilizada por clientes y administradores.
API Backend: responsable de procesar las solicitudes y exponer los servicios de la aplicación.
Base de datos: almacena la información de clientes, citas, dispositivos y órdenes de servicio.
Servicio de correo: encargado del envío de notificaciones.
Comunicación entre componentes
El cliente y el administrador acceden al Frontend Web mediante HTTPS.

El frontend consume la API REST del backend, utilizando HTTPS y JSON.

El backend se comunica con la base de datos PostgreSQL mediante SQL sobre TCP para almacenar y consultar información.

Finalmente, el backend se conecta con el servicio de correo mediante una API o SMTP para enviar las notificaciones.

2. Componentes y tecnologías por capa
Capa	Componente	Tecnología propuesta	Comunicación
Cliente	Frontend Web	HTML5, CSS3, JavaScript y migración futura a React	HTTPS
Servidor	API Backend	Node.js + Express. Alternativa: Django + DRF	HTTP/HTTPS y JSON
Datos	Base de datos	PostgreSQL	SQL/TCP
Externo	Notificaciones	Servicio de correo, por ejemplo SendGrid	API/SMTP

En esta primera entrega solamente se implementó la capa de frontend.

El backend y la base de datos se encuentran definidos dentro de la arquitectura propuesta, pero su implementación se realizará en las siguientes entregas.

3. Maquetación de las vistas
Se desarrollaron tres vistas principales para la aplicación web.

Todas las vistas utilizan HTML5 semántico y CSS3 puro, sin frameworks de estilos.

La interfaz es responsive y está diseñada para adaptarse a:

Computadores de escritorio.
Tablets.
Dispositivos móviles.
Para la distribución de los elementos se utilizan principalmente CSS Grid y Flexbox, junto con media queries.

3.1 Vista de inicio
Archivo: index.html

La página principal contiene:

Hero principal con la propuesta de valor de Repara Ya.
Categorías de reparación.
Información general de los servicios.
Proceso de atención del taller explicado en cuatro pasos.
Su objetivo es presentar el servicio y orientar al usuario hacia la consulta de servicios o la solicitud de una cita.

3.2 Vista de servicios
Archivo: servicios.html

Esta vista presenta los servicios disponibles para los clientes.

Incluye:

Tabla de precios para reparaciones de celulares.
Tarjetas de servicios para tablets.
Tarjetas de servicios para computadores.
La información está organizada para facilitar la consulta de los diferentes tipos de reparación.

3.3 Vista de agendamiento
Archivo: agendar.html

Esta página contiene el formulario mediante el cual el cliente puede solicitar una cita de diagnóstico.

El formulario solicita información como:

Nombre del cliente.
Correo electrónico.
Número de teléfono.
Tipo de dispositivo.
Descripción de la falla.
La información ingresada es validada mediante JavaScript antes de ser enviada.

4. Diseño responsive
El diseño utiliza dos puntos de quiebre principales:

900 px: adaptación para tablets y pantallas medianas.
640 px: adaptación para dispositivos móviles.
Estas reglas se encuentran definidas en:

css/style.css

El diseño responsive permite reorganizar los elementos de la interfaz dependiendo del tamaño de la pantalla, manteniendo una navegación y visualización adecuada.

5. Validación mediante JavaScript
El formulario de Agendar cita cuenta con validación realizada completamente en el navegador.

No se utilizan librerías externas para esta funcionalidad.

5.1 Campos obligatorios
Los siguientes campos son requeridos:

Nombre.
Correo electrónico.
Teléfono.
Tipo de dispositivo.
Descripción de la falla.
Si alguno de estos campos se encuentra vacío, se muestra un mensaje de error específico.

5.2 Validación del correo electrónico
Se utiliza una expresión regular para comprobar que el correo tenga un formato válido, siguiendo una estructura similar a:

usuario@dominio.ext

5.3 Validación del teléfono
El número de teléfono debe:

Contener únicamente dígitos.
Tener entre 7 y 10 caracteres.
5.4 Longitud mínima
También se establecen longitudes mínimas para determinados campos:

Nombre: mínimo 3 caracteres.
Descripción de la falla: mínimo 10 caracteres.
5.5 Mensajes de error
Cada campo cuenta con mensajes de error específicos.

Estos mensajes aparecen debajo del campo correspondiente para indicar al usuario qué debe corregir.

5.6 Eventos utilizados
La validación utiliza los siguientes eventos de JavaScript:

submit: valida todo el formulario y evita su envío cuando existen errores.
blur: valida el campo cuando el usuario sale de él.
input: elimina o actualiza el mensaje de error mientras el usuario corrige la información.
Cuando todos los datos son válidos:

Se muestra un mensaje de confirmación.
El formulario se reinicia.
La lógica de validación se encuentra en:

js/validation.js

El menú móvil, que funciona de manera independiente a la validación del formulario, se encuentra en:

js/main.js

6. Estructura del repositorio
repara-ya/
├── index.html
├── servicios.html
├── agendar.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── validation.js
├── assets/
│   └── logo.png
└── README.md

Descripción de los archivos principales
index.html: página principal del proyecto.
servicios.html: página donde se presentan los servicios.
agendar.html: formulario para solicitar una cita.
css/style.css: estilos generales y diseño responsive.
js/main.js: funcionamiento del menú móvil.
js/validation.js: validación del formulario.
assets/logo.png: logotipo utilizado en la aplicación.
README.md: documentación del proyecto.
7. Instrucciones de uso
Para ejecutar el proyecto se deben seguir los siguientes pasos:

Clonar o descargar el repositorio.
Abrir la carpeta del proyecto.
Abrir el archivo index.html en un navegador.
Navegar entre las diferentes páginas utilizando el menú superior.
Ingresar a agendar.html para probar el formulario.
No es necesario instalar dependencias ni configurar un servidor para ejecutar esta primera versión.

Como alternativa, se recomienda utilizar la extensión Live Server de Visual Studio Code para obtener recarga automática durante el desarrollo.

8. Pruebas del formulario
Para comprobar el funcionamiento de la validación se pueden realizar dos pruebas principales.

Prueba 1 — Formulario vacío
Enviar el formulario sin completar ningún campo.

Resultado esperado: el sistema debe mostrar los mensajes de error correspondientes a los campos obligatorios.

Prueba 2 — Información válida
Completar todos los campos utilizando información que cumpla las condiciones establecidas.

Resultado esperado: el sistema debe mostrar un mensaje de confirmación y reiniciar el formulario.
