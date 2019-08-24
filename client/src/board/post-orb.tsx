import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import styled, { css } from 'styled-components'

import { Post } from '../types'

const size = '1.5em'

interface StyledPostIndicatorProps {
  isActive: boolean
}

const StyledPostIndicator = styled.div<StyledPostIndicatorProps>`
  border: 0.075em solid currentColor;
  border-radius: 100%;
  cursor: pointer;
  height: ${size};
  width: ${size};

  &:focus,
  &:hover {
    ${props =>
      !props.isActive &&
      css`
        border-color: blue;
      `}
  }

  ${props =>
    props.isActive &&
    css`
      background: blue;
      border-color: white;
    `}
`

export default function PostIndicator(props: PostIndicatorProps) {
  const { post } = props
  const distanceToNow = formatDistanceToNow(new Date(post.createdAt))

  return (
    <StyledPostIndicator
      isActive={props.isActive}
      onClick={() => props.onClick(post)}
      aria-label={`view post created ${distanceToNow}`}
      tabIndex={0}
      role="button"
    />
  )
}

interface PostIndicatorProps {
  isActive: boolean
  post: Post
  onClick: (post: Post) => any
}
