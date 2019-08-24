import 'source-map-support/register'

import { ApolloServer } from 'apollo-server-koa'
import Koa from 'koa'

import * as db from './src/db'
import config from './src/config'
import logger from './src/logger'
import { schema } from './src/api'

export { logger }

export async function start() {
  await db.connect()

  const server = new Koa()
  const apollo = new ApolloServer({
    schema,
  })
  apollo.applyMiddleware({
    app: server,
    path: '/api',
  })
  const port = config.get('port')
  await server.listen(port)
  logger.info(`Listening on port ${port} 🚀`)
  return server
}
