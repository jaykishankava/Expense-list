Expense Tracker Application
This Expense Tracker is a React-based web application that helps users manage their daily expenses by allowing them to add, view, and analyze expenses through various categories. Users can track their spending, filter expenses by category or description, and view statistics such as monthly expenses and category breakdowns.

Features
1. ExpenseForm Component
Allows users to add new expenses, including details like:
Amount: The amount spent (must be a valid number).
Description: A brief description of the expense.
Date: The date when the expense occurred.
Category: The category under which the expense falls (e.g., Food, Transport, Entertainment).
Payment Method: Users can choose between cash or credit as the payment method.
Expenses are stored in the browser's local storage and can be accessed and modified across sessions.
Error handling with React Toastify to display success/error notifications.
2. ExpenseList Component
Displays a list of all expenses.
Provides a search bar to filter expenses based on category or description.
Includes a delete button for removing expenses, updating the list in real-time and syncing changes to local storage.
Error handling with React Toastify to display deletion notifications.
3. Charts Component
Visual representation of expenses:
Monthly Expenses Chart: A line chart showing the total expenses for each month.
Category Breakdown: A pie chart that breaks down the expenses based on categories.
Built using Chart.js library, providing interactive and dynamic charts.
4. Expense Context and Reducer
Global state management of expenses using React's useReducer and useContext hooks.
Actions:
ADD_EXPENSE: Adds a new expense to the state and updates local storage.
DELETE_EXPENSE: Deletes an expense from the state and removes it from local storage.
SET_EXPENSES: Initializes the expenses from local storage when the app is loaded.
Dependencies
React: A JavaScript library for building user interfaces.
React Toastify: For displaying toast notifications (success and error messages).
React Chart.js 2: For displaying dynamic charts with Chart.js.
LocalStorage: Used to persist expenses between sessions.
Folder Structure
src/components:
ExpenseForm.js: Contains the form for adding a new expense.
ExpenseList.js: Displays the list of added expenses with filtering and deletion options.
Charts.js: Renders the expense statistics in graphical form.
src/context:
ExpenseContext.js: Contains the context and reducer for managing expenses globally across components.
Local Storage
Expenses are stored in the browser's local storage, making the data persistent across sessions. This avoids data loss when the user closes the application or refreshes the page.
Future Improvements
Implement user authentication so that multiple users can manage their own expenses.
Add an option to edit expenses.
Support for additional payment methods such as PayPal or bank transfers.
Enhanced reporting features, like comparing expenses year-over-year.