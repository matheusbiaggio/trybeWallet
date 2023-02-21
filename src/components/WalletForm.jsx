import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../redux/actions';
import Input from './styledComponents/inputs/inputsWallet';
import WalletFormS from './styledComponents/form/WalletFormS';
import Button from './styledComponents/buttons/ButtonLogin';
import Container from './styledComponents/form/Container';
import TitleItem from './styledComponents/form/TitleItem';
import Select from './styledComponents/inputs/selectLabel';
import HalfContainer from './styledComponents/form/HalfContainer';
import TitleContainer from './styledComponents/form/TitleContainer';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  fetchCurrenciesFromAPI = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    return json;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const exchangeRates = await this.fetchCurrenciesFromAPI();
    delete exchangeRates.USDT;
    const expenseObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(addExpense(expenseObj));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  render() {
    const { currencies } = this.props;
    const {
      value, description, currency, method, tag,
    } = this.state;
    return (
      <WalletFormS>
        <TitleContainer>
          Adicionar Despesa
        </TitleContainer>
        <Container>
          <HalfContainer>
            <TitleItem>Valor gasto:</TitleItem>
            <Input
              type="number"
              data-testid="value-input"
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </HalfContainer>
          <HalfContainer>
            <TitleItem>Moeda:</TitleItem>
            <Select
              name="currency"
              id="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {
                currencies.map((element) => (
                  <option
                    key={ `code ${element}` }
                    value={ `${element}` }
                  >
                    {element}
                  </option>
                ))
              }
            </Select>
          </HalfContainer>
        </Container>
        <Container>
          <HalfContainer>
            <TitleItem>Modo de pagamento:</TitleItem>
            <Select
              name="method"
              id="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </Select>
          </HalfContainer>
          <HalfContainer>
            <TitleItem>Tipo da despesa:</TitleItem>
            <Select
              name="tag"
              id="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </Select>
          </HalfContainer>
        </Container>
        <Container>
          <TitleItem>Descrição:</TitleItem>
          <Input
            type="text"
            data-testid="description-input"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </Container>
        <Button
          type="button"
          onClick={ this.handleClick }
        >
          Enviar
        </Button>
      </WalletFormS>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
