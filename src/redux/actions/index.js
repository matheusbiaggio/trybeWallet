// Coloque aqui suas actions

export const REQUEST_CHANGE_EMAIL = 'REQUEST_CHANGE_EMAIL';
export const REQUEST_CURRENCIES_API = 'REQUEST_CURRENCIES_API';
export const REQUEST_EXPENSE = 'REQUEST_EXPENSE';
export const REQUEST_DELETE = 'REQUEST_DELETE';

export const changeEmail = (inputEmail) => ({
  type: REQUEST_CHANGE_EMAIL,
  email: inputEmail,
});

export const getCurrencies = (currenciesArray) => ({
  type: REQUEST_CURRENCIES_API,
  currencies: currenciesArray,
});

export const addExpense = (expenseObj) => ({
  type: REQUEST_EXPENSE,
  expenses: expenseObj,
});

export const removeExpense = (expense) => ({
  type: REQUEST_DELETE,
  expenses: expense,
});
