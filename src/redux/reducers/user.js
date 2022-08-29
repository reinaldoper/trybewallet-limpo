// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_SUBMIT } from '../actions';

const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_SUBMIT:
    return {
      ...state,
      email: action.user,
    };
  default:
    return state;
  }
};

export default user;
