export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_API = 'REQUEST_API';
export const REJECTED_API = 'REJECTED_API';
export const REQUEST_WALLET = 'REQUEST_WALLET';

export const submitLogin = (LoginProfile) => ({
  type: LOGIN_SUBMIT,
  user: LoginProfile.email,
});

export const requestAPI = () => ({ type: REQUEST_API });

export const getCurrencies = (data) => ({
  type: GET_CURRENCIES,
  data,
});

export const walletDispacth = (data) => ({ type: REQUEST_WALLET, data });

export const errorApi = (error) => ({ type: REJECTED_API, error });

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(getCurrencies(json)))
      .catch((error) => dispatch(errorApi(error)));
  };
}

export async function fetchAPIRequest4() {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await request.json();
  delete response.USDT;
  return response;
}
