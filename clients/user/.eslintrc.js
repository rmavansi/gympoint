module.exports = {
  extends: ['@configs/node'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        'rootPathSuffix': 'src'
      }
    }
  }
}
