import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import { Post } from '../types'

export default function Posts(props: PostsProps) {
  if (props.posts.length === 0) {
    return <p>no posts yet</p>
  }

  return (
    <ul>
      {props.posts.map(post => (
        <li key={post.id}>
          {post.content}
          <br />
          {formatDistanceToNow(new Date(post.createdAt))}
        </li>
      ))}
    </ul>
  )
}

interface PostsProps {
  posts: Post[]
}
