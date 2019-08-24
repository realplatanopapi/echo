import React, { createRef, useEffect, useState } from 'react'

import { Post } from '../types'
import PostOrb from './post-orb'
import { FillParent } from '../styles'

export default function Posts(props: PostsProps) {
  if (props.posts.length === 0) {
    return <p>no posts yet</p>
  }

  return (
    <FillParent as="ul">
      {props.posts.map(post => (
        <PostItem key={post.id} post={post} onPostClick={props.onPostClick} />
      ))}
    </FillParent>
  )
}

function PostItem(props: { post: Post; onPostClick: onPostClick }) {
  const { post } = props
  const [isAnimating, setIsAnimating] = useState(false)
  const ref = createRef<HTMLLIElement>()

  useEffect(() => {
    const el = ref.current
    if (isAnimating || !el) {
      return
    }

    const coords = {
      x: 0,
      y: 0,
    }

    let xDirection = Math.random() * (Math.random() <= 0.5 ? -1 : 1)
    let yDirection = Math.random() * (Math.random() <= 0.5 ? -1 : 1)

    function animate() {
      requestAnimationFrame(animate)

      const parentBounds = (el.parentNode as HTMLElement).getBoundingClientRect()
      const elBounds = el.getBoundingClientRect()
      if (
        elBounds.top + yDirection <= parentBounds.top ||
        elBounds.bottom + yDirection >= parentBounds.bottom
      ) {
        yDirection *= -1
      }

      if (
        elBounds.left + xDirection <= parentBounds.left ||
        elBounds.right + xDirection >= parentBounds.right
      ) {
        xDirection *= -1
      }

      coords.x += xDirection
      coords.y += yDirection

      el.style.setProperty(
        'transform',
        `translate(${coords.x}px, ${coords.y}px)`,
      )
    }
    requestAnimationFrame(animate)

    setIsAnimating(true)
  }, [post.id])

  return (
    <li
      ref={ref}
      style={{
        display: isAnimating ? 'block' : 'none',
        left: '50%',
        top: '50%',
        position: 'absolute',
        transform: `translate('0px', '0px')`,
      }}
    >
      <PostOrb post={post} onClick={props.onPostClick} />
    </li>
  )
}

type onPostClick = (post: Post) => any

interface PostsProps {
  posts: Post[]
  onPostClick: onPostClick
}
