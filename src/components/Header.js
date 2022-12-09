import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    currency: 'BRL',
  };

  totalExpense = () => {
    const { expenses } = this.props;
    let totalExpenses = 0.00;
    if (expenses.length > 0) {
      for (let i = 0; i < expenses.length; i += 1) {
        console.log(totalExpenses, '+', expenses[i].value, '*', expenses[i].ask);
        totalExpenses += parseFloat(parseFloat(expenses[i].value)
        * parseFloat(expenses[i].ask));
      }
      return totalExpenses.toFixed(2);
    }
    return totalExpenses;
  };

  render() {
    const { email } = this.props;
    const { currency } = this.state;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p>Despesa total: </p>
        <p data-testid="total-field">
          { this.totalExpense() }
        </p>
        <p data-testid="header-currency-field">{currency}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
