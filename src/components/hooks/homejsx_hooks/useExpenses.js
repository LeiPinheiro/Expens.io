import { useEffect, useState } from "react";
import axios from 'axios'

export function useExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const userName = localStorage.getItem('userName');

    const loadExpenses = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                alert('Usuário não autenticado. Redirecionando para o login...');
                window.location.href = '/login';
                return;
            }

            const response = await axios.get('https://expens-io-api.onrender.com/api/expenses', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (Array.isArray(response.data)) {
                setExpenses(response.data);
            } else {
                console.error('A resposta não é um array', response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar despesas:', error);

            if (error.response?.status === 401 || error.response?.status === 403) {
                alert('Sessão expirada. Faça login novamente.');
                window.location.href = '/login';
            }
        }
    };

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const token = localStorage.getItem('authToken');

                if (!token) {
                    alert('Usuário não autenticado. Redirecionando para o login...');
                    window.location.href = '/login';
                    return;
                }

                const response = await axios.get(`https://expens-io-api.onrender.com/api/expenses/total?userName=${userName}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setTotalSpent(parseFloat(response.data.total) || 0);
            } catch (error) {
                console.error('Erro ao buscar total:', error);

                if (error.response?.status === 401 || error.response?.status === 403) {
                    alert('Sessão expirada. Faça login novamente.');
                    window.location.href = '/login';
                }
            }
        };

        fetchTotal();
        loadExpenses();
    }, []);

    return { expenses, totalSpent, loadExpenses };
}
