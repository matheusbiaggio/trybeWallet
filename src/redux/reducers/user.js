// Esse reducer será responsável por tratar as informações da pessoa usuária

import { REQUEST_CHANGE_EMAIL } from '../actions';

export const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CHANGE_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default: return {
    ...state,
  };
  }
};

export default user;
