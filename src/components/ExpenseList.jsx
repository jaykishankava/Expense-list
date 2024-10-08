import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseList = () => {
    const { expenses, dispatch } = useExpenses();
    const [filter, setFilter] = useState('');


    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_EXPENSE', payload: id });
        

        const updatedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const newExpenses = updatedExpenses.filter(expense => expense.id !== id);
        localStorage.setItem('expenses', JSON.stringify(newExpenses));
        toast.error('Expense delete successfully!');

    };


    const filteredExpenses = expenses.filter(
        (expense) =>
            expense.category.toLowerCase().includes(filter.toLowerCase()) ||
            expense.description.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container rounded bg-secondary text-white mt-4">
            <h2 className='mb-3'>Expense List</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by category or description"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            
            <div className="table-responsive border p-1">
                <table className="table">
                    <thead className="thead-dark">
                        <tr className='text-center'>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Payment Method</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.length > 0 ? (
                            filteredExpenses.map((expense) => (
                                <tr key={expense.id} className='text-center'>
                                    <td>{expense.amount}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.date}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.paymentMethod}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(expense.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No expenses found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ToastContainer
            autoClose={1000}
            />
        </div>
    );
};

export default ExpenseList;
