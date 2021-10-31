const { validate } = require('schema-utils')
const schema = require('./options-schema')

function erudaLoader(source) {

  if (this.mode !== 'development') return source

  const options = this.getOptions()

  validate(schema, options, {
    name: 'eruda-loader'
  })

  const injectionCode = `;(function () { // eruda injection
    const eruda = require('eruda')
    eruda.init()
  })() // eruda injection end`

  return `${source}\n${injectionCode}`
}

module.exports = erudaLoader