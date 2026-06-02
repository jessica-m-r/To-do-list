# TO DO LIST / DRIVE
El proyecto utiliza Express como framework backend y Firebase Realtime Database como base de datos y React en el frontend para la interfaz de usuario
- **To do list**: Permite crear, leer, actualizar y eliminar tareas. 
- **Drive**: Permite subir, eliminar y descargar archivos. 
## REFERENCIAS
### Backend
- La arquitectura se basó en el modelo del tutorial de biblioteca virtual de MDN:
https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs
- Se utilizó IA como apoyo para la conexión con Firebase
#### To do list
- Se utilizó la IA como apoyo para saber como mandar y obtener los datos en firebase
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
- Cuenta en [Firebase](https://firebase.google.com/) con un proyecto creado
- Realtime Database habilitada en el proyecto de Firebase
### Instalación
1. Clona el repositorio:
    ```
    git clone <url-del-repositorio>
    cd <nombre-del-proyecto>
    ```
2. Instala las dependencias:
    ```
    npm install express morgan firebase-admin dotenv
    ```
3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
    ```
    FIREBASE_DATABASE_URL=https://<tu-proyecto>.firebaseio.com
    ```
4. Descarga el archivo de credenciales de Firebase:
    - Ve a tu proyecto en Firebase → Configuración del proyecto → Cuentas de servicio
    - Genera una nueva clave privada y descarga el archivo JSON
    - Colócalo en la carpeta `firebase/` y asegúrate de que el nombre coincida con el que se importa en el código
    - Agrega ese archivo al `.gitignore` para no exponerlo
5. Inicia el servidor en desarrollo:
    ```
    npx nodemon
    ```
El servidor corre por defecto en `http://localhost:3000`.

## FRONTEND

