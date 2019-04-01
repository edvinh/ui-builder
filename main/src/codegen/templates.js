const actionBarTemplate = props => `<Header ${props} />`

const cardTemplate = (props, children) => `<Card ${props}>${children}</Card>`

const wrapperTemplate = children => `
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const App = () => (
  <View style={styles.container}>
    ${children}
  </View>
)

export default App
`

const defaultImports = `
import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
`

module.exports = {
  actionBarTemplate,
  cardTemplate,
  wrapperTemplate,
  defaultImports,
}
