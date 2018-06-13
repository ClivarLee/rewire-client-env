const rewiredPaths = require('react-app-rewired/scripts/utils/paths')
const scriptVerison = rewiredPaths.scriptVersion
const getClientEnvironment = require(require.resolve(scriptVerison + '/config/env'))
const webpack = require('webpack')

module.exports = function (clienEnv) {
  return (config, env) => {
    if (typeof clienEnv !== 'object' && clienEnv === null) {
      console.log(`${clienEnv} expectd is a Object`)
      return config
    }
    const envs = getClientEnvironment(config.output.publicPath.slice(0, -1))
    const processEnv = envs.stringified['process.env']

    Object.keys(clienEnv).reduce(function (processEnv, key) {
      processEnv[key] = JSON.stringify(clienEnv[key])
      return processEnv
    }, processEnv)

    config.plugins.unshift(
      new webpack.DefinePlugin({
        'process.env': processEnv,
      })
    )
    return config
  }
}