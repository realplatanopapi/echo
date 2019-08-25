import React from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid currentColor;
  color: white;
  display: inline-block;
  font-size: 0.9em;
  padding: 0.5em 1em;

  -webkit-appearance: none;

  &:focus,
  &:hover {
    border-color: blue;
  }

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`

export default function Button(props: ButtonProps) {
  return <StyledButton {...props} />
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
