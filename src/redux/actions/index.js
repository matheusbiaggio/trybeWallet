// Coloque aqui suas actions

export const REQUEST_CHANGE_EMAIL = 'REQUEST_CHANGE_EMAIL';
export const REQUEST_CURRENCIES_API = 'REQUEST_CURRENCIES_API';

export const changeEmail = (inputEmail) => ({
  type: REQUEST_CHANGE_EMAIL,
  email: inputEmail,
});

export const getCurrencies = (currenciesArray) => ({
  type: REQUEST_CURRENCIES_API,
  currencies: currenciesArray,
});
