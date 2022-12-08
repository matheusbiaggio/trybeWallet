// Coloque aqui suas actions

export const REQUEST_CHANGE_EMAIL = 'REQUEST_CHANGE_EMAIL';

export const changeEmail = (inputEmail) => ({
  type: REQUEST_CHANGE_EMAIL,
  email: inputEmail,
});
