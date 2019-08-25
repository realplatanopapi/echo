import React from 'react'

import { Post, Coordinates } from '../types'
import { formatDistanceToNow } from 'date-fns'
import CreatePostForm from './create-post-form'
import Button from '../components/button'

export default function PostDetails(props: PostDetailsProps) {
  const { post } = props

  return (
    <>
      <p>{post.content}</p>
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
