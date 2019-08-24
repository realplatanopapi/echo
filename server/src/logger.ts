import pino from 'pino'

import config from './config'

const logger = pino({
  prettyPrint: config.get('env') !== 'production',
})

export default logger
