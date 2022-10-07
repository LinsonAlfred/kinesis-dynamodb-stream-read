module.exports = {
  cacheDirectory: '.jest-cache',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 97,
      lines: 95,
      statements: 95
    }
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ]
};
