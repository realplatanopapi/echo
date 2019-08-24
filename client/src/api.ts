import ApolloClient, { gql } from 'apollo-boost'

export const client = new ApolloClient({
  uri: '/api',
})

export const getNearbyPosts = gql`
  query getNearbyPosts($query: PostQuery!) {
    getNearbyPosts(query: $query) {
      id
      content
      createdAt
    }
  }
`

export const createPost = gql`
  mutation createPost($input: PostInput!) {
    createPost(input: $input) {
      id
      content
      createdAt
    }
  }
`
