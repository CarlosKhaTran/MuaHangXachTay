module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react/destructuring-assignment': 'off',
    'import/prefer-default-export': 'off',
    "global-require": 0
  },
  'globals': {
    "fetch": false,
    "require": false,
    "React$Node": false,
    "isNaN": false,
    "FormData": false
  }
}