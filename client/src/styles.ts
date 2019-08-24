import styled, { createGlobalStyle } from 'styled-components'

export const FillParent = styled.div`
  height: 100%;
  width: 100%;
`

export const CenterContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

export const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  html {
    background: black;
    color: white;
    box-sizing: border-box;
    font-family: sans-serif;

    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  h1,
  p {
    margin-top: 0;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`
