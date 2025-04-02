import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        // Verificamos si el usuario está logeado
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");

        setIsAuthenticated(!!token);
        setRole(userRole);
    }, [localStorage.getItem("token"), localStorage.getItem("role")]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Eliminar token del almacenamiento
        localStorage.removeItem("role"); // Eliminar token del almacenamiento
        localStorage.removeItem("user_id"); // Eliminar token del almacenamiento
        setIsAuthenticated(false);
        setRole(null);
        navigate("/");
    };

    return (
        <nav style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ display: 'flex', gap: 20 }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
                {isAuthenticated && (
                    <Link to="/loans" style={{ color: 'white', textDecoration: 'none' }}>Préstamos</Link>)}
                
                {isAuthenticated && (
                    <Link to="/loan" style={{ color: 'white', textDecoration: 'none' }}>Nuevo Préstamo</Link>)}
            </div>
            <div>
                {isAuthenticated ? (
                    <button onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
                        Cerrar Sesión
                    </button>
                ) : (
                    <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Iniciar Sesión</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
