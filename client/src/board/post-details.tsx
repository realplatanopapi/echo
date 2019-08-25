import React from 'react'
import styled, { css } from 'styled-components'

import { Post, Coordinates } from '../types'
import { formatDistanceToNow } from 'date-fns'
import CreatePostForm from './create-post-form'
import Button from '../components/button'

const PostContent = styled.p<PostContentProps>`
  margin-bottom: 0.5rem;

  ${props =>
    props.large &&
    css`
      font-size: 1.5em;
    `}
`

export default function PostDetails(props: PostDetailsProps) {
  const { post } = props

  return (
    <>
      {!props.isChildPost && <h2>Post</h2>}
      <PostContent large={!props.isChildPost}>{post.content}</PostContent>
      <p>
        <small>{formatDistanceToNow(new Date(post.createdAt))} ago</small>
      </p>
      {!props.isChildPost && (
        <>
          <Button onClick={props.onExit}>close</Button>
          <CreatePostForm
            parentPostId={post.id}
            coordinates={props.coordinates}
          />
        </>
      )}
      {props.post.children && props.post.children.length > 0 && (
        <>
          <h2>Comments</h2>
          {props.post.children.map(childPost => (
            <PostDetails
              key={childPost.id}
              {...props}
              post={childPost}
              isChildPost={true}
            />
          ))}
        </>
      )}
    </>
  )
}

interface PostDetailsProps {
  isChildPost?: boolean
  coordinates: Coordinates
  post: Post
  onExit: () => any
}

interface PostContentProps {
  large: boolean
}
