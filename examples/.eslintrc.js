module.exports = {
  extends: ['eslint:recommended', "plugin:react/recommended", 'prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    "semi": 2,
  },
};
