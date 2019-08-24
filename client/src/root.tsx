import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import App from './app'
import { client } from './api'
import { GlobalStyles } from './styles'

export default function Root() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <App />
    </ApolloProvider>
  )
}
