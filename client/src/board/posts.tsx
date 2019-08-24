import React from 'react'

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
          {post.createdAt}
        </li>
      ))}
    </ul>
  )
}

interface PostsProps {
  posts: Post[]
}
