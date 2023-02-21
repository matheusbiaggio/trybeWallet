import styled from 'styled-components';

const AvailableButton = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => (props.disabled ? 'gray' : '#c5cba6')};
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: ${(props) => (props.disabled ? 'gray' : '#a8bb9a')};
  }
`;

export default AvailableButton;
