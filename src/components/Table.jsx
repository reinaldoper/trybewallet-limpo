import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <div>
        <table border="1">
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Table;
