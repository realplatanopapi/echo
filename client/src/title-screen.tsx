import React from 'react'

import useGeolocation from './hooks/use-geolocation'
import { Coordinates } from './types'
import { CenterContent, FillParent } from './styles'

interface TitleScreenProps {
  onGetCoordinates: (coordinates: Coordinates) => void
}

export default function TitleScreen(props: TitleScreenProps) {
  const geolocation = useGeolocation()

  return (
    <CenterContent as={FillParent}>
      <div>
        <h1>Echo</h1>
        <button
          disabled={geolocation.isLoading}
          onClick={async () => {
            const { coords } = await geolocation.getLocation()
            props.onGetCoordinates({
              latitude: coords.latitude,
              longitude: coords.longitude,
            })
          }}
        >
          {geolocation.isLoading ? 'Loading...' : 'where u at'}
        </button>
      </div>
    </CenterContent>
  )
}
