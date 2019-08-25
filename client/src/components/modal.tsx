import React, { ReactNode, useEffect } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 2;
`

const Children = styled.div`
  background: black;
  border: 1px solid white;
  max-width: 95%;
  padding: 1em;
  width: 420px;
`

export default function Modal(props: ModalProps) {
  return (
    <Overlay onClick={() => props.onExit()}>
      <Children onClick={event => event.stopPropagation()}>
        {props.children}
      </Children>
    </Overlay>
  )
}

interface ModalProps {
  children: ReactNode
  onExit: () => any
}
