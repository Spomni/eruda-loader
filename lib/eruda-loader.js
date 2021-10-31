const { validate } = require('schema-utils')
const schema = require('./options-schema')

function stringifyOptions({ tool }) {
  let result = '{'

  if (tool) {
    result += `\n tool: ["${tool.join('", "')}"]`
  }

  result += '\n}'
  return result
}

function erudaLoader(source) {

  if (this.mode !== 'development') return source

  const options = this.getOptions()

  validate(schema, options, {
    name: 'eruda-loader'
  })

  const injectionCode = `;(function () { // eruda injection
    const eruda = require('eruda')
    eruda.init(${stringifyOptions(options)})
  })() // eruda injection end`

  return `${source}\n${injectionCode}`
}

module.exports = erudaLoader