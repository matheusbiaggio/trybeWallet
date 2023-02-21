import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html, #root {
    background: #efd8a9;
    height: 100%;
    font-family: -apple-system,
      Ubuntu ,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }
`;

export default globalStyle;
