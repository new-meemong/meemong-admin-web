import { createGlobalStyle, css } from "styled-components";

const fontStyle = css``;

const GlobalStyles = createGlobalStyle`
  ${fontStyle}

  body {
    font-family: 'SUIT', sans-serif;
    color : ${(props) => props.theme.black2_C};
    padding: 0;
    margin: 0;
  }

  a {
    color : inherit;
    text-decoration : none;
  }

  textarea {
    resize: none;
    outline: none;
  }

  input {
    outline: none;
  }
  
  a:hover {
    color : inherit;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }



`;

export default GlobalStyles;
