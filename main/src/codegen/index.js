const { ipcMain } = require('electron')
const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const { GENERATE_CODE } = require('../constants/messagetypes')
const { actionBarTemplate, cardTemplate, wrapperTemplate } = require('./templates')

ipcMain.on(GENERATE_CODE, (event, arg) => {
  const layout = JSON.parse(arg)

  const importsString = generateImports(layout)
  const componentsString = layout
    .map(component => generateComponent(component))
    .reduce((acc, curr) => `${acc}\n${curr}`)

  const wrapperString = wrapperTemplate(componentsString)

  const codeString = `
    import React from 'react'
    ${importsString}
    ${wrapperString}
  `

  const codePath = path.resolve(__dirname, '../../tmp/temp.js')
  const prettierPath = path.resolve(__dirname, '../../node_modules/prettier/bin-prettier.js')

  fs.writeFileSync(codePath, codeString)

  // Run prettier on generated code
  exec(
    `node ${prettierPath} --print-width 80 --no-semi --single-quote --trailing-comma es5 --write ${codePath}`,
    (err, stdout, stderr) => {
      if (err) {
        console.log('error :(')
      }
    }
  )
})

function generateImports (components) {
  const importString = name => `import { ${name} } from 'react-native-elements'`

  let names = components.map(c => c.name)

  // Remove duplicates, rename actionbar to header,
  // capitalize and use in import template string
  names = names
    .filter((v, i) => names.indexOf(v) === i)
    .map(name => (name === 'actionbar' ? 'Header' : name))
    .map(name => name.charAt(0).toUpperCase() + name.slice(1))
    .map(capitalizedName => importString(capitalizedName))
    .reduce((acc, curr) => `${acc}\n${curr}`)

  return names
}

function mapToPropString (props, ignore) {
  return Object.keys(props)
    .map(key =>
      typeof props[key] === 'string' ? `${key}="${props[key]}"` : `${key}={${props[key]}}`
    )
    .reduce((acc, curr) => `${acc} ${curr}`)
}

function generateComponent (component) {
  const { name, props } = component

  if (name === 'actionbar') {
    const propsString = mapToPropString(props)
    return actionBarTemplate(propsString)
  } else if (name === 'card') {
    const childrenPropName = 'content'
    const children = props[childrenPropName]
    delete props[childrenPropName]

    const propsString = mapToPropString(props)
    return cardTemplate(propsString, children)
  }
}
