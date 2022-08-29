import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testando a página inicial "Login"', () => {
  const info = () => {
    const emailInnput = screen.getByTestId('email-input');
    const passwordInnput = screen.getByTestId('password-input');
    const textEntrar = screen.getByText('Entrar');
    return {
      emailInnput, passwordInnput, textEntrar,
    };
  };
  const emails = 'trybe@trybe.com.br';
  const password = 'escolatrybe';
  it('Test rendering and inicial values', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInnput = screen.getByTestId('email-input');
    expect(emailInnput).toBeInTheDocument();
    const passwordInnput = screen.getByTestId('password-input');
    expect(passwordInnput).toBeInTheDocument();
    const textEntrar = screen.getByText('Entrar');
    expect(textEntrar).toBeInTheDocument();
    expect(emailInnput).toHaveValue('');
    expect(passwordInnput).toHaveValue('');
  });
  it('Test submit values', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const { emailInnput, passwordInnput, textEntrar } = info();

    userEvent.type(emailInnput, emails);
    userEvent.type(passwordInnput, password);

    expect(emailInnput).toHaveValue(emails);
    expect(passwordInnput).toHaveValue(password);

    userEvent.click(textEntrar);

    expect(history.location.pathname).toBe('/carteira');
  });
});
