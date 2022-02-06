module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  verbose: true,
  globals: {
    window: {
      navigator: {
        platform: 'platform',
        userAgent: 'userAgent',
        language: 'language',
      },
    },
    navigator: {},
  },
  setupFiles: ['fake-indexeddb/auto'],
}
