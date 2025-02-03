import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useState, useEffect } from 'react';

const PizzaChart = () => {
    const [expensesData, setExpensesData] = useState([]);
    const userName = localStorage.getItem('userName');

    const colors = ['#FF6347', 'rgb(14, 158, 144)', '#90EE90', '#32CD32', '#87CEEB', '#DDA0DD']; // Adicione cores que você preferir

    // Fetch de dados da API
    useEffect(() => {
        axios
            .get('https://expens-io-api.onrender.com/api/expenses', { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    const data = response.data.map((expense) => ({
                        name: expense.itemname,
                        value: Number(expense.price),
                    }));
                    setExpensesData(data);
                } else {
                    console.error('A resposta da API não é um array:', response.data);
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar as despesas:', error.response ? error.response.data : error.message);
            });
    }, []);

    // Customizando o rótulo do gráfico de pizza
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 10;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={expensesData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    innerRadius={60}
                    labelLine={false}
                    label={renderCustomizedLabel}
                >
                    {expensesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PizzaChart;
