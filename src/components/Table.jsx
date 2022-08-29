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
      const convertReal = Math.round((result * ask) * 100) / 100;
      const soma = Math.round(result * 100) / 100;
      return (
        <tbody key={ index }>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
          <tr>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{soma}</td>
            <td>{name}</td>
            <td>{currency}</td>
            <td>{convertReal}</td>
            <td>Real</td>
            <td>{' '}</td>
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
