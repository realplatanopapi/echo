import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import styled, { css } from 'styled-components'

import { Post } from '../types'

interface StyledPostIndicatorProps {
  isActive: boolean
  size: number
}

const StyledPostIndicator = styled.div<StyledPostIndicatorProps>`
  border: 0.075em solid currentColor;
  border-radius: 100%;
  cursor: pointer;
  height: ${props => props.size}em;
  width: ${props => props.size}em;

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
  const size = props.post.children.length * 0.25 + 1.5

  return (
    <StyledPostIndicator
      size={size}
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
