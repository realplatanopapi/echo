import React from 'react'

import { Post } from '../types'
import PostOrb from './post-orb'

export default function Posts(props: PostsProps) {
  if (props.posts.length === 0) {
    return <p>no posts yet</p>
  }

  return (
    <ul>
      {props.posts.map(post => (
        <li key={post.id}>
          <PostOrb post={post} onClick={props.onPostClick} />
        </li>
      ))}
    </ul>
  )
}

interface PostsProps {
  posts: Post[]
  onPostClick: (post: Post) => any
}
