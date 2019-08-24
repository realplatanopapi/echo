import React from 'react'
import styled from 'styled-components'

import { Post } from '../types'
import { formatDistanceToNow } from 'date-fns'

const size = '1.5em'

const StyledPostIndicator = styled.div`
  border: 0.075em solid currentColor;
  border-radius: 100%;
  cursor: pointer;
  height: ${size};
  width: ${size};

  &:focus,
  &:hover {
    background: blue;
  }
`

export default function PostIndicator(props: PostIndicatorProps) {
  const { post } = props
  const distanceToNow = formatDistanceToNow(new Date(post.createdAt))

  return (
    <StyledPostIndicator
      aria-label={`view post created ${distanceToNow}`}
      tabIndex={0}
      role="button"
    />
  )
}

interface PostIndicatorProps {
  post: Post
}
