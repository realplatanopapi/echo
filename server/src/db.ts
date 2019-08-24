import { createConnection } from 'typeorm'

import config from './config'
import entities from './entities'

export function connect() {
  const dbUrl = config.get('dbUrl')
  return createConnection({
    type: 'postgres',
    url: dbUrl,
    synchronize: true,
    entities,
  })
}
