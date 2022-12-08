import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    totalExpense: 0,
    currency: 'BRL',
  };

  render() {
    const { email } = this.props;
    const { totalExpense, currency } = this.state;
    console.log(email);
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          Despesa total:
          {totalExpense}
        </p>
        <p data-testid="header-currency-field">{currency}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
