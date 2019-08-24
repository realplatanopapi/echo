import React, { useState } from 'react'

import { Coordinates } from './types'
import TitleScreen from './title-screen'
import Board from './board'

export default function App() {
  const [coordinates, setCoordinates] = useState<Coordinates>()

  if (coordinates) {
    return <Board coordinates={coordinates} />
  } else {
    return <TitleScreen onGetCoordinates={setCoordinates} />
  }
}
