import React from 'react'
import styled from 'styled-components'

import Button from './components/button'
import { Coordinates } from './types'
import { CenterContent, FillParent } from './styles'
import useGeolocation from './hooks/use-geolocation'

const Wrapper = styled.div`
  text-align: center;
`

export default function TitleScreen(props: TitleScreenProps) {
  const geolocation = useGeolocation()

  return (
    <CenterContent as={FillParent}>
      <Wrapper>
        <h1>Echo</h1>
        <Button
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
        </Button>
        {geolocation.error && (
          <p>
            <strong>couldn't get your location. try again later</strong>
          </p>
        )}
      </Wrapper>
    </CenterContent>
  )
}

interface TitleScreenProps {
  onGetCoordinates: (coordinates: Coordinates) => void
}
