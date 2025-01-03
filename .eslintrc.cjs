module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true, 
    node: true, // Add Node.js environment
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'], // Ensure @typescript-eslint is included as a plugin
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Correct namespace and rule key
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};