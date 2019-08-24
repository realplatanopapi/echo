import { gql, makeExecutableSchema } from 'apollo-server-koa'
import { merge } from 'lodash'

import * as posts from './posts'

const typeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`

const resolvers = {
  Query: {},
  Mutation: {},
}

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, posts.typeDefs],
  resolvers: merge(resolvers, posts.resolvers),
})
