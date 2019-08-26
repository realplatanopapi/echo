import React, { useEffect, useState } from 'react'

import keyCodes from '../util/key-codes'

export default function Form(props: FormProps) {
  const [didMount, setDidMount] = useState(false)

  const { onSubmit, ...otherProps } = props
  const formRef = React.createRef<HTMLFormElement>()

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey && event.keyCode === keyCodes.enter) {
      onSubmit()
    }
  }

  useEffect(() => {
    const formEl = formRef.current
    if (!formEl) {
      return
    }

    if (!didMount) {
      const firstInput = formEl.querySelector('input,textarea')
      if (firstInput) {
        ;(firstInput as HTMLElement).focus()
      }
      setDidMount(true)
    }

    formEl.addEventListener('keydown', onKeyDown)

    return () => {
      formEl.removeEventListener('keydown', onKeyDown)
    }
  })

  return (
    <form
      ref={formRef}
      {...otherProps}
      onSubmit={event => {
        event.preventDefault()
        onSubmit()
      }}
    />
  )
}

interface FormProps extends React.HTMLProps<HTMLFormElement> {
  onSubmit: () => any
}
