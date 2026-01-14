/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/lib/rag', '<rootDir>/tests/unit/rag'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'lib/rag/**/*.{ts,tsx}',
    '!lib/rag/**/*.d.ts',
    '!lib/rag/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 90,
      functions: 90,
      branches: 90,
      statements: 90,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/tests/rag-setup.ts'],
}

module.exports = config
