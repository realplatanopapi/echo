import React, { Suspense, lazy, useState } from 'react'
import styled, { css } from 'styled-components'

import { Post, Coordinates } from '../types'
import Posts from './posts'
import Button from '../components/button'
import Loading from '../components/loading'

const CreatePostForm = lazy(() => import('./create-post-form'))
const PostDetails = lazy(() => import('./post-details'))

const CreatePostButton = styled(Button)<CreatePostButtonProps>`
  align-items: center;
  display: flex;
  font-weight: bold;
  height: 2em;
  justify-content: center;
  left: 50%;
  line-height: 1;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2.5em;

  ${props =>
    props.isActive &&
    css`
      background: blue;
    `}
`

export default function Board(props: BoardProps) {
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [postDetailsId, setPostDetailsId] = useState<string | null>(null)
  const activePost = postDetailsId
    ? props.posts.find(post => post.id === postDetailsId)
    : null

  return (
    <>
      <div
        style={{
          left: 0,
          maxHeight: '100vh',
          overflow: 'auto',
          position: 'fixed',
          top: 0,
        }}
      >
        <Suspense fallback={<Loading />}>
          {isCreatingPost && (
            <CreatePostForm
              coordinates={props.coordinates}
              onCancel={() => {
                setIsCreatingPost(false)
              }}
              onSubmit={post => {
                setIsCreatingPost(false)
                setPostDetailsId(post.id)
                props.onCreatePost()
              }}
            />
          )}
          {activePost && (
            <PostDetails
              coordinates={props.coordinates}
              post={props.posts.find(post => post.id === postDetailsId)}
              onExit={() => {
                setPostDetailsId(null)
              }}
            />
          )}
        </Suspense>
      </div>
      <Posts
        activePost={activePost}
        posts={props.posts}
        onPostClick={post => {
          if (postDetailsId === post.id) {
            return setPostDetailsId(null)
          }

          setPostDetailsId(post.id)
        }}
      />
      <CreatePostButton
        isActive={isCreatingPost}
        aria-label="create post"
        onClick={() => {
          setIsCreatingPost(!isCreatingPost)
        }}
      >
        +
      </CreatePostButton>
    </>
  )
}

interface BoardProps {
  coordinates: Coordinates
  posts: Post[]
  onCreatePost: () => void
}

interface CreatePostButtonProps {
  isActive: boolean
}
