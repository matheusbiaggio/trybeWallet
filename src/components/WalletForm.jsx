import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <div>
        <input type="number" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select name="currency" data-testid="currency-input">
          <option value="valor1">Valor 1</option>
        </select>
      </div>
    );
  }
}

export default WalletForm;
