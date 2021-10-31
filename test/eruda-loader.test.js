const { expect } = require('@jest/globals')
const { merge } = require('webpack-merge')

const compile = require('./lib/compile')

const {
  prodMode,
  noneMode,
  base: baseConfig,
  eruda: erudaConfig,
  applyOptionsToEruda: applyOptionsToErudaConfig,
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

  it('Should add the eruda module to the bundle', async () => {
    const entry = { entry: './main.js' }
    const stats = await compile(merge(erudaConfig, entry))

    const modules = stats.toJson().modules
    const moduleNames = modules.map((module) => module.name)

    const matcher = expect.stringMatching(/.*node_modules\/eruda\/.+/)
    expect(moduleNames).toEqual(expect.arrayContaining([matcher]))
  })

  it('Should throw an error if the tool options are incorrect.', async () => {

    const getConfig = (options) => merge(
      { entry: './main.js' },
      applyOptionsToErudaConfig(options),
    )

    await expect(
      compile(getConfig({ tool: true }))
    ).rejects.toThrowError()

    await expect(
      compile(getConfig({ tool: [ "first-tool", "second-tool" ] }))
    ).rejects.toThrowError()

  })

  it('Should not throw any error if the tool options are correct', async () => {
    const config = merge(
      { entry: './main.js'},
      applyOptionsToErudaConfig({
        tool: [
          "console",
          "elements",
          "network",
          "resources",
          "sources",
          "info",
          "snippets",
          "settings",
        ]
      }
      )
    )

    await expect(compile(config)).resolves.toBeDefined()
  })

  it.todo('Should call the eruda.init() method with passed tool options.')
})