import React, { Suspense, lazy } from 'react'

import { Post, Coordinates } from '../types'
import Posts from './posts'

const CreatePostForm = lazy(() => import('./create-post-form'))

export default function Board(props: BoardProps) {
  return (
    <>
      <Posts posts={props.posts} />
      <Suspense fallback="loading...">
        <CreatePostForm
          coordinates={props.coordinates}
          onSubmit={props.onCreatePost}
        />
      </Suspense>
    </>
  )
}

interface BoardProps {
  coordinates: Coordinates
  posts: Post[]
  onCreatePost: () => void
}
