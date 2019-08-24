import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: inherit
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: border-box;
    font-family: sans-serif;
  }

  p {
    margin-top: 0;
  }
`
