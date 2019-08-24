import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import { Post } from '../types'
import PostIndicator from './post-indicator'

export default function Posts(props: PostsProps) {
  if (props.posts.length === 0) {
    return <p>no posts yet</p>
  }

  return (
    <ul>
      {props.posts.map(post => (
        <li key={post.id}>
          <PostIndicator post={post} onClick={props.onPostClick} />
        </li>
      ))}
    </ul>
  )
}

interface PostsProps {
  posts: Post[]
  onPostClick: (post: Post) => any
}
