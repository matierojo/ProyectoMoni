import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';

function RequestLoan() {
    const { post, loading, error } = useApi("http://localhost:8000/");
    const navigate = useNavigate();
    
    const userId = localStorage.getItem("user_id");

    const [loanData, setLoanData] = useState(userId ? {} : { applicant: {} });

    const GENDER_CHOICES = [
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Femenino' },
        { value: 'NB', label: 'No-binario' },
        { value: 'OTHER', label: 'Otro' },
        { value: 'PREFER_NOT_TO_SAY', label: 'Prefiero no decirlo' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (userId) {
            setLoanData(prev => ({ ...prev, [name]: value }));
        } else {
            if (['amount', 'number_installments'].includes(name)) {
                setLoanData(prev => ({ ...prev, [name]: value }));
            } else {
                setLoanData(prev => ({
                    ...prev,
                    applicant: { ...prev.applicant, [name]: value }
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("dataaa", loanData);

        const dataToSend = userId ? 
            { ...loanData, user: parseInt(userId), applicant: null } :
            { ...loanData, user: null };

        try {
            await post("loan/", dataToSend);
            if (userId) {
                navigate("/loans");
            } else {
                navigate("/");
            }
        } catch (err) {
            console.log("errrrrr", err);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '20px', width: '1000px', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <h2 style={{ color: 'var(--color-primary)' }}>Solicitar Préstamo</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar el error */}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {!userId && (
                    <>
                        <input name="name" placeholder="Nombre" onChange={handleChange} className='input-form' required />
                        <input name="last_name" placeholder="Apellido" onChange={handleChange} className='input-form' required />
                        <input type="date" name="date_birth" onChange={handleChange} className='input-form' required />
                        <input name="number_identification" maxLength="8" placeholder="DNI" onChange={handleChange} className='input-form' required />
                        <input name="email" placeholder="Email" type="email" onChange={handleChange} className='input-form' required />
                        <select
                            name="gender"
                            onChange={handleChange}
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
                    </>
                )}
                <input name="amount" placeholder="Monto" type="number" onChange={handleChange} className='input-form' required />
                <select
                    name="number_installments"
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

                <button type="submit" style={{ backgroundColor: 'var(--color-button)', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }} disabled={loading}>
                    Solicitar Préstamo
                </button>
            </form>
        </div>
    );
}

export default RequestLoan;
