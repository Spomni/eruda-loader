const { expect } = require('@jest/globals')
const { merge } = require('webpack-merge')
const path = require('path')

const compile = require('./lib/compile')

const {
  prodMode,
  noneMode,
  base: baseConfig,
  eruda: erudaConfig,
} = require('./config-parts')

function getFirstModuleContent(stats) {
  return stats.toJson({ source: true }).modules[0].source;
}

describe('erudaLoader', function () {

  it('Should do nothing in the webpack production mode.', async () => {

    const entry = { entry: './main.js' }

    const noErudaStats = await compile(merge(baseConfig, entry))
    const noErudaContent = getFirstModuleContent(noErudaStats)


    const prodModeStats= await compile(merge(erudaConfig, entry, prodMode))
    const prodModeContent = getFirstModuleContent(prodModeStats)

    const noneModeStats = await compile(merge(erudaConfig, entry, noneMode))
    const noneModeContent = getFirstModuleContent(noneModeStats)

    expect(prodModeContent).toStrictEqual(noErudaContent)
    expect(noneModeContent).toStrictEqual(noErudaContent)
  })

  it('Should add injection code to the bundle.', async () => {

    const entry = { entry: './main.js' }
    const injectionRE = /;\(function \(\) { \/\/ eruda injection\n[^]*}\)\(\) \/\/ eruda injection end/

    const stats = await compile(merge(erudaConfig, entry))
    const content = getFirstModuleContent(stats)

    expect(content).toMatch(injectionRE)
  })
})