/* eslint-disable no-use-before-define */
const { ipcMain } = require('electron')

const { writeCodeToFile, startProjects, killProjects, projectsStarted } = require('./commands')
const {
  GENERATE_CODE,
  START_PROJECT,
  KILL_PROJECT,
  CHECK_SERVERS_STARTED,
} = require('../constants/messagetypes')
const { wrapperTemplate, defaultImports, getTemplate } = require('./templates')

ipcMain.on(GENERATE_CODE, (event, arg) => {
  const layout = JSON.parse(arg)

  console.log(layout)

  const importsString = generateImports(layout)
  let componentsString = layout.map(component => generateComponent(component))

  const scrollViewString = '<ScrollView contentContainerStyle={styles.scrollContentContainer}>'

  // If a header is present, wrap everything beneath it in a ScrollView
  if (layout[0].name === 'header') {
    componentsString.splice(1, 0, scrollViewString)
    componentsString.push('</ScrollView>')
  } else {
    // Otherwise, wrap everything in a ScrollView
    componentsString = [scrollViewString, ...componentsString]
    componentsString.push('</ScrollView>')
  }

  componentsString = componentsString.join('\n')

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
  const importString = name => `import ${name} from './components/${name}/'`
  let names = components.map(c => c.name)

  let childDeps = []

  // TODO Refactor... only goes one level down, needs to be recursive
  components
    .map(c => c.children)
    .forEach(children => {
      const deps = children.filter(child => typeof child !== 'string').map(child => child.name)
      childDeps = [...childDeps, ...deps]
    })

  // Remove duplicates & capitalize and use in import template string
  names = [...names, ...childDeps]
  names = names
    .filter((v, i) => names.indexOf(v) === i)
    .map(name => name.charAt(0).toUpperCase() + name.slice(1))
    .map(capitalizedName => importString(capitalizedName))
    .reduce((acc, curr) => `${acc}\n${curr}`)
  return names
}

function mapToPropString (props) {
  if (!props) {
    return ''
  }

  return Object.keys(props)
    .map(key => {
      if (typeof props[key] === 'string') {
        return `${key}="${props[key]}"`
      } else if (props[key] !== null) {
        return `${key}={${props[key]}}`
      } else {
        return ''
      }
    })
    .join(' ')
}

function generateComponent (component) {
  const { name, props, children } = component

  // Render props string, if any props
  const propsString = mapToPropString(props)

  // Get the specific template for the component
  const template = getTemplate(name)

  // Recursively render children
  // If it's a primitive type (number, string, etc) just return the string (e.g. for text)
  const childrenString = children
    .map(child => (typeof child !== 'object' ? child : generateComponent(child)))
    .join('\n')

  return template(propsString, childrenString)
}

ipcMain.on(START_PROJECT, (event, arg) => {
  startProjects()
})

ipcMain.on(KILL_PROJECT, (event, arg) => {
  killProjects()
})

ipcMain.on(CHECK_SERVERS_STARTED, (event, arg) => {
  event.sender.send(CHECK_SERVERS_STARTED, projectsStarted())
})
