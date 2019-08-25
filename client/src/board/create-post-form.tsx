import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { createPost as createPostMutation, getNearbyPosts } from '../api'
import { Coordinates, Post } from '../types'
import Form from '../components/form'
import Button from '../components/button'

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
          refetchQueries: [
            {
              query: getNearbyPosts,
              variables: {
                query: {
                  latitude: props.coordinates.latitude,
                  longitude: props.coordinates.longitude,
                },
              },
            },
          ],
        })

        setContent('')

        if (props.onSubmit) {
          props.onSubmit(data.createPost as Post)
        }
      }}
    >
      <textarea
        value={content}
        onChange={event => setContent(event.target.value)}
      />
      <Button type="submit" disabled={isSubmitDisabled}>
        {loading ? 'loading...' : 'dispatch'}
      </Button>
      {props.onCancel && <Button onClick={props.onCancel}>cancel</Button>}
    </Form>
  )
}

interface CreatePostFormProps {
  coordinates: Coordinates
  parentPostId?: string
  onSubmit?: (post: Post) => void
  onCancel?: () => any
}
