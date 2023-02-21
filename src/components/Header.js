import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StyledHeader from './styledComponents/header/StyledHeader';
import Email from './styledComponents/header/Email';
import Container from './styledComponents/header/Container';
import PageTitle from './styledComponents/header/PageTitle';
import TotalField from './styledComponents/header/TotalField';

class Header extends Component {
  state = {
    currency: 'BRL',
  };

  totalExpense = () => {
    const { expenses } = this.props;
    let totalExpenses = 0.00;
    if (expenses.length > 0) {
      for (let i = 0; i < expenses.length; i += 1) {
        const { currency } = expenses[i];
        totalExpenses += parseFloat(parseFloat(expenses[i].value)
        * parseFloat(expenses[i].exchangeRates[`${currency}`].ask));
      }
      return totalExpenses.toFixed(2);
    }
    return totalExpenses.toFixed(2);
  };

  render() {
    const { email } = this.props;
    const { currency } = this.state;
    return (
      <StyledHeader>
        <Container>
          <Email data-testid="email-field">{email}</Email>
          <TotalField>
            <p>Despesa total: </p>
            <p data-testid="total-field">
              { this.totalExpense() }
            </p>
            <p data-testid="header-currency-field">{currency}</p>
          </TotalField>
        </Container>
        <PageTitle>Carteira Virtual</PageTitle>
      </StyledHeader>
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
