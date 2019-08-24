import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { createPost as createPostMutation } from '../api'
import { Coordinates, Post } from '../types'
import Form from '../form'

export default function CreatePostForm(props: CreatePostFormProps) {
  const [createPost, { loading, error, data }] = useMutation(createPostMutation)
  const [content, setContent] = useState('')
  const isSubmitDisabled = loading || content.trim().length === 0

  return (
    <Form
      onSubmit={async () => {
        if (isSubmitDisabled) {
          return
        }

        const { data } = await createPost({
          variables: {
            input: {
              content,
              latitude: props.coordinates.latitude,
              longitude: props.coordinates.longitude,
              parentId: props.parentPostId,
            },
          },
        })

        setContent('')

        props.onSubmit(data.createPost as Post)
      }}
    >
      <textarea
        value={content}
        onChange={event => setContent(event.target.value)}
      />
      <button type="submit" disabled={isSubmitDisabled}>
        {loading ? 'loading...' : 'dispatch'}
      </button>
      {props.onCancel && <button onClick={props.onCancel}>cancel</button>}
    </Form>
  )
}

interface CreatePostFormProps {
  coordinates: Coordinates
  parentPostId?: string
  onSubmit: (post: Post) => void
  onCancel?: () => any
}
