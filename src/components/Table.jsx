import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expense } = this.props;
    console.log(expense);
    const somaValue = expense.map((item, index) => {
      const { value, currency, exchangeRates, description, tag, method } = item;
      const { name, ask } = exchangeRates[currency];
      const result = ask * value;
      const valor = `${value}.00`;
      const convertMoeda = Math.round(ask * 100) / 100;
      const convertReal = Math.round((result) * 100) / 100;
      /* const soma = Math.round(result * 100) / 100; */
      return (
        <tbody key={ index }>
          <tr>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{valor}</td>
            <td>{name}</td>
            <td>{convertMoeda}</td>
            <td>{convertReal}</td>
            <td>Real</td>
            {/* <td>{' '}</td> */}
          </tr>
        </tbody>
      );
    });
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {somaValue}
      </table>
    );
  }
}

Table.propTypes = {
  expense: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Table);
