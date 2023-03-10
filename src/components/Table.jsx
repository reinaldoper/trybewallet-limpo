import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removet, edited } from '../redux/actions';

class Table extends Component {
  removeExpense = (id) => {
    const { dispatchTotal } = this.props;
    dispatchTotal(id);
  };

  editExpense = (id) => {
    const { editTotal } = this.props;
    editTotal(id);
  };

  render() {
    const { expense } = this.props;
    const somaValue = expense.map((item) => {
      const { value, currency, exchangeRates, description, tag, method, id } = item;
      const { name, ask } = exchangeRates[currency];
      const result = ask * value;
      const valor = Number(value).toFixed(2);
      const convertMoeda = Number(ask).toFixed(2);
      const convertReal = Number(result).toFixed(2);
      /* const soma = Math.round(result * 100) / 100; */
      return (
        <tbody key={ id }>
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
                data-testid="edit-btn"
                onClick={ () => this.editExpense(id) }
              >
                Editar despesa
              </button>
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
  editTotal: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchTotal: (data) => dispatch(removet(data)),
  editTotal: (data) => dispatch(edited(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
