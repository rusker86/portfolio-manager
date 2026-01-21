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
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
};
