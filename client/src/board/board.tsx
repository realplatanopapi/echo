import React, { Suspense, lazy, useState } from 'react'
import styled, { css } from 'styled-components'

import { Post, Coordinates } from '../types'
import Posts from './posts'
import Button from '../components/button'
import Loading from '../components/loading'
import Modal from '../components/modal'

const CreatePostForm = lazy(() => import('./create-post-form'))
const PostDetails = lazy(() => import('./post-details'))

export default function Board(props: BoardProps) {
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [postDetailsId, setPostDetailsId] = useState<string | null>(null)
  const activePost = postDetailsId
    ? props.posts.find(post => post.id === postDetailsId)
    : null

  return (
    <>
      {activePost ? (
        <Aside>
          <Suspense fallback={<Loading />}>
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
        </Aside>
      ) : null}
      <CreatePostButton
        isActive={isCreatingPost}
        aria-label="create post"
        onClick={() => {
          setIsCreatingPost(!isCreatingPost)
        }}
      >
        +
      </CreatePostButton>
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
      <Suspense fallback={<Loading />}>
        {isCreatingPost && (
          <Modal
            onExit={() => {
              setIsCreatingPost(false)
            }}
          >
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
          </Modal>
        )}
      </Suspense>
    </>
  )
}

const Aside = styled.aside`
  background: rgba(0, 0, 0, 0.5);
  border-right: 1px solid white;
  height: 100%;
  left: 0;
  max-width: 100vw;
  overflow: auto;
  padding: 1em;
  position: fixed;
  top: 0;
  width: 420px;
  z-index: 1;
`

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

interface BoardProps {
  coordinates: Coordinates
  posts: Post[]
  onCreatePost: () => void
}

interface CreatePostButtonProps {
  isActive: boolean
}
