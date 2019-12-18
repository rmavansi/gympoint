module.exports = {
  extends: ['@configs/node'],
  root: true,
  extends: '@react-native-community',
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        'rootPathSuffix': 'src'
      }
    }
  }
};
