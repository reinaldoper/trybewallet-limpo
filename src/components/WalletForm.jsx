import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, walletDispacth, fetchAPIRequest4 } from '../redux/actions';

class WalletForm extends Component {
  state = {
    description: '',
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { expenses } = this.props;
    expenses();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handClickAdd = async () => {
    const { dispatchTotal, expense } = this.props;
    const id = expense.length;
    dispatchTotal({ ...this.state, id, exchangeRates: await fetchAPIRequest4() });
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { curr } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <input
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {curr.map((item) => (
              <option key={ item }>
                {item}
              </option>))}
          </select>
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            onClick={ this.handClickAdd }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  expenses: PropTypes.func.isRequired,
  curr: PropTypes.arrayOf.isRequired,
  expense: PropTypes.arrayOf.isRequired,
  dispatchTotal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  curr: state.wallet.currencies,
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expenses: () => dispatch(fetchAPI()),
  dispatchTotal: (data) => dispatch(walletDispacth(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
