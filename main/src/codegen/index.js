const { ipcMain } = require('electron')

const { writeCodeToFile, startProjects, killProjects } = require('./commands')
const { GENERATE_CODE, START_PROJECT, KILL_PROJECT } = require('../constants/messagetypes')
const {
  headerTemplate,
  cardTemplate,
  textTemplate,
  buttonTemplate,
  wrapperTemplate,
  defaultImports,
} = require('./templates')

ipcMain.on(GENERATE_CODE, (event, arg) => {
  const layout = JSON.parse(arg)

  console.log(layout)

  const importsString = generateImports(layout)
  let componentsString = layout.map(component => generateComponent(component))

  // If a header is present, wrap everything beneath it in a ScrollView
  if (layout[0].name === 'header') {
    componentsString.splice(1, 0, '<ScrollView>')
    componentsString.push('</ScrollView>')
  }

  componentsString = componentsString.reduce((acc, curr) => `${acc}\n${curr}`)

  const wrapperString = wrapperTemplate(componentsString)

  const codeString = `
    ${defaultImports}
    ${importsString}
    ${wrapperString}
  `

  // Write code to temp .js file
  writeCodeToFile(codeString)
})

function generateImports (components) {
  // const importString = name => `import { ${name} } from 'react-native-elements'`
  const importString = name => `import ${name} from './components/${name}/'`

  let names = components.map(c => c.name)

  // Remove duplicates & capitalize and use in import template string
  names = names
    .filter((v, i) => names.indexOf(v) === i)
    .map(name => name.charAt(0).toUpperCase() + name.slice(1))
    .map(capitalizedName => importString(capitalizedName))
    .reduce((acc, curr) => `${acc}\n${curr}`)

  return names
}

function mapToPropString (props) {
  return Object.keys(props)
    .map(key =>
      typeof props[key] === 'string' ? `${key}="${props[key]}"` : `${key}={${props[key]}}`
    )
    .reduce((acc, curr) => `${acc} ${curr}`)
}

function generateComponent (component) {
  const { name, props, children } = component

  switch (name) {
    case 'header': {
      const propsString = mapToPropString(props)
      return headerTemplate(propsString)
    }
    case 'card': {
      const childrenPropName = 'content'
      const children = props[childrenPropName]
      delete props[childrenPropName]

      const propsString = mapToPropString(props)
      return cardTemplate(propsString, children)
    }
    case 'text':
      return textTemplate('', props.text)
    case 'button': {
      const propsString = mapToPropString(props)
      return buttonTemplate(propsString)
    }
  }
}

ipcMain.on(START_PROJECT, (event, arg) => {
  startProjects()
})

ipcMain.on(KILL_PROJECT, (event, arg) => {
  killProjects()
})
