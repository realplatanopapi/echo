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
      <p>{formatDistanceToNow(new Date(post.createdAt))}</p>
      {!props.isChildPost && (
        <>
          <Button onClick={props.onExit}>close</Button>
          <CreatePostForm
            parentPostId={post.id}
            coordinates={props.coordinates}
            onSubmit={() => {
              console.log('do something!!!')
            }}
          />
        </>
      )}
      {props.post.children &&
        props.post.children.map(childPost => (
          <PostDetails
            key={childPost.id}
            {...props}
            post={childPost}
            isChildPost={true}
          />
        ))}
    </>
  )
}

interface PostDetailsProps {
  isChildPost?: boolean
  coordinates: Coordinates
  post: Post
  onExit: () => any
}
