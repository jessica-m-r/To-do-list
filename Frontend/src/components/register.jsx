import { useState } from "react";

function Register({ onRegister, onIrLogin }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function registrarse(e) {
        e.preventDefault();
        if (!email || !password || !nombre) return alert("Complete los campos");
        await onRegister(email, password, nombre);
    }

    return (
        <div className="div-inicio">
        <form onSubmit={registrarse}>
            <h1>Registrarse</h1>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Registrarse</button>
            <p>¿Ya tienes cuenta? <button type="button" onClick={onIrLogin}>Inicia sesión</button></p>
        </form>
        </div>
        
    );
}

export default Register;