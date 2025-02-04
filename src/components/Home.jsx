import styles from './modules/Home.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useExpenses } from './hooks/homejsx_hooks/useExpenses';

// ICONS
import { MdSavings } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { useAuth } from './hooks/homejsx_hooks/useAuth';

function Home() {
    useAuth
    const { expenses, totalSpent, loadExpenses } = useExpenses()
    const userName = localStorage.getItem('userName');
    const [savings, setSavings] = useState('');

    useEffect(() => {
        const savedSavings = localStorage.getItem(`savings_${userName}`);

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