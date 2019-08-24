import React from 'react'

import { Post, Coordinates } from '../types'
import Posts from './posts'
import CreatePostForm from './create-post-form'

export default function Board(props: BoardProps) {
  return (
    <>
      <Posts posts={props.posts} />
      <CreatePostForm
        coordinates={props.coordinates}
        onSubmit={props.onCreatePost}
      />
    </>
  )
}

interface BoardProps {
  coordinates: Coordinates
  posts: Post[]
  onCreatePost: () => void
}
