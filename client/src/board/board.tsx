import React, { Suspense, lazy, useState } from 'react'

import { Post, Coordinates } from '../types'
import Posts from './posts'

const CreatePostForm = lazy(() => import('./create-post-form'))
const PostDetails = lazy(() => import('./post-details'))

export default function Board(props: BoardProps) {
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [postDetails, setPostDetails] = useState<Post | null>(null)

  return (
    <>
      <button
        onClick={() => {
          setIsCreatingPost(true)
        }}
      >
        create post
      </button>
      <Suspense fallback="loading...">
        {isCreatingPost && (
          <CreatePostForm
            coordinates={props.coordinates}
            onSubmit={post => {
              setIsCreatingPost(false)
              setPostDetails(post)
              props.onCreatePost()
            }}
          />
        )}
      </Suspense>
      <Suspense fallback="loading...">
        {postDetails && <PostDetails post={postDetails} />}
      </Suspense>
      <Posts
        posts={props.posts}
        onPostClick={post => {
          setPostDetails(post)
        }}
      />
    </>
  )
}

interface BoardProps {
  coordinates: Coordinates
  posts: Post[]
  onCreatePost: () => void
}
