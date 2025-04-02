import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import '../styles/styles.css';

function Login() {
    const { post, loading, error } = useApi("http://localhost:8000/");
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await post("auth/login", { email, password });

            if (response?.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("role", response.role);
                localStorage.setItem("user_id", response.user_id);
                navigate("/");
            } else {
                // setError("Credenciales incorrectas");
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div style={{ backgroundColor: 'white', color: 'white', padding: '20px', width: '1000px', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h2 style={{color: 'var(--color-primary)'}}>Iniciar Sesión</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form style={{display: 'flex', flexDirection: 'column', gap: 20}} onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className='input-form'
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className='input-form'
                />
                <button type="submit" style={{ backgroundColor: 'var(--color-button)', padding: '10px' }}>
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>
            </form>
            <p style={{color: 'var(--color-primary)'}}>¿No tienes cuenta? <a href="/register"><b>Regístrate aquí</b></a></p>
        </div>
    );
}

export default Login;
