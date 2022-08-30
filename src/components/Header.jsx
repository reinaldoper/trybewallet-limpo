import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expense } = this.props;
    const somaValue = expense.map((item) => {
      const { value, currency, exchangeRates } = item;
      const { ask } = exchangeRates[currency];
      return ask * value;
    });
    let result = expense.length > 0
      ? Math.round(somaValue.reduce((acc, curr) => acc + curr) * 100) / 100
      : 0;
    if (result === 0) {
      result = '0.00';
    }
    return (
      <header>
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">{result}</div>
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expense: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
