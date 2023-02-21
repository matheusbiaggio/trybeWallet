import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { getCurrencies } from '../redux/actions';
import Table from '../components/Table';
import WrapperCenter from '../components/styledComponents/wrapper/WrapperCenter';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const currencies = await this.filterCodeCurrencies();
    dispatch(getCurrencies(currencies));
  }

  fetchCurrenciesFromAPI = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    return json;
  };

  filterCodeCurrencies = async () => {
    const currencies = await this.fetchCurrenciesFromAPI();
    delete currencies.USDT;
    const currenciesCode = Object.keys(currencies);
    return currenciesCode;
  };

  render() {
    return (
      <div>
        <Header />
        <WrapperCenter>
          <WalletForm />
        </WrapperCenter>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
