import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';
import { useExpenses } from '../context/ExpenseContext';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Charts = () => {
    const { expenses } = useExpenses();


    const getMonthlyExpenses = () => {
        const months = Array(12).fill(0); 
        expenses.forEach((expense) => {
            const date = new Date(expense.date);
            const month = date.getMonth(); 
            months[month] += expense.amount;
        });
        return months;
    };


    const monthlyExpensesData = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Total Expenses',
                data: getMonthlyExpenses(),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
            },
        ],
    };


    const getCategoryExpenses = () => {
        const categories = {};
        expenses.forEach((expense) => {
            categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
        });
        return categories;
    };


    const categoryExpenses = getCategoryExpenses();
    const categoryExpensesData = {
        labels: Object.keys(categoryExpenses),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(categoryExpenses),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    return (
        <div className="container rounded bg-warning text-dark  mb-5 mt-4">
            <h2>Expense Statistics</h2>

            <div className="row">
                <div className="col-md-6">
                    <h4>Total Expenses Per Month</h4>
                    <Line data={monthlyExpensesData} />
                </div>
                <div className="col-md-6">
                    <h4>Category Breakdown</h4>
                    <Pie data={categoryExpensesData} />
                </div>
            </div>
        </div>
    );
};

export default Charts;
