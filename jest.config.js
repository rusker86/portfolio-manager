export default {
  testEnvironment: 'node',
  transform: {},
  rootDir: '.',
  testMatch: ['<rootDir>/test/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/api/index.js',
    '!src/utils/logger.js',
    '!src/utils/testUtils.js'
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
};
