import path from 'path'
import { argv } from 'yargs'
import _debug from 'debug'

const debug = _debug('app:config')
debug('Creating default configuration.')

const config = {
  env: process.env.NODE_ENV || 'development',

  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_server: 'server',
  dir_test: 'tests',

  //
  // Server Configuration
  //
  server_host: 'localhost',
  server_port: process.env.PORT || 4000,

  //
  // Compiler Configuration
  //
  compiler_css_modules: true,
  compiler_devtool: '',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },

  compiler_vendor: [
  ],

  coverage_reporters: [
    { type: 'text-summary' },
    { type: 'lcov', dir: 'coverage' }
  ],

  globals: {},
  utils_paths: {}
}

//
// Globals
//
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' && !argv.no_debug,
  '__COVERAGE__': !argv.watch && config.env === 'test',
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}

//
// Utilities
//
const resolve = path.resolve
const base = (...args) => Reflect.apply(resolve, null, [config.path_base, ...args])

config.utils_paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  dist: base.bind(null, config.dir_dist)
}

export default config
