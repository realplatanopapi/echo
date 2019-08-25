import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'

import { createPost as createPostMutation, getNearbyPosts } from '../api'
import { Coordinates, Post } from '../types'
import Form from '../components/form'
import Button from '../components/button'

export default function CreatePostForm(props: CreatePostFormProps) {
  const [createPost, { loading, error, data }] = useMutation(createPostMutation)
  const [content, setContent] = useState('')
  const isSubmitDisabled = loading || content.trim().length === 0

  return (
    <>
      <h2>{props.parentPostId ? 'Add a comment' : 'Create post'}</h2>
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
        <Textarea
          value={content}
          onChange={event => setContent(event.target.value)}
        />
        <Button type="submit" disabled={isSubmitDisabled}>
          {loading ? 'loading...' : 'dispatch'}
        </Button>
        {props.onCancel && <Button onClick={props.onCancel}>cancel</Button>}
      </Form>
    </>
  )
}

const Textarea = styled.textarea`
  display: block;
  margin-bottom: 1em;
  min-height: 6em;
  resize: vertical;
  width: 100%;
`

interface CreatePostFormProps {
  coordinates: Coordinates
  parentPostId?: string
  onSubmit?: (post: Post) => void
  onCancel?: () => any
}
