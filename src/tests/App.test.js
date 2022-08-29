import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testando a página inicial "Login"', () => {
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
});
