module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: '> 1%, last 2 versions, not ie <= 8',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
