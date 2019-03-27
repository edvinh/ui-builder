// Generates an array of CSS styling for all RNVI icons
const generateFontStyles = iconNames => iconNames.map((name) => {
  const fontDir = require(`react-native-vector-icons/Fonts/${name}.ttf`)
  return `@font-face {
      src: url(${fontDir});
      font-family: ${name};
    }`
})

const icons = [
  'AntDesign',
  'Entypo',
  'EvilIcons',
  'Feather',
  'FontAwesome',
  'Foundation',
  'Ionicons',
  'MaterialCommunityIcons',
  'MaterialIcons',
  'Octicons',
  'SimpleLineIcons',
  'Zocial',
]

// Create a single style string
const iconsCss = generateFontStyles(icons).reduce((acc, curr) => `${acc}\n${curr}`)

// Create stylesheet
const style = document.createElement('style')
style.type = 'text/css'

if (style.styleSheet) {
  style.styleSheet.cssText = iconsCss
} else {
  style.appendChild(document.createTextNode(iconsCss))
}

// Inject stylesheet
document.head.appendChild(style)
