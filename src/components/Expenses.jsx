// src/components/Expenses.jsx
import styles from './modules/Expenses.module.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useExpenses from './hooks/expenses_hooks/useExpenses';

function Expenses() {
    const {
        itemName, setItemName, itemPrice, setItemPrice, itemDate, setItemDate, expenses,
        showEditConfig, setShowEditConfig, editItem, setEditItem, updatedName, setUpdatedName, updatedPrice, setUpdatedPrice, updatedDate, setUpdatedDate, newExpense, saveUpdatedItem, deleteExpense
    } = useExpenses();

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
                    <label htmlFor="itemDateInput">Purchase date*</label>
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
                    );
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
                    <label htmlFor="editItemName">Edit purchase date</label>
                    <input type="date" name='editItemName' id={styles.editItemDate} onChange={(event) => setUpdatedDate(event.target.value)} />
                </div>
                <div className={styles.editBtnsContainer}>
                    <button id={styles.cancelBtn} onClick={() => setShowEditConfig(!showEditConfig)}>Cancel</button>
                    <button id={styles.saveBtn} onClick={saveUpdatedItem}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default Expenses;