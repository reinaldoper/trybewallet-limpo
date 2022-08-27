// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, REQUEST_API } from '../actions';

const initialState = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
    edit: false,
  },
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
        .map(({ code }) => code) };
  default:
    return state;
  }
};

export default wallet;
