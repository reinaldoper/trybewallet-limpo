import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removet } from '../redux/actions';

class Table extends Component {
  removeExpense = (id) => {
    const { expense, dispatchTotal } = this.props;
    const result = expense.filter((item) => item.id === id);
    dispatchTotal(result);
  };

  render() {
    const { expense } = this.props;
    const somaValue = expense.map((item, index) => {
      const { value, currency, exchangeRates, description, tag, method, id } = item;
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
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.removeExpense(id) }
              >
                Delete
              </button>
            </td>
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
  dispatchTotal: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchTotal: (data) => dispatch(removet(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
