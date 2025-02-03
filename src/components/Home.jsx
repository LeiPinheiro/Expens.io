import styles from './modules/Home.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

// ICONS
import { MdSavings } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";

function Home() {
    const userName = localStorage.getItem('userName');
    const [savings, setSavings] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0)


    // Função para carregar as despesas do usuário
    const loadExpenses = async () => {
        try {
            const token = localStorage.getItem('authToken');

            // Verifica se o token está presente
            if (!token) {
                alert('Usuário não autenticado. Redirecionando para o login...');
                window.location.href = '/login';
                return;
            }

            // Faz a requisição para buscar as despesas
            const response = await axios.get('https://expens-io-api.onrender.com/api/expenses', {
                headers: {
                    Authorization: `Bearer ${token}` // Envia o token no header
                }
            });

            console.log('Resposta das despesas:', response.data);

            // Verifica se a resposta é um array e atualiza o estado
            if (Array.isArray(response.data)) {
                setExpenses(response.data);
            } else {
                console.error('A resposta não é um array', response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar despesas:', error);

            // Trata erros de autenticação (token inválido ou expirado)
            if (error.response?.status === 401 || error.response?.status === 403) {
                alert('Sessão expirada. Faça login novamente.');
                window.location.href = '/login';
            }
        }
    };

    // Fetching total spent by user
    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const userName = localStorage.getItem('userName'); // Caso precise do nome do usuário

                // Verifica se o token está presente
                if (!token) {
                    alert('Usuário não autenticado. Redirecionando para o login...');
                    window.location.href = '/login';
                    return;
                }

                // Faz a requisição para buscar o total das despesas
                const response = await axios.get(`https://expens-io-api.onrender.com/api/total?userName=${userName}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Envia o token no header
                    }
                });

                const total = parseFloat(response.data.total) || 0; // Garante que seja número
                setTotalSpent(total); // Atualiza o estado com o total gasto
            } catch (error) {
                console.error('Erro ao buscar total:', error);

                // Trata erros de autenticação (token inválido ou expirado)
                if (error.response?.status === 401 || error.response?.status === 403) {
                    alert('Sessão expirada. Faça login novamente.');
                    window.location.href = '/login';
                }
            }
        };

        fetchTotal(); // Chama a função para pegar o total das despesas do usuário

        const savedSavings = localStorage.getItem(`savings_${userName}`);
        if (savedSavings) {
            setSavings(savedSavings);
        }
    }, []); // O useEffect será executado apenas uma vez, na primeira renderização



    useEffect(() => {
        const savedSavings = localStorage.getItem(`savings_${userName}`);

        loadExpenses();

        if (savedSavings) {
            setSavings(savedSavings);
        }
    }, [userName]);

    return (
        <div className={styles.mainSection}>
            <div className={styles.dataContainer}>
                <div className={styles.cardContainer}>
                    <div className={styles.iconContainer}>
                        <MdSavings className={styles.icon} />
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.topText}>Savings</p>
                        <p id={styles.savingsNumber}>$ {savings || 0}</p>
                    </div>
                </div>
                <div className={styles.cardContainer}>
                    <div className={styles.iconContainer}>
                        <AiFillShopping className={styles.icon} />
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.topText}>Total Spent</p>
                        <p>$ {totalSpent.toFixed(2)}</p>
                    </div>
                </div>
                <div className={styles.cardContainer}>
                    <div className={styles.iconContainer}>
                        <FaClipboardList className={styles.icon} />
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.topText}>List size</p>
                        <p>{expenses.length}</p>
                    </div>
                </div>
            </div>
            <div className={styles.itensSection}>
                <h1>Your Expenses</h1>
                <div className={styles.itensContainer}>
                    {expenses.length === 0 ? (
                        <p className={styles.noExpensesText}>No added expenses</p>
                    ) : (
                        expenses.map((expense) => {
                            const price = parseFloat(expense.price);

                            return (
                                <div className={styles.itemContainer} key={expense.id}>
                                    <div className={styles.itemName}>
                                        <p>{expense.itemname}</p>
                                    </div>
                                    <div className={styles.itemPrice}>
                                        <p>R$ {!isNaN(price) ? price.toFixed(2) : '0.00'}</p>
                                    </div>
                                    <div className={styles.itemDate}>
                                        <p>{new Date(expense.date).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                </div>
                            );
                        })
                    )}

                </div>
            </div>
        </div>
    );
}

export default Home;