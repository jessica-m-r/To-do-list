# TO DO LIST / DRIVE
El proyecto utiliza Express como framework backend y Firebase Realtime Database como base de datos y React en el frontend para la interfaz de usuario
- **To do list**: Permite crear, leer, actualizar y eliminar tareas. 
- **Drive**: Permite subir, eliminar y descargar archivos. 
## REFERENCIAS
### Backend
- La arquitectura se basó en el modelo del tutorial de biblioteca virtual de MDN:
https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs
- Se utilizó IA como apoyo para la conexión con Firebase
- Para la autenticacion que se apoyo de la IA y documentacion para autenticacion con JWT [Node.js Express: JWT example](https://www.bezkoder.com/node-js-jwt-authentication-mysql/)
- Para cambiar de http a https se crearon certificados autofirmados y puede que salga con adventencia, pero solo aceptar para que muestre la pagina.
- El poblador para hacer pruebas fue generado netamente con IA.
#### To do list
- Se utilizó la IA como apoyo para saber como mandar y obtener los datos en firebase
- Para el uso de ETag con la paginación se apoyo de la IA para que funcione correctamente
#### Drive
- Documentacion de multer https://github.com/expressjs/multer/blob/main/doc/README-es.md
- Para subir archivos se utilizo los siguientes videos tutoriales:4
  - [SUBIR ARCHIVOS con EXPRESS JS y MULTER](https://youtu.be/wsn6PyQLtfY?si=PnvUow2Qk9mWxITg)
  - [De principiante a experto con Multer: gestión completa de archivos en tu servidor](https://youtu.be/2QYwRishObs?si=rGWaeyfla-RDvp2V)
- Para descargar archivos se uso como referencia el siguiente video, tiempo 6:40 min
    [Manejo de Archivos -Proyecto NodeJS | JL](https://youtu.be/gkNbViqCVsI?si=BOvOpyzQQ7urf__Z)

### Frontend
- Se utilizó la IA para configurar la conexión entre el Frontend y el Backend en el archivo vite.config.js.
- Se utilizó la IA para actualizar dinámicamente la lista de tareas y gestionar la recarga de datos en App.jsx.
- Se utilizó la IA para configurar el envío de datos en formato JSON mediante los headers definidos en taskService.js.
- Se utilizó la IA para implementar el manejo de eventos asociados a las operaciones de crear, editar y eliminar tareas en como en el componente de taskItem.
- Se utilizó IA para implementar la autenticación y permitir el acceso a los módulos de Drive y To Do List.
- También se utilizó en la integración de subida y descarga de archivos, facilitando la correcta conexión entre el frontend y los endpoints del backend.
- Se utilizo la IA para poder mostrar correctamente con paginacion lo que es la lista de tareas.

## Certificado SSL (desarrollo local)
Para la parte de cambio de http a https se generaron certificados SSL autofirmados.  
Para que funcione solo se debe generar una vez los certificados key.pem y cert.pem en la raiz de la carpeta Backend, copiar y pegar ese certificado en la raiz de la carpeta del Frontend.
```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
``` 
## BACKEND
### Tecnologías utilizadas
- **Node.js**:entorno de ejecución de JavaScript
- **Express**:framework para la creación de la API REST
- **Firebase Realtime Database**:base de datos en tiempo real de Google
- **firebase-admin**:SDK de Firebase para Node.js
- **dotenv**:manejo de variables de entorno
- **nodemon**:recarga automática del servidor en desarrollo
- **multer**: middleware para la recepción y gestión de archivos
### Requisitos previos
- Node.js instalado (v18 o superior)
- Cuenta en [Firebase](https://firebase.google.com/) crea un proyecto en firebase
- Realtime Database habilitada en el proyecto de Firebase
### Instalación
1. Clona el repositorio:
    ```
    git clone <url-del-repositorio>
    cd <nombre-del-proyecto>
    ```
2. Instala las dependencias:
    ```
    npm install
    ```
3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
    FIREBASE_DATABASE_URL=https://<tu-proyecto>.firebaseio.com   

    JWT_SECRET=tu_clave_secreta
```
4. Descarga el archivo de credenciales de Firebase:
    - Ve a tu proyecto en Firebase → Configuración del proyecto → Cuentas de servicio
    - Genera una nueva clave privada y descarga el archivo JSON
    - Colócalo en la carpeta `firebase/` y asegúrate de que el nombre coincida con el que se importa en el código en este caso `firebase-to-do-list.json`
5. Ejecutar el comando de abajo en la raiz del Backend para poblar tu base de datos.
```
node seed.js
```
EL usuario que creara es:
- gmail: prueba@gmail.com
- usuario: prueba
- contraseña: 1234  
En la pagina principal se debe agregar el gmail y la contraseña  
6. Inicia el servidor en desarrollo:
    ```
    npx nodemon
    ```
El servidor corre por defecto en `https://localhost:3000`.

## FRONTEND
### Tecnologías utilizadas
- **React** – Biblioteca para interfaces de usuario
- **Vite** – Empaquetador rápido y entorno de desarrollo
- **Fetch API** – Comunicación con el backend (sin dependencias extra)
### Requisitos previos
- Node.js (v18 o superior)
- Backend ejecutándose en `https://localhost:3000`
- Instalar las dependencias del package.json
```
npm install
```
- Ejecutar con el comando de abajo y correra en `https://localhost:5173/`
```
npm run dev
```

### Funcionalidades implementadas
- Autenticación – Registro e inicio de sesión con email, contraseña y nombre. El token JWT se almacena en localStorage.
- Gestión de tareas – Crear, listar, editar, completar y eliminar tareas. Cada tarea tiene título, descripción y estado.
- Drive de archivos – Subir archivos (cualquier tipo), listar los archivos subidos, eliminarlos y descargarlos.