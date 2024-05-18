const expenseForm = document.getElementById('expenseForm');
const expenseTable = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
const categorySummary = document.getElementById('categorySummary');

let expenses = [];

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    const expense = {
        id: Date.now(),
        amount: parseFloat(amount),
        category: category,
        date: date
    };

    expenses.push(expense);
    renderExpenses();
    renderSummary();
    expenseForm.reset();
});

function renderExpenses() {
    expenseTable.innerHTML = '';

    expenses.forEach(expense => {
        const row = expenseTable.insertRow();

        const cellAmount = row.insertCell(0);
        const cellCategory = row.insertCell(1);
        const cellDate = row.insertCell(2);
        const cellActions = row.insertCell(3);

        cellAmount.textContent = expense.amount.toFixed(2);
        cellCategory.textContent = expense.category;
        cellDate.textContent = expense.date;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editExpense(expense.id);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteExpense(expense.id);

        cellActions.appendChild(editButton);
        cellActions.appendChild(deleteButton);
    });
}

function editExpense(id) {
    const expense = expenses.find(expense => expense.id === id);
    
    if (expense) {
        document.getElementById('amount').value = expense.amount;
        document.getElementById('category').value = expense.category;
        document.getElementById('date').value = expense.date;

        deleteExpense(id);
    }
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    renderExpenses();
    renderSummary();
}

function renderSummary() {
    const summary = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = 0;
        }
        acc[expense.category] += expense.amount;
        return acc;
    }, {});

    categorySummary.innerHTML = '';

    for (const [category, total] of Object.entries(summary)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${category}: $${total.toFixed(2)}`;
        categorySummary.appendChild(listItem);
    }
}

renderExpenses();
renderSummary();
