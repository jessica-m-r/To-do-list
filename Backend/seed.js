const admin = require("firebase-admin");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const serviceAccount = require("./firebase/firebase-to-do-list.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database();

const tareas = [
    { titulo: "Comprar víveres", descripcion: "Leche, huevos, pan y frutas", completado: false },
    { titulo: "Hacer ejercicio", descripcion: "30 minutos de cardio en el parque", completado: false },
    { titulo: "Leer un libro", descripcion: "Continuar leyendo El principito", completado: true },
    { titulo: "Pagar facturas", descripcion: "Pagar luz, agua e internet", completado: false },
    { titulo: "Llamar al médico", descripcion: "Agendar cita de revisión anual", completado: false },
    { titulo: "Limpiar la casa", descripcion: "Barrer, trapear y limpiar baños", completado: true },
    { titulo: "Estudiar Node.js", descripcion: "Revisar documentación de Express", completado: false },
    { titulo: "Enviar informe", descripcion: "Enviar informe mensual al jefe", completado: false },
    { titulo: "Arreglar la bicicleta", descripcion: "Llevar al taller para cambiar llanta", completado: false },
    { titulo: "Preparar presentación", descripcion: "Slides para la reunión del lunes", completado: true },
];

const archivos = [
    { titulo: "documento.txt", contenido: "Este es un documento de prueba." },
    { titulo: "notas.txt", contenido: "Notas importantes del proyecto." },
    { titulo: "lista.txt", contenido: "1. Item uno\n2. Item dos\n3. Item tres" },
    { titulo: "resumen.txt", contenido: "Resumen general del sistema." },
    { titulo: "config.txt", contenido: "Configuración de entorno: desarrollo" },
];

async function seed() {
    try {
        console.log("Iniciando poblador...");

        // 1. Crear usuario prueba
        const email = "prueba@gmail.com";
        const password = "1234";
        const nombre = "prueba";

        // Verificar si ya existe
        const snap = await db.ref("users").orderByChild("email").equalTo(email).once("value");
        let uid;

        if (snap.exists()) {
            console.log("Usuario ya existe, usando el existente...");
            snap.forEach(child => { uid = child.key; });
        } else {
            const passwordEncriptado = await bcrypt.hash(password, 8);
            const userRef = db.ref("users").push();
            await userRef.set({ email, password: passwordEncriptado, nombre });
            uid = userRef.key;
            console.log(`Usuario creado con uid: ${uid}`);
        }

        // 2. Crear tareas
        console.log("Creando tareas...");
        for (const tarea of tareas) {
            const ref = db.ref(`users/${uid}/tasks`).push();
            await ref.set(tarea);
        }
        console.log(`${tareas.length} tareas creadas`);

        // 3. Crear archivos físicos y registrar en Firebase
        console.log("Creando archivos...");
        const uploadsDir = path.join(__dirname, "uploads");
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

        const tiempo = new Date();
        const fecha = tiempo.toLocaleDateString();
        const hora = tiempo.toLocaleTimeString();

        for (const archivo of archivos) {
            // Crear archivo físico en uploads/
            fs.writeFileSync(path.join(uploadsDir, archivo.titulo), archivo.contenido);

            const ref = db.ref(`users/${uid}/files`).push();
            await ref.set({ titulo: archivo.titulo, fecha, hora });
        }
        console.log(`${archivos.length} archivos creados`);

        console.log("✓ Poblador completado");
        console.log("  Email: prueba@gmail.com");
        console.log("  Contraseña: 1234");
        process.exit(0);

    } catch (error) {
        console.error("Error en el poblador:", error);
        process.exit(1);
    }
}

seed();