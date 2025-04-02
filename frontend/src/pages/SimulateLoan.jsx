import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';

function SimulateLoan() {
    const { post, loading, api_error } = useApi("http://localhost:8000/");
    const navigate = useNavigate();

    const [loanData, setLoanData] = useState({});

    const [simulationResults, setSimulationResults] = useState(null); // Estado para los resultados simulados

    const userId = localStorage.getItem("user_id");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulación de los resultados
        const simulatedResults = {
            number_installments: loanData.number_installments,
            amount: parseFloat(loanData.amount),
            interest_rate: 50,
            total_amount: parseFloat(loanData.amount) * 1.5,
        };

        setSimulationResults(simulatedResults); // Actualiza los resultados simulados

        try {
            await post("loan/simulate", { ...loanData, user: userId ? parseInt(userId) : null });
            // navigate("/loans");
        } catch (error) {
            console.error(api_error || "Error al solicitar préstamo", error);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '20px', width: '1000px', height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <h2 style={{ color: 'var(--color-primary)' }}>Solicitar Préstamo</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                    name="amount"
                    placeholder="Monto"
                    type="number"
                    value={loanData.amount}
                    onChange={handleChange}
                    className='input-form'
                    required
                />
                <select
                    name="number_installments"
                    value={loanData.number_installments}
                    onChange={handleChange}
                    className="input-form"
                    required
                >
                    <option value="">Selecciona las cuotas</option>
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="18">18</option>
                    <option value="24">24</option>
                </select>
                <button type="submit" disabled={loading} style={{ backgroundColor: 'var(--color-button)', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
                    Solicitar Préstamo
                </button>
            </form>

            {/* Mostrar resultados simulados */}
            {simulationResults && (
                <div style={{ marginTop: '20px', padding: '15px', border: '1px solid var(--color-border)', borderRadius: '5px', backgroundColor: '#f9f9f9', color: 'var(--color-button)'}}>
                    <h3>Simulación de Préstamo:</h3>
                    <p><strong>Monto:</strong> {simulationResults.amount}</p>
                    <p><strong>Cuotas:</strong> {simulationResults.number_installments}</p>
                    <p><strong>Tasa de Interés:</strong> {simulationResults.interest_rate}%</p>
                    <p><strong>Monto Total:</strong> {simulationResults.total_amount}</p>
                </div>
            )}
        </div>
    );
}

export default SimulateLoan;
