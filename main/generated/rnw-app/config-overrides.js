// Custom overrides in CRA's webpack config.
// CRA has support for react-native-web out of the box.
// However, some dependencies need to be transpiled as well.

const { override, babelInclude } = require('customize-cra')
const path = require('path')

module.exports = override(
  babelInclude([
    path.resolve('src'),
    path.resolve('node_modules/react-native-elements'),
    path.resolve('node_modules/react-native-vector-icons'),
    path.resolve('node_modules/react-native-ratings'),
    path.resolve('node_modules/react-native-paper'),
  ])
)
