import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../redux/actions';
import HeaderTable from './styledComponents/table/HeaderTable';
import WrapperCenter from './styledComponents/wrapper/WrapperCenter';
import TableS from './styledComponents/table/Table';
import Button from './styledComponents/buttons/ButtonDelete';
import BodyTable from './styledComponents/table/BodyTable';

class Table extends Component {
  handleClick = (element) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(element));
  };

  render() {
    const { expenses } = this.props;
    return (
      <WrapperCenter>
        <TableS>
          <HeaderTable>
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
          </HeaderTable>
          {
            expenses.length
              ? (
                <BodyTable>
                  {
                    expenses.map((element) => (
                      <tr key={ element.id }>
                        <td>{element.description}</td>
                        <td>{element.tag}</td>
                        <td>{element.method}</td>
                        <td>{(parseFloat(element.value)).toFixed(2)}</td>
                        <td>{element.exchangeRates[`${element.currency}`].name}</td>
                        <td>
                          {(parseFloat(element.exchangeRates[`${element.currency}`].ask))
                            .toFixed(2)}

                        </td>
                        <td>
                          {(parseFloat(element.value)
                            * parseFloat(element
                              .exchangeRates[`${element.currency}`].ask))
                            .toFixed(2)}
                        </td>
                        <td>Real</td>
                        <td>
                          <Button
                            type="button"
                            data-testid="delete-btn"
                            onClick={ () => this.handleClick(element) }
                          >
                            Excluir
                          </Button>
                        </td>
                      </tr>
                    ))
                  }
                </BodyTable>)
              : <tbody />
          }
        </TableS>
      </WrapperCenter>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Table);
