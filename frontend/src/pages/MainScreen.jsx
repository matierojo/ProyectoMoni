import { useNavigate } from 'react-router-dom';

function MainScreen() {
    const navigate = useNavigate();

    const handleSimulation = () => {
        navigate("simulate")
    }
    
    const handleLoan = () => {
        navigate("loan")
    }

    return (
        <div style={{ backgroundColor: 'white', padding: '20px' , width: '1000px', height: '500px', display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center'}}>
            <button style={{ backgroundColor: 'var(--color-button)' }} onClick={() => handleSimulation()}>Simular Préstamo</button>
            <button style={{ backgroundColor: 'var(--color-button)' }} onClick={() => handleLoan()}>Pedir Préstamo</button>
        </div>
    );
}

export default MainScreen;