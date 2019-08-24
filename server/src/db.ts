import { createConnection } from 'typeorm'

import config from './config'
import models from './models'

export function connect() {
  const dbUrl = config.get('dbUrl')
  return createConnection({
    type: 'postgres',
    url: dbUrl,
    synchronize: true,
    entities: models,
  })
}
