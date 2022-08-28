import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions';

const MIN_CARACTERES = 6;
class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      habilit: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const validEmail = this.validateEmail();
      const validadPassword = this.validPassword();
      const result = validadPassword >= MIN_CARACTERES;
      if (validEmail === true && result === true) {
        this.setState({
          habilit: false,
        });
      } else {
        this.setState({
          habilit: true,
        });
      }
    });
  }

  handleSubmit() {
    const { user, history } = this.props;
    user({ ...this.state });
    history.push('/carteira');
  }

  validateEmail = () => {
    const { email } = this.state;
    const reg = /\S+@\S+\.\S+/;
    return reg.test(email);
  };

  validPassword = () => {
    const { password } = this.state;
    return password.length;
  };

  render() {
    const { email, password, habilit } = this.state;
    return (
      <section>
        <form>
          <input
            type="email"
            required
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
            name="email"
          />
          <input
            type="text"
            required
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
            name="password"
          />
          <button
            type="button"
            disabled={ habilit }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  user: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  user: (profile) => dispatch(submitLogin(profile)),
});

export default connect(null, mapDispatchToProps)(Login);
