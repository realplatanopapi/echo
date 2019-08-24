import React, { Suspense, lazy, useState } from 'react'

import { Post, Coordinates } from '../types'
import Posts from './posts'

const CreatePostForm = lazy(() => import('./create-post-form'))
const PostDetails = lazy(() => import('./post-details'))

export default function Board(props: BoardProps) {
  const [postDetails, setPostDetails] = useState<Post | null>(null)

  return (
    <>
      <Posts
        posts={props.posts}
        onPostClick={post => {
          setPostDetails(post)
        }}
      />
      <Suspense fallback="loading...">
        <CreatePostForm
          coordinates={props.coordinates}
          onSubmit={props.onCreatePost}
        />
      </Suspense>
      <Suspense fallback="loading...">
        {postDetails && <PostDetails post={postDetails} />}
      </Suspense>
    </>
  )
}

interface BoardProps {
  coordinates: Coordinates
  posts: Post[]
  onCreatePost: () => void
}
