import React from 'react'

import keyCodes from '../util/key-codes'

export default function makeAriaButton(Component: React.ComponentType<any>) {
  function AriaButton(props) {
    const { onClick, onKeyDown, ...otherProps } = props

    return (
      <Component
        role="button"
        tabIndex={0}
        {...otherProps}
        onClick={onClick}
        onKeyDown={event => {
          if (onKeyDown) {
            onKeyDown(event)
          }

          const { keyCode } = event
          if (keyCode === keyCodes.enter || keyCode === keyCodes.space) {
            onClick(event)
          }
        }}
      />
    )
  }

  return AriaButton
}
