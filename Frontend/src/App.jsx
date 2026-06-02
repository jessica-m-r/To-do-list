import { useState } from "react";
import { registrar, iniciarSesion } from "./services/authService.js";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import TaskFormulario from "./components/taskFormulario.jsx";
import TaskLista from "./components/taskLista.jsx";
import Drive from "./components/drive.jsx";
import "./App.css";

function App() {
    const [refresh, setRefresh] = useState(0);
    const [usuario, setUsuario] = useState(null);
    const [vista, setVista] = useState("login");

    const recargar = () => setRefresh((prev) => prev + 1);

    async function login(email, password){
        const datos = await iniciarSesion(email, password);
        if (!datos.accessToken) return alert("Credenciales incorrectas");
        localStorage.setItem("token", datos.accessToken);
        setUsuario(datos);
        setVista("home");
    }

    async function register(email, password, nombre){
        const datos = await registrar(email, password, nombre);
        if (!datos.accessToken) return alert("Error al registrarse");
        localStorage.setItem("token", datos.accessToken);
        setUsuario(datos);
        setVista("home");
    }

    function cerrarSesion(){
        localStorage.removeItem("token");
        setUsuario(null);
        setVista("login");
    }

    if(!usuario && vista === "login"){
        return <Login onLogin={login} onIrRegister={() => setVista("register")} />;
    }

    if(!usuario && vista === "register"){
        return <Register onRegister={register} onIrLogin={() => setVista("login")} />;
    }

    if(vista === "home"){
        return (
            <div className="div-task">
                <h1>Bienvenido</h1>
                <button onClick={() => setVista("todo")}>To Do List</button>
                <button onClick={() => setVista("drive")}>Drive</button>
                <button onClick={cerrarSesion}>Cerrar sesión</button>
            </div>
        );
    }

    if(vista === "todo"){
        return (
            <div className="div-task">
                <button onClick={() => setVista("drive")}>Ir a Drive</button>
                <button onClick={() => setVista("home")}>Inicio</button>
                <button onClick={cerrarSesion}>Cerrar sesión</button>
                <h1>To Do List</h1>
                <TaskFormulario onTaskCreated={recargar} />
                <TaskLista refresh={refresh} onUpdate={recargar} />
            </div>
        );
    }

    if(vista === "drive"){
        return (
            <div className="div-task">
                <button onClick={() => setVista("todo")}>Ir a To Do List</button>
                <button onClick={() => setVista("home")}>Inicio</button>
                <button onClick={cerrarSesion}>Cerrar sesión</button>
                <h1>Drive</h1>
                <Drive />
            </div>
        );
    }
    return null;
}

export default App;