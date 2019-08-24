import path from 'path'

import koaWebpack from 'koa-webpack'

import { start } from '../server'
import clientWebpackConfig from '../client/webpack.config'
;(async function dev() {
  const server = await start()
  const webpackMiddleware = await koaWebpack({
    // @ts-ignore
    config: clientWebpackConfig,
  })
  server.use(webpackMiddleware)

  server.use(async ctx => {
    const filename = path.resolve(clientWebpackConfig.output.path, 'index.html')
    ctx.response.type = 'html'
    ctx.response.body = webpackMiddleware.devMiddleware.fileSystem.createReadStream(
      filename,
    )
  })
})()
