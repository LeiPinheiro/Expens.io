import styles from './modules/Expenses.module.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { use } from 'react';

function Expenses() {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDate, setItemDate] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [showEditConfig, setShowEditConfig] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [updatedName, setUpdatedName] = useState('')
    const [updatedPrice, setUpdatedPrice] = useState('')
    const [updatedDate, setUpdatedDate] = useState('')

    const token = localStorage.getItem('authToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

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
            const response = await axios.get('http://localhost:3000/api/expenses', {
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

    // Carrega as despesas ao montar o componente
    useEffect(() => {
        loadExpenses();
    }, []);

    // Função para criar uma nova despesa
    const newExpense = () => {
        // Verifica se todos os campos estão preenchidos
        if (!itemName || !itemPrice || !itemDate) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Verifica se o token está presente no localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Usuário não autenticado.');
            window.location.href = '/login';
            return
        }

        // Envia a requisição para criar a despesa
        axios.post('http://localhost:3000/api/expenses', {
            itemname: itemName,
            price: parseFloat(itemPrice), // Converte o preço para número
            date: itemDate
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Envia o token no header
            }
        })
            .then(response => {
                alert('Despesa criada com sucesso!');
                window.location.reload(); // Recarrega a página para atualizar a lista de despesas
            })
            .catch(error => {
                console.error('Erro ao criar despesa:', error);
                alert('Erro ao criar despesa.');
            });
    };

    // Updating itens
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
            await axios.put(`http://localhost:3000/api/expenses/${editItem}`, {
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

    // Deleting expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/expenses/${id}`)

            alert('Despesa apagada com sucesso!')
            loadExpenses()
        } catch (error) {
            alert('Erro ao apagar despesa')
            console.error('Ocorreu um erro ao apagar despesa', error)
        }
    }



    return (
        <div className={styles.mainSection}>
            <h2>Add an item!</h2>
            <div className={styles.inputsSection}>
                <div className={styles.inputContainer}>
                    <label htmlFor="itemNameInput">Item name*</label>
                    <input
                        type="text"
                        id="itemNameInput"
                        required
                        autoComplete="off"
                        onChange={(event) => setItemName(event.target.value)}
                        value={itemName}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="itemPriceInput">Item price*</label>
                    <input
                        type="number"
                        id="itemPriceInput"
                        required
                        autoComplete="off"
                        onChange={(event) => setItemPrice(event.target.value)}
                        value={itemPrice}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="itemDateInput">Purschase date*</label>
                    <input
                        type="date"
                        id="itemDateInput"
                        required
                        autoComplete="off"
                        onChange={(event) => setItemDate(event.target.value)}
                        value={itemDate}
                    />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <input type="button" value="Enviar" onClick={newExpense} />
            </div>
            <div className={styles.itemsContainer}>
                {expenses.length === 0 ? (
                    <p className={styles.addAnExpenseText}>Add an expense!</p>
                ) : (expenses.map((expense) => {
                    return (
                        <div className={styles.itemContainer} key={expense.id}>
                            <p className={styles.itemName}>{expense.itemname}</p>
                            <p className={styles.itemPrice}>
                                {isNaN(expense.price) ? 'Preço inválido' : `R$ ${parseFloat(expense.price).toFixed(2)}`}
                            </p>
                            <p className={styles.itemDate}>
                                {new Date(expense.date).toLocaleDateString('pt-BR')}
                            </p>
                            <div className={styles.btnsContainer}>
                                <button id={styles.editBtn} onClick={() => { setShowEditConfig(true); setEditItem(expense.id); }}><FaEdit /></button>
                                <button id={styles.deleteBtn} onClick={() => deleteExpense(expense.id)}><MdDelete /></button>
                            </div>
                        </div>
                    )
                })
                )}
            </div>
            <div className={styles.editContainer} style={{ display: showEditConfig ? "flex" : "none" }}>
                <p>Edit item</p>
                <div className={styles.inputsContainer}>
                    <label htmlFor="editItemName">Edit item name</label>
                    <input type="text" name='editItemName' id={styles.editItemName} onChange={(event) => setUpdatedName(event.target.value)} />
                    <label htmlFor="editItemName">Edit item price</label>
                    <input type="number" name='editItemName' id={styles.editItemPrice} onChange={(event) => setUpdatedPrice(event.target.value)} />
                    <label htmlFor="editItemName">Edit purschase date</label>
                    <input type="date" name='editItemName' id={styles.editItemDate} onChange={(event) => setUpdatedDate(event.target.value)} />
                </div>
                <div className={styles.editBtnsContainer}>
                    <button id={styles.cancelBtn} onClick={() => setShowEditConfig(!showEditConfig)}>Cancel</button>
                    <button id={styles.saveBtn} onClick={saveUpdatedItem}>Save</button>
                </div>
            </div>
        </div >
    );
}





export default Expenses;