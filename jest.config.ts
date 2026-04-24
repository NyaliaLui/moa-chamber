import type { Config } from 'jest';

const config: Config = {
  roots: ['tests/unit', 'tests/security'],
  clearMocks: true,
  testEnvironment: 'jsdom',
  globals: {
    IS_REACT_ACT_ENVIRONMENT: true,
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx|cjs|mjs)$': [
      'ts-jest',
      {
        tsconfig: {
          moduleResolution: 'node',
          jsx: 'react-jsx',
          allowJs: true,
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/app/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^@api/(.*)$': '<rootDir>/src/pages/api/$1',
    '^@statics/(.*)$': '<rootDir>/public/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(resend|react-player|@wix|flowbite|flowbite-react|react-icons|debounce)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
};

export default config;
