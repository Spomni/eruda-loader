function erudaLoader(source) {

  if (this.mode !== 'development') return source

  const injectionCode = `;(function () { // eruda injection
    const eruda = require('eruda')
    eruda.init()
  })() // eruda injection end`

  return `${source}\n${injectionCode}`
}

module.exports = erudaLoader