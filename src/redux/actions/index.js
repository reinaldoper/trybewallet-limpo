export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_API = 'REQUEST_API';

const submitLogin = (LoginProfile) => ({
  type: LOGIN_SUBMIT,
  user: LoginProfile.email,
});

export const requestAPI = () => ({ type: REQUEST_API });

export const getCurrencies = (data) => ({ type: GET_CURRENCIES, data });

export function fetchAPI() {
  return (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(getCurrencies(json)));
  };
}

export { submitLogin };// Coloque aqui suas actions
