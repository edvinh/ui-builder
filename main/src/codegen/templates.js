const actionBarTemplate = props => `<Header ${props} />`

const cardTemplate = (props, children) => `<Card ${props}>${children}</Card>`

const wrapperTemplate = children => `
const App = () => (
  <View>
    ${children}
  </View>
)

export default App
`

module.exports = {
  actionBarTemplate,
  cardTemplate,
  wrapperTemplate,
}
