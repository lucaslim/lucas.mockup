import Koa from 'koa'
import koaConvert from 'koa-convert'
import koaStatic from 'koa-static'

import webpack from 'webpack'

import config from '../config'
import webpackConfig from '../config/webpack.config'
import devMiddleware from './middleware/webpack-dev'
import hmrMiddleware from './middleware/webpack-hmr'

const app = new Koa()

const paths = config.utils_paths

const compiler = webpack(webpackConfig)
const { publicPath } = webpackConfig.output

app.use(devMiddleware(compiler, publicPath))
app.use(hmrMiddleware(compiler))
app.use(koaConvert(koaStatic(paths.client('static'))))

export default app
