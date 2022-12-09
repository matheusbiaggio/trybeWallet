import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
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
    const askCurrency = exchangeRates[`${currency}`].ask;
    const expenseObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      ask: askCurrency,
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
      <div>
        <label htmlFor="value">
          Valor gasto
          <input
            type="number"
            data-testid="value-input"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
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
          </select>
        </label>
        <label htmlFor="method">
          Modo de pagamento
          <select
            name="method"
            id="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="money">Dinheiro</option>
            <option value="creditCard">Cartão de crédito</option>
            <option value="debitCard">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tipo da despesa
          <select
            name="tag"
            id="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
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
