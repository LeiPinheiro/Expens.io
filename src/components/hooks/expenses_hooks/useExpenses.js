
import { useState, useEffect } from 'react';
import axios from 'axios';

const useExpenses = () => {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDate, setItemDate] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [showEditConfig, setShowEditConfig] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedPrice, setUpdatedPrice] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');

    const token = localStorage.getItem('authToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const loadExpenses = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                alert('Usuário não autenticado. Redirecionando para o login...');
                window.location.href = '/login';
                return;
            }

            const response = await axios.get('https://expens-io-api.onrender.com/api/expenses', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
        loadExpenses();
    }, []);

    const newExpense = () => {
        if (!itemName || !itemPrice || !itemDate) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Usuário não autenticado.');
            window.location.href = '/login';
            return;
        }

        axios.post('https://expens-io-api.onrender.com/api/expenses', {
            itemname: itemName,
            price: parseFloat(itemPrice),
            date: itemDate
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                alert('Despesa criada com sucesso!');
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao criar despesa:', error);
                alert('Erro ao criar despesa.');
            });
    };

    const saveUpdatedItem = async () => {
        if (!updatedName && !updatedPrice && !updatedDate) {
            alert('Preencha pelo menos um campo para atualizar.');
            return;
        }

        if (!editItem) {
            alert('Selecione um item para editar.');
            return;
        }

        try {
            await axios.put(`https://expens-io-api.onrender.com/api/expenses/${editItem}`, {
                itemname: updatedName || null,
                price: updatedPrice ? parseFloat(updatedPrice) : null,
                date: updatedDate || null
            });

            alert('Despesa atualizada com sucesso!');
            setShowEditConfig(false);
            loadExpenses();
        } catch (error) {
            console.error('Erro ao atualizar despesa:', error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`https://expens-io-api.onrender.com/api/expenses/${id}`);

            alert('Despesa apagada com sucesso!');
            loadExpenses();
        } catch (error) {
            alert('Erro ao apagar despesa');
            console.error('Ocorreu um erro ao apagar despesa', error);
        }
    };

    return {
        itemName,
        setItemName,
        itemPrice,
        setItemPrice,
        itemDate,
        setItemDate,
        expenses,
        showEditConfig,
        setShowEditConfig,
        editItem,
        setEditItem,
        updatedName,
        setUpdatedName,
        updatedPrice,
        setUpdatedPrice,
        updatedDate,
        setUpdatedDate,
        newExpense,
        saveUpdatedItem,
        deleteExpense
    };
};

export default useExpenses;