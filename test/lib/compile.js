const webpack = require('webpack')

class WebpackCompilationError extends Error {
  constructor(stats) {
    super()
    Object.assign(this, stats.toJson().errors[0])
  }
}

function compile(config) {

  const compiler = webpack(config)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      if (stats.hasErrors()) reject(new WebpackCompilationError(stats))

      compiler.close((closeErr) => closeErr ? reject(closeErr) : null)
      resolve(stats)
    })
  })
}

module.exports = compile