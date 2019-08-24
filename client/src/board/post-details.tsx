import React from 'react'

import { Post } from '../types'
import { formatDistanceToNow } from 'date-fns'

export default function PostDetails(props: PostDetailsProps) {
  const { post } = props

  return (
    <>
      <p>{post.content}</p>
      <p>{formatDistanceToNow(new Date(post.createdAt))}</p>
      <button onClick={props.onExit}>close</button>
    </>
  )
}

interface PostDetailsProps {
  post: Post
  onExit: () => any
}
