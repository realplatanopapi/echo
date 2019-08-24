import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { Coordinates, Post } from './types'
import { getNearbyPosts } from './api'
import Posts from './posts'
import CreatePostForm from './create-post-form'

export default function Board(props: BoardProps) {
  const { loading, error, data, refetch } = useQuery(getNearbyPosts, {
    variables: {
      query: {
        latitude: props.coordinates.latitude,
        longitude: props.coordinates.longitude,
      },
    },
  })

  return (
    <>
      {loading && 'Loading...'}
      {error && 'Oh no!'}
      {data && data.getNearbyPosts && (
        <>
          <Posts posts={data.getNearbyPosts as Post[]} />
          <CreatePostForm
            coordinates={props.coordinates}
            onSubmit={() => {
              refetch()
            }}
          />
        </>
      )}
    </>
  )
}

export interface BoardProps {
  coordinates: Coordinates
}
