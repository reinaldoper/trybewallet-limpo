// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  REQUEST_API, REJECTED_API, REQUEST_WALLET, REMOVE, EDIT, EDIT_WALLET,
} from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  edit: false,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      edit: true,
    };
  case GET_CURRENCIES:
    return { ...state,
      currencies: Object.values(action.data)
        .filter(({ codein }) => codein !== 'BRLT')
        .map(({ code }) => code),
    };
  case REJECTED_API:
    return {
      ...state,
    };
  case REQUEST_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, action.data],
      editor: false,
    };
  case EDIT_WALLET:
    return {
      ...state,
      expenses: action.data,
      editor: false,
    };
  case REMOVE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.data),
    };
  case EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: action.data,
      /* expenses: [...state], */
    };
  default:
    return state;
  }
};

export default wallet;
