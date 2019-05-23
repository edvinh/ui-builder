const genericTemplateGenerator = component => props => `<${component} ${props} />`

const headerTemplate = props => `<Header ${props} />`
const cardTemplate = (props, children) => `<Card ${props}>${children}</Card>`
const textTemplate = (props, text) => `<Text ${props}>${text}</Text>`
const buttonTemplate = props => `<Button ${props} />`
const wrapperTemplate = children => `
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContentContainer: {
    padding: 8
  },
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

const getTemplate = componentName => {
  const templates = {
    card: cardTemplate,
    text: textTemplate,
    header: genericTemplateGenerator('Header'),
    button: genericTemplateGenerator('Button'),
    input: genericTemplateGenerator('Input'),
    checkbox: genericTemplateGenerator('Checkbox'),
  }

  return templates[componentName]
}

module.exports = {
  headerTemplate,
  cardTemplate,
  textTemplate,
  buttonTemplate,
  wrapperTemplate,
  defaultImports,
  getTemplate,
}
