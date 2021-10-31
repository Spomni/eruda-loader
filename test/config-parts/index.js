const path = require('path')
const { merge } = require('webpack-merge')

const rootPath = path.resolve(__dirname, '../../')
const testPath = path.resolve(rootPath, './test/')
const fixturePath = path.resolve(testPath, './fixture/')
const distPath = path.resolve(testPath, './dist')
const erudaLoaderPath = path.resolve(rootPath, './index.js')

const base = {
  mode: 'development',
  context: fixturePath,
  output: {
    path: distPath,
    filename: '[name].js'
  }
}

const eruda = merge(
  base,
  {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: { loader: erudaLoaderPath },
        },
      ],
    },
  }
)

const prodMode = {
  mode: 'production'
}

const noneMode = {
  mode: 'none'
}

const configParts = {
  base,
  eruda,
  prodMode,
  noneMode,
}

module.exports = configParts