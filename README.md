# TO DO LIST API
El proyecto permite crear, leer, actualizar y eliminar tareas. Utiliza Express como framework backend y Firebase Realtime Database como base de datos en tiempo real, sin necesidad de un servidor de base de datos propio.
## BACKEND
### Tecnologías utilizadas
- **Node.js**:entorno de ejecución de JavaScript
- **Express**:framework para la creación de la API REST
- **Firebase Realtime Database**:base de datos en tiempo real de Google
- **firebase-admin**:SDK de Firebase para Node.js
- **dotenv**:manejo de variables de entorno
- **nodemon**:recarga automática del servidor en desarrollo

### Requisitos previos
- Node.js instalado (v18 o superior)
- Cuenta en [Firebase](https://firebase.google.com/) con un proyecto creado
- Realtime Database habilitada en el proyecto de Firebase
### Instalación
1. Clona el repositorio:
    ```bash
    git clone <url-del-repositorio>
    cd <nombre-del-proyecto>
    ```
2. Instala las dependencias:
    ```bash
    npm install express morgan firebase-admin dotenv
    ```
3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
    ```env
    FIREBASE_DATABASE_URL=https://<tu-proyecto>.firebaseio.com
    ```
4. Descarga el archivo de credenciales de Firebase:
    - Ve a tu proyecto en Firebase → Configuración del proyecto → Cuentas de servicio
    - Genera una nueva clave privada y descarga el archivo JSON
    - Colócalo en la carpeta `firebase/` y asegúrate de que el nombre coincida con el que se importa en el código
    - Agrega ese archivo al `.gitignore` para no exponerlo
5. Inicia el servidor en desarrollo:
    ```bash
    npm run dev
    ```
El servidor corre por defecto en `http://localhost:3000`.

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/tasks` | Obtener todas las tareas |
| POST | `/tasks` | Crear una nueva tarea |
| GET | `/tasks/:id` | Obtener una tarea por ID |
| PUT | `/tasks/:id` | Actualizar título o descripción |
| PATCH | `/tasks/:id` | Marcar tarea como completada |
| DELETE | `/tasks/:id` | Eliminar una tarea |

### Notas

- La arquitectura se basó en el modelo del tutorial de biblioteca virtual de MDN:
https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs
- Se utilizó IA como apoyo para la conexión con Firebase y el acceso a los datos desde firebase-admin.
---

## FRONTEND

> Próximamente.