import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

describe('Testando a página inicial "Table"', () => {
  const currencys = 'USD';
  it('Test rendering and inicial values', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const description = screen.getByText('Descrição');
    expect(description).toBeInTheDocument();
    const tag = screen.getByText('Tag');
    expect(tag).toBeInTheDocument();
    const pagamento = screen.getByText('Método de pagamento');
    expect(pagamento).toBeInTheDocument();
    const valor = screen.getByText('Valor');
    expect(valor).toBeInTheDocument();
    const moeda = screen.getByText('Moeda');
    expect(moeda).toBeInTheDocument();
    const cambio = screen.getByText('Câmbio utilizado');
    expect(cambio).toBeInTheDocument();
    const convercao = screen.getByText('Valor convertido');
    expect(convercao).toBeInTheDocument();
    const moedaConvert = screen.getByText('Moeda de conversão');
    expect(moedaConvert).toBeInTheDocument();
    const blt = screen.getByTestId('header-currency-field');
    expect(blt).toBeInTheDocument();
    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
    const mail = screen.getByTestId('email-field');
    expect(mail).toBeInTheDocument();
    const excluir = screen.getByText('Editar/Excluir');
    expect(excluir).toBeInTheDocument();
  });
  it('Testing component walletForm', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputName = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const currencyInput = await screen.findByTestId('currency-input');
    const inputMethod = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const button = screen.getByText('Adicionar despesa');

    userEvent.type(inputName, '2');
    expect(inputName).toHaveValue(2);
    userEvent.type(inputDescription, 'cafe');
    expect(inputDescription).toHaveValue('cafe');
    userEvent.selectOptions(currencyInput, currencys);
    expect(currencyInput).toHaveValue(currencys);
    userEvent.selectOptions(inputMethod, 'Dinheiro');
    expect(inputMethod).toHaveValue('Dinheiro');
    userEvent.selectOptions(tagInput, 'Alimentação');
    expect(tagInput).toHaveValue('Alimentação');
    userEvent.click(button);

    /* await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); */
  });
});
