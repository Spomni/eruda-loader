function erudaLoader(source) {

  if (this.mode !== 'development') return source

  const injectionCode = `
    console.log('eruda-loader was executed');
  `
  return `${source}\n${injectionCode}`
}

module.exports = erudaLoader