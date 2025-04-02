import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import '../styles/styles.css';

function Register() {
    const { post, loading, error, message } = useApi("http://localhost:8000/");
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [date_birth, setDateBirth] = useState('');
    const [number_identification, setNumberIdentification] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const GENDER_CHOICES = [
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Femenino' },
        { value: 'NB', label: 'No-binario' },
        { value: 'OTHER', label: 'Otro' },
        { value: 'PREFER_NOT_TO_SAY', label: 'Prefiero no decirlo' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, last_name, date_birth, number_identification, gender, email, password };

        try {
            const response = await post("auth/user/register", userData);
            if (response?.message) {
                navigate("/login"); 
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '20px', width: '1000px', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: 'var(--color-primary)' }}>Registro</h2>

            {error?.password && <div style={{ color: 'red', marginBottom: '10px' }}>{error.password[0]}</div>}
11aaBB
            {/* Formulario de registro */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: error?.password ? '10px': '15px' }}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='input-form'
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    className='input-form'
                />
                <input
                    type="date"
                    placeholder="Fecha de nacimiento"
                    value={date_birth}
                    onChange={(e) => setDateBirth(e.target.value)}
                    className="input-form"
                    required
                />
                <input
                    type="text"
                    maxLength="8"
                    placeholder="Número de Identificación"
                    value={number_identification}
                    onChange={(e) => setNumberIdentification(e.target.value)}
                    className="input-form"
                    required
                />
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input-form"
                    required
                >
                    <option value="">Selecciona tu género</option>
                    {GENDER_CHOICES.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-form"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-form"
                    required
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: 'var(--color-button)',
                        padding: '10px',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    {loading ? 'Cargando...' : 'Registrarse'}
                </button>
            </form>
            <p style={{ color: 'var(--color-primary)', marginTop: '20px' }}>
                ¿Ya tienes cuenta? <a href="/login"><b>Inicia sesión aquí</b></a>
            </p>
        </div>
    );
}

export default Register;
