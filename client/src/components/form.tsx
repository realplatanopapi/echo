import React, { useEffect } from 'react'

import { keyCode } from '../util/key-codes'

export default function Form(props: FormProps) {
  const { onSubmit, ...otherProps } = props
  const formRef = React.createRef<HTMLFormElement>()

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey && event.keyCode === keyCode.enter) {
      onSubmit()
    }
  }

  useEffect(() => {
    const formEl = formRef.current
    if (!formEl) {
      return
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
