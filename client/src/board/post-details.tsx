import React from 'react'

import { Post } from '../types'
import { formatDistanceToNow } from 'date-fns'

export default function PostDetails(props: PostDetailsProps) {
  const { post } = props

  return (
    <>
      <p>{post.content}</p>
      <p>{formatDistanceToNow(new Date(post.createdAt))}</p>
    </>
  )
}

interface PostDetailsProps {
  post: Post
}
