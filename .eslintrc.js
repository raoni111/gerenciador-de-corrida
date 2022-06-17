module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-expressions': 'off',
    'import/no-extraneous-dependencies': 'off',
    camelcase: 'off',
  },
};
