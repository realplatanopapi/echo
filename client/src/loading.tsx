import React, { useState, useEffect } from 'react'
import { CenterContent, FillParent } from './styles'

export default function Loading() {
  const [shouldRender, setShouldRender] = useState(false)

  // make app seem faster by not actually rendering anything until a certain amount of time has passed
  useEffect(() => {
    const renderTimeout = setTimeout(() => {
      setShouldRender(true)
    }, 150)

    return () => {
      clearTimeout(renderTimeout)
    }
  })

  if (!shouldRender) {
    return null
  }

  return <CenterContent as={FillParent}>Loading</CenterContent>
}
