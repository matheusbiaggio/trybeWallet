import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <input type="number" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select name="currency" data-testid="currency-input">
          {
            currencies.map((element) => (
              <option
                key={ `code ${element}` }
                value={ `code ${element}` }
              >
                {element}
              </option>
            ))
          }
        </select>
        <select
          name="paymentMethod"
          id="paymentMethod"
          data-testid="method-input"
        >
          <option value="money">Dinheiro</option>
          <option value="creditCard">Cartão de crédito</option>
          <option value="debitCard">Cartão de débito</option>
        </select>
        <select
          name="expenses"
          id="expenses"
          data-testid="tag-input"
        >
          <option value="food">Alimentação</option>
          <option value="leisure">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
