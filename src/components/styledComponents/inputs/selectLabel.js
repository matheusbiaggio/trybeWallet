import styled from 'styled-components';

const Select = styled.select`
  width: 70%;
  height:35px;
  background: white;
  color: #eb9d8d;
  padding-left: 5px;
  font-size: 14px;
  border:none;
  margin-left: 10px;
  border-radius: 4px;

       option {
         color: black;
         background: white;
         font-weight: small;
         display: flex;
         white-space: pre;
         min-height: 20px;
         padding: 0px 2px 1px;
       }
`;

export default Select;
