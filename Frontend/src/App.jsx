import { useState } from "react";
import { registrar, iniciarSesion } from "./services/authService.js";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import TaskFormulario from "./components/taskFormulario.jsx";
import TaskLista from "./components/taskLista.jsx";
import "./App.css";

function App() {
    const [refresh, setRefresh] = useState(0);
    const [usuario, setUsuario] = useState(null);
    const [vista, setVista] = useState("login");

    const recargar = () => setRefresh((prev) => prev + 1);

    async function login(email, password) {
        const datos = await iniciarSesion(email, password);
        if (!datos.accessToken) return alert("Credenciales incorrectas");
        localStorage.setItem("token", datos.accessToken);
        setUsuario(datos);
    }

    async function register(email, password, nombre) {
        const datos = await registrar(email, password, nombre);
        if (!datos.accessToken) return alert("Error al registrarse");
        localStorage.setItem("token", datos.accessToken);
        setUsuario(datos);
    }

    function cerrarSesion() {
        localStorage.removeItem("token");
        setUsuario(null);
    }

    if (!usuario && vista === "login") {
        return <Login onLogin={login} onIrRegister={() => setVista("register")} />;
    }

    if (!usuario && vista === "register") {
        return <Register onRegister={register} onIrLogin={() => setVista("login")} />;
    }

    return (
        <div className="div-task">
            <h1>To Do List</h1>
            <p>Hola, {usuario.nombre}</p>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
            <TaskFormulario onTaskCreated={recargar} />
            <TaskLista refresh={refresh} onUpdate={recargar} />
        </div>
    );
}

export default App;