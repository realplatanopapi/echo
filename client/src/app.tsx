import React, { Suspense, lazy, useState } from 'react'

import { Coordinates } from './types'

const TitleScreen = React.lazy(() => import('./title-screen'))
const Board = React.lazy(() => import('./board'))

export default function App() {
  const [coordinates, setCoordinates] = useState<Coordinates>()

  return (
    <Suspense fallback="loading...">
      {coordinates ? (
        <Board coordinates={coordinates} />
      ) : (
        <TitleScreen onGetCoordinates={setCoordinates} />
      )}
    </Suspense>
  )
}
