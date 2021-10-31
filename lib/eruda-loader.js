function erudaLoader(source) {

  if (this.mode !== 'development') return source

  const injectionCode = `;(function () { // eruda injection

  })() // eruda injection end`

  return `${source}\n${injectionCode}`
}

module.exports = erudaLoader