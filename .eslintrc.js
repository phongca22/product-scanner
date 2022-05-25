module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'no-undef': 'off',
        'comma-dangle': 'off',
        'react-native/no-inline-styles': 'off'
      }
    }
  ]
};
