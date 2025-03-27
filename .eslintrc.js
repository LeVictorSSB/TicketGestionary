module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parser: "@typescript-eslint/parser",
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"]
  },
  plugins: ["@typescript-eslint"],
  globals: {
    'bootstrap': 'readonly'
  },
  rules: {
    'no-undef': 'off',
    'no-restricted-globals': 'off',
    
    'no-console': 'warn',
    'import/prefer-default-export': 'off',
    'no-else-return': 'off',
    'object-shorthand': 'warn',
    'no-trailing-spaces': 'warn',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-undef': 'warn',
    'eol-last': ['error', 'always'],

    "class-methods-use-this": 0,
    "comma-dangle": ["error", "never"],
    "linebreak-style": 0,
    "global-require": 0,
    "eslint linebreak-style": [0, "error", "windows"],
    "@typescript-eslint/comma-dangle": 0,
    "no-new": 0
  }
};
