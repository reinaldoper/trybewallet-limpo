import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, walletDispacth, fetchAPIRequest4, editWallet } from '../redux/actions';

class WalletForm extends Component {
  state = {
    description: '',
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    habilit: true,
    exchangeRates: [],
  };

  componentDidMount() {
    const { expenses } = this.props;
    expenses();
  }

  atualiza = () => {
    const { expense, idState } = this.props;
    const result = expense.find((item) => item.id === idState);
    console.log(result);
    console.log(this.state);
    this.setState({
      ...result,
      habilit: false,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handClickAdd = async () => {
    const { dispatchTotal, expense/* , edit */ } = this.props;
    /* if (edit) this.atualiza(); */
    const id = expense.length;
    const { description, value, method, tag, currency } = this.state;
    dispatchTotal({
      description,
      value,
      method,
      tag,
      currency,
      id,
      exchangeRates: await fetchAPIRequest4(),
    });
    this.setState({
      value: '',
      description: '',
      habilit: true,
    });
  };

  editClickAdd = async () => {
    const { editTotal, /*  edit, */ idState, expense } = this.props;
    const { value, description, method, tag, currency, exchangeRates } = this.state;
    const result = expense.map((item) => {
      if (item.id === idState) {
        item.description = description;
        item.value = value;
        item.currency = currency;
        item.method = method;
        item.tag = tag;
        item.exchangeRates = exchangeRates;
      }
      return item;
    });
    editTotal(result);
    this.setState({
      value: '',
      description: '',
      habilit: true,
    });
  };

  render() {
    const { curr, edit } = this.props;
    const { value, description, currency, method, tag, habilit } = this.state;
    if (edit && habilit) this.atualiza();

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
            /* data-testid="edit-btn" */
            onClick={ !edit ? this.handClickAdd : this.editClickAdd }
          >
            {edit ? 'Editar despesa' : 'Adicionar despesa'}
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
  edit: PropTypes.string.isRequired,
  idState: PropTypes.string.isRequired,
  editTotal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  curr: state.wallet.currencies,
  expense: state.wallet.expenses,
  edit: state.wallet.editor,
  idState: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  expenses: () => dispatch(fetchAPI()),
  dispatchTotal: (data) => dispatch(walletDispacth(data)),
  editTotal: (data) => dispatch(editWallet(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
