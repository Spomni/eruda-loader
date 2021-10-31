const { validate } = require('schema-utils')
const { camelCase } = require('camel-case')
const schema = require('./options-schema')

function stringifyOptions({ tool }) {
  let result = '{'
  if (tool) result += `\n tool: ["${tool.join('", "')}"]`
  result += '\n}'
  return result
}

function injectPlugins({ plugin }) {
  if (!plugin) return '';

  let result = ''

  plugin.forEach((name) => {
    const jsName = camelCase(name);
    result += `
      try {
        const ${jsName} = require('${name}')
        eruda.add(${jsName})
      } catch (err) {
        err.message = '${name} plugin error: \\\n' + err.message
        console.error(err)
      }
    `
  })

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
    ${injectPlugins(options)}
  })() // eruda injection end`

  return `${source}\n${injectionCode}`
}

module.exports = erudaLoader