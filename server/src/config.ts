import convict from 'convict'

const config = convict({
  dbUrl: {
    format: String,
    default: 'postgres://echo:echo@localhost:4201/echo',
    env: 'DATABASE_URL',
  },
  env: {
    format: ['development', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    format: 'port',
    default: 4200,
    env: 'PORT',
  },
})

config.validate({
  allowed: 'strict',
})

export default config
