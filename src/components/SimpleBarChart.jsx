import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import { useState, useEffect } from 'react';



const SimpleBarChart = () => {

    const [expensesData, setExpensesData] = useState([]);
    const userName = localStorage.getItem('userName')
    const savingsValue = localStorage.getItem(`savings_${userName}`)

    // Fetch de dados da API
    axios.get('https://expensio-f0qwzt6rr-lei-pinheiros-projects.vercel.app/api/expenses', { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } })
        .then((response) => { // Verifique a resposta completa
            if (Array.isArray(response.data)) {
                const data = response.data.map((expense) => ({
                    name: expense.itemname,
                    value: expense.price,
                }));
                setExpensesData(data);
            } else {
                console.error('A resposta da API não é um array:', response.data);
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar as despesas:', error.response ? error.response.data : error.message);
        });


    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expensesData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, Number(savingsValue)]} />
                <Tooltip />
                <Bar dataKey="value" fill="rgb(14, 158, 144)" />
            </BarChart>
        </ResponsiveContainer>
    );
};


export default SimpleBarChart;
