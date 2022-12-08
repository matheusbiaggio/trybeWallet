// Coloque aqui suas actions

export const REQUEST_CHANGE_EMAIL = 'REQUEST_CHANGE_EMAIL';

const changeEmail = () => ({
  type: REQUEST_CHANGE_EMAIL,
  email,
});

export const saveEmail = () => () => {
  return async (dispatch) => {
    dispatch(changeEmail());
  }
};
