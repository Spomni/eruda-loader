const webpack = require('webpack')

class WebpackCompilationError extends Error {
  constructor(stats) {
    super()
    Object.assign(this, stats.toJson().errors[0])
  }
}

function compile(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err)
      if (stats.hasErrors()) reject(new WebpackCompilationError(stats))

      resolve(stats)
    })
  })
}

module.exports = compile