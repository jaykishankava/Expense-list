import React, { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm = () => {
    const { dispatch } = useExpenses();

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');


    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        dispatch({ type: 'SET_EXPENSES', payload: storedExpenses });
    }, [dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount || isNaN(amount)) {
            toast.error('Please enter a valid amount'); 
            return;
        }

        if (!description || !date || !category) {
            toast.error('Please fill all the required fields');
            return;
        }

        const newExpense = {
            id: Date.now(),
            amount: parseFloat(amount),
            description,
            date,
            category,
            paymentMethod,
        };


        const updatedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        updatedExpenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));


        dispatch({ type: 'ADD_EXPENSE', payload: newExpense });


        setAmount('');
        setDescription('');
        setDate('');
        setCategory('');
        setPaymentMethod('cash');
        

        toast.success('Expense added successfully!');
    };

    return (
        <div className="container mt-4">
            
            <div className="row">
                <div className="col-md-8 col-lg-6 rounded border bg-secondary text-white p-3 shadow mt-2 mb-2">
                    <form onSubmit={handleSubmit}>
                    <h2 style={{color:"white"}}>Add New Expense</h2>
                        <div className="form-group mb-3">
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                id="amount"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="category">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                id="category"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                list="category-suggestions"
                            />
                            <datalist id="category-suggestions">
                                <option value="Food" />
                                <option value="Transport" />
                                <option value="Entertainment" />
                            </datalist>
                        </div>

                        <div className="form-group mb-3">
                            <label>Payment Method</label>
                            <select
                                className="form-control"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="cash">Cash</option>
                                <option value="credit">Credit</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-dark d-block mx-auto mt-4 mb-3">
                            Add Expense
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer
            autoClose={1000}
            />
        </div>
    );
};

export default ExpenseForm;
