module.exports = function(api) {
  api.cache(true)

  const presets = [
    // We want to support most browsers, but don't include runtime-generator
    ['@babel/preset-env', {
      exclude: [
        'transform-async-to-generator',
        'transform-regenerator',
      ],
    }],
    '@babel/preset-react'
  ]

  const plugins = [
    // Get rid of regenerator-runtime requirement
    ['module:fast-async', {
      spec: true,
    }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ]

  const env = {
    commonjs: {
      plugins: [
        ['@babel/plugin-transform-modules-commonjs', { loose: true }]
      ]
    }
  }

  return {
    presets,
    plugins,
    env
  }
}
