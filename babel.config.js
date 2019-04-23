module.exports = api => {
  api.cache(true)

  const presets = [
    // We want to support most browsers, but don't include runtime-generator
    ['@babel/preset-env', {
      modules: false,
      targets: '> 0.25%, not op_mini all',
      exclude: [
        'transform-async-to-generator',
        'transform-regenerator',
      ],
    }],
    '@babel/preset-react',
  ]

  const plugins = [
    // Get rid of regenerator-runtime requirement
    'module:fast-async',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-transform-destructuring', { useBuiltIns: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
  ]

  const env = {
    commonjs: {
      plugins: [
        ['@babel/plugin-transform-modules-commonjs', { loose: true }],
      ],
    },
  }

  return {
    presets,
    plugins,
    env,
  }
}
