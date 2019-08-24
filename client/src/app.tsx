import React, { Suspense, lazy, useState } from 'react'
import styled from 'styled-components'

import { Coordinates } from './types'
import Loading from './loading'

const TitleScreen = React.lazy(() => import('./title-screen'))
const Board = React.lazy(() => import('./board'))

const Main = styled.main`
  top: 0;
  height: 100vh;
  left: 0;
  overflow: auto;
  position: fixed;
  width: 100vw;
  z-index: 0;
`

export default function App() {
  const [coordinates, setCoordinates] = useState<Coordinates>()

  return (
    <Main>
      <Suspense fallback={<Loading />}>
        {coordinates ? (
          <Board coordinates={coordinates} />
        ) : (
          <TitleScreen onGetCoordinates={setCoordinates} />
        )}
      </Suspense>
    </Main>
  )
}
