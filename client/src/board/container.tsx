import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { Coordinates, Post } from '../types'
import { getNearbyPosts } from '../api'
import Board from './board'

export default function BoardContainer(props: BoardContainerProps) {
  const { loading, error, data, refetch } = useQuery(getNearbyPosts, {
    variables: {
      query: {
        latitude: props.coordinates.latitude,
        longitude: props.coordinates.longitude,
      },
    },
  })

  const posts = data && data.getNearbyPosts

  return (
    <>
      {loading && !posts && 'loading...'}
      {posts && (
        <Board
          coordinates={props.coordinates}
          posts={posts as Post[]}
          onCreatePost={refetch}
        />
      )}
    </>
  )
}

interface BoardContainerProps {
  coordinates: Coordinates
}
