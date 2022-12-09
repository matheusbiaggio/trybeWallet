import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {
            expenses.length
              ? (
                <tbody>
                  {
                    expenses.map((element) => (
                      <tr key={ element.id }>
                        <td>{element.description}</td>
                        <td>{element.tag}</td>
                        <td>{element.method}</td>
                        <td>{(parseFloat(element.value)).toFixed(2)}</td>
                        <td>{element.coin}</td>
                        <td>{(parseFloat(element.ask)).toFixed(2)}</td>
                        <td>
                          {(parseFloat(element.value)
                          * parseFloat(element.ask)).toFixed(2)}
                        </td>
                        <td>Real</td>
                        <td>Editar/Excluir</td>
                      </tr>
                    ))
                  }
                </tbody>)
              : <tbody />
          }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Table);
