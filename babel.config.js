module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: '> 1%, last 2 versions, not ie <= 8',
      },
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        pragma: 'dom',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
