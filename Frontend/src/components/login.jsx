import { useState } from "react";

function Login({ onLogin, onIrRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function iniciarSesion(e) {
        e.preventDefault();
        if (!email || !password) return alert("Complete los campos");
        await onLogin(email, password);
    }

    return (
        <div className="div-inicio">
            <form onSubmit={iniciarSesion}>
                <h1>Iniciar sesión</h1>
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
                <button type="submit">Entrar</button>
            </form>
            <p>¿No tienes cuenta? <button onClick={onIrRegister}>Regístrate</button></p>
        </div>
    );
}

export default Login;