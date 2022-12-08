// Coloque aqui suas actions

export const REQUEST_CHANGE_EMAIL = 'REQUEST_CHANGE_EMAIL';

const changeEmail = (inputEmail) => ({
  type: REQUEST_CHANGE_EMAIL,
  email: inputEmail,
});

export const saveEmail = (inputEmail) => (dispatch) => {
  dispatch(changeEmail(inputEmail));
};
