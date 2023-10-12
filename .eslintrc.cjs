module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  ignorePatterns: ["workbox-5357ef54.js", "sw.js", "workbox-fa446783.js"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'error',
    'no-unused-vars': [
        'error',
        {
            varsIgnorePattern: '^_'
        }
    ]
  },
  globals: {
    process: true
  }
};
