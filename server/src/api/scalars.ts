import { gql } from 'apollo-server-koa'
import { GraphQLScalarType } from 'graphql'

export const typeDefs = gql`
  scalar Date
`

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    serialize(value: Date) {
      return value.toISOString()
    },
    parseValue(value: string) {
      return new Date(value)
    },
  }),
}
