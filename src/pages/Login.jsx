import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeEmail } from '../redux/actions/index';
import AvailableButton from '../components/styledComponents/buttons/ButtonLogin';
import WrapperCenter from '../components/styledComponents/wrapper/WrapperCenter';
import Form from '../components/styledComponents/Form';
import Input from '../components/styledComponents/inputs/inputsLogin';

class Login extends Component {
  state = {
    email: '',
    inputPassword: '',
    btnDisabled: true,
  };

  btnValidation = () => {
    const { email, inputPassword } = this.state;
    const MIN_PASSWORD_LENGTH = 5;
    if (
      email.includes('@')
      && email.includes('.com')
      && inputPassword.length > MIN_PASSWORD_LENGTH) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
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
    const { email } = this.state;
    dispatch(changeEmail(email));
    return history.push('/carteira');
  };

  render() {
    const { btnDisabled } = this.state;
    return (
      <WrapperCenter>
        <Form>
          <Input
            type="email"
            id="email"
            name="email"
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <Input
            type="password"
            id="inputPassword"
            name="inputPassword"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.handleChange }
          />
          <AvailableButton
            type="button"
            disabled={ btnDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </AvailableButton>

        </Form>
      </WrapperCenter>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
