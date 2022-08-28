import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  state = {
    description: '',
    valueCompra: 0,
  };

  componentDidMount() {
    const { despesas } = this.props;
    despesas();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { currency } = this.props;
    /* const result = currency.map((item, index) => (<li key={ index }>{item}</li>)); */
    const { valueCompra, description } = this.state;
    return (
      <div>
        <form>
          <input
            type="number"
            data-testid="value-input"
            name="valueCompra"
            value={ valueCompra }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <select name="select" data-testid="currency-input">
            {currency.map((item) => (
              <option key={ item } value={ item }>
                {item}
              </option>))}
          </select>
          <select name="select" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select name="select" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  despesas: PropTypes.func.isRequired,
  currency: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  despesas: () => dispatch(fetchAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
