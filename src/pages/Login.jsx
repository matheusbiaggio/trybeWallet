import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../redux/actions';

class Login extends Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    btnDisabled: true,
  };

  btnValidation = () => {
    const { inputEmail, inputPassword } = this.state;
    const MIN_PASSWORD_LENGTH = 5;
    if (
      inputEmail.includes('@')
      && inputEmail.includes('.com')
      && inputPassword.length > MIN_PASSWORD_LENGTH) {
      this.setState({ btnDisabled: false });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.btnValidation());
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { inputEmail } = this.state;
    dispatch(saveEmail(inputEmail));
    return history.push('/carteira');
  };

  render() {
    const { btnDisabled } = this.state;
    return (
      <form>
        <div className="inputEmail">
          <label htmlFor="inputEmail">
            Email:
            <input
              type="email"
              id="inputEmail"
              name="inputEmail"
              data-testid="email-input"
              placeholder="Email"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div className="inputPassword">
          <label htmlFor="inputPassword">
            Senha:
            <input
              type="password"
              id="inputPassword"
              name="inputPassword"
              data-testid="password-input"
              placeholder="Senha"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <button
          type="button"
          disabled={ btnDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    email: state.user.email,
  };
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
