import { gql } from 'apollo-server-koa'

import { PostInput, createPost, getNearbyPosts, PostQuery } from '../lib/posts'
import Post from '../models/post'

export const typeDefs = gql`
  extend type Query {
    getNearbyPosts(query: PostQuery!): [Post]
  }

  extend type Mutation {
    createPost(input: PostInput!): Post
  }

  type Post {
    id: ID
    content: String
    createdAt: Date
  }

  input PostQuery {
    latitude: Float!
    longitude: Float!
  }

  input PostInput {
    content: String!
    latitude: Float!
    longitude: Float!
  }
`

export const resolvers = {
  Query: {
    async getNearbyPosts(
      parent,
      args: {
        query: PostQuery
      },
    ): Promise<Post[]> {
      return await getNearbyPosts(args.query)
    },
  },
  Mutation: {
    async createPost(
      parent,
      args: {
        input: PostInput
      },
    ): Promise<Post> {
      return await createPost(args.input)
    },
  },
}
