import React, { useEffect, useState } from 'react';
import { FaTrash, FaEye, FaCheck } from "react-icons/fa";
import useApi from '../hooks/useApi';
import '../styles/styles.css';

function LoanList({ loans, role }) {
    const { get, put, del, loading, api_error, message } = useApi("http://localhost:8000/");
    const [loanData, setLoanData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const role = localStorage.getItem("role")
                const user_id = localStorage.getItem("user_id")
                let url;
                if (role == "client") {
                    url = `loan/user/${user_id}`
                } else {
                    url = "loan/"
                }
                const response = await get(url);

                setLoanData(response);
            } catch (err) {
                console.error(api_error ? api_error : "Error fetching data", err);
                setLoanData([]);
            }
        };

        fetchData();
    }, [get]);

    const markPaid = async (id) => {
        try {
            await put(`loan/${id}/mark-paid`, { paid: true });
            setLoanData(prevLoans => prevLoans.map(loan =>
                loan.id === id ? { ...loan, paid: true } : loan
            ));
        } catch (error) {
            console.error(api_error ? api_error : "Error al marcar como pagado", error);
        }
    };

    const deleteLoan = async (id) => {
        try {
            await del(`loan/${id}`);
            setLoanData(prevLoans => prevLoans.filter(loan => loan.id !== id));
        } catch (error) {
            console.error(api_error ? api_error : "Error al borrar el préstamo", error);
        }
    };

    return (
        <div style={{ backgroundColor: "white", color: "black", width: "1000px", height: "500px", padding: "5px", display: "flex", justifyContent: "center" }}>
            {loading ? "Cargando..." : (
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <table className='styled-table'>
                        <thead>
                            <tr>
                                <th>Titular</th>
                                <th>Monto Neto</th>
                                <th>Interés</th>
                                <th>Monto Total</th>
                                <th>Cuotas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(loanData) ? loanData.map(loan => (
                                <tr key={loan.id} style={{ backgroundColor: loan.paid ? "gray" : "" }}>
                                    <td>{loan.holder}</td>
                                    <td>{loan.net_amount}</td>
                                    <td>{loan.interest_rate}</td>
                                    <td>{loan.total_amount}</td>
                                    <td>{loan.number_installments}</td>
                                    <td style={{ display: 'flex', gap: 5 }}>
                                        <button style={{ backgroundColor: 'var(--color-button)' }} onClick={() => deleteLoan(loan.id)} title='Borrar'><FaTrash /></button>
                                        {/* <button style={{ backgroundColor: 'var(--color-button)' }} title='Ver Detalle'><FaEye /></button> */}
                                        <button style={{ backgroundColor: 'var(--color-button)' }} onClick={() => markPaid(loan.id)} disabled={loan.paid} title='Pagado'><FaCheck /></button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>No hay préstamos disponibles.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default LoanList;
