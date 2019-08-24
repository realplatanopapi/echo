import { useState } from 'react'

export default function useGeolocation() {
  const [position, setPosition] = useState<Position | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<PositionError | null>(null)

  const getLocation = async () => {
    setIsLoading(true)

    let result
    try {
      result = (await new Promise((resolve, reject) => {
        window.navigator.geolocation.getCurrentPosition(resolve, reject)
      })) as Position
      setPosition(result)
    } catch (error) {
      setError(error as PositionError)
    }

    setIsLoading(false)

    return result
  }

  return {
    getLocation,
    error,
    isLoading,
    position,
  }
}
