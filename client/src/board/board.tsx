import React, { Suspense, lazy, useState } from 'react'

import { Post, Coordinates } from '../types'
import Posts from './posts'
import Loading from '../loading'

const CreatePostForm = lazy(() => import('./create-post-form'))
const PostDetails = lazy(() => import('./post-details'))

export default function Board(props: BoardProps) {
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [postDetails, setPostDetails] = useState<Post | null>(null)

  return (
    <>
      <div
        style={{
          position: 'absolute',
        }}
      >
        <Suspense fallback={<Loading />}>
          <button
            onClick={() => {
              setIsCreatingPost(true)
            }}
          >
            create post
          </button>
          {isCreatingPost && (
            <CreatePostForm
              coordinates={props.coordinates}
              onCancel={() => {
                setIsCreatingPost(false)
              }}
              onSubmit={post => {
                setIsCreatingPost(false)
                setPostDetails(post)
                props.onCreatePost()
              }}
            />
          )}
          {postDetails && (
            <PostDetails
              post={postDetails}
              onExit={() => {
                setPostDetails(null)
              }}
            />
          )}
        </Suspense>
      </div>
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
