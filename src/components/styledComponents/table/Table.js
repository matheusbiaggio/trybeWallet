import styled from 'styled-components';

const TableS = styled.table`
  margin-top: 20px;
  border-spacing: 0;
    border: 2px solid #f9f9fa;;

    tr {
      :last-child {
        td {
          border-bottom: 0;
          text-align: center;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 2px solid #f9f9fa;
      border-right: 2px solid #f9f9fa;
      text-align: center;

      :last-child {
        border-right: 0;
      }
    }
`;

export default TableS;
