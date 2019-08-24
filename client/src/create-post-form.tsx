import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { createPost as createPostMutation } from './api'
import { Coordinates } from './types'

export default function CreatePostForm(props: CreatePostFormProps) {
  const [createPost, { loading, error, data }] = useMutation(createPostMutation)
  const [content, setContent] = useState('')
  const isSubmitDisabled = loading || content.trim().length === 0

  return (
    <form
      onSubmit={async event => {
        event.preventDefault()
        if (isSubmitDisabled) {
          return
        }

        await createPost({
          variables: {
            input: {
              content,
              latitude: props.coordinates.latitude,
              longitude: props.coordinates.longitude,
            },
          },
        })

        setContent('')

        props.onSubmit()
      }}
    >
      <textarea
        value={content}
        onChange={event => setContent(event.target.value)}
      />
      <button type="submit" disabled={isSubmitDisabled}>
        {loading ? 'loading...' : 'dispatch'}
      </button>
    </form>
  )
}

interface CreatePostFormProps {
  coordinates: Coordinates
  onSubmit: () => void
}