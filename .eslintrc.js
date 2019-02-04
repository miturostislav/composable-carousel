const path = require('path');

module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
};
