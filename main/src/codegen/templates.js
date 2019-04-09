const headerTemplate = props => `<Header ${props} />`

const cardTemplate = (props, children) => `<Card ${props}>${children}</Card>`
const textTemplate = (props, text) => `<Text ${props}>${text}</Text>`
const buttonTemplate = props => `<Button ${props} />`

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
  headerTemplate,
  cardTemplate,
  textTemplate,
  buttonTemplate,
  wrapperTemplate,
  defaultImports,
}
