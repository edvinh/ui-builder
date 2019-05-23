const { exec, spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const psTree = require('ps-tree')

let webProcess = null
let nativeProcess = null
const isWindows = process.platform === 'win32'

const writeCodeToFile = code => {
  // const codePath = path.resolve(__dirname, '../../generated/temp.js')

  const codePath = path.resolve(__dirname, '../../generated/rnw-app/src/App.js')
  const prettierPath = path.resolve(__dirname, '../../node_modules/prettier/bin-prettier.js')

  fs.writeFileSync(codePath, code)

  // Run prettier on generated code
  exec(
    `node ${prettierPath} --print-width 100 --no-semi --single-quote --trailing-comma es5 --write ${codePath}`,
    (err, stdout, stderr) => {
      if (err) {
        console.log('error :(')
      }
    }
  )
}

const startProjects = () => {
  const projectPath = path.resolve(__dirname, '../../generated/rnw-app')

  // Start web server
  webProcess = exec(`cd ${projectPath} ${isWindows ? '&' : '&&'} yarn start:web`)

  // Start metro bundler for RN
  nativeProcess = exec(`cd ${projectPath} ${isWindows ? '&' : '&&'} yarn start:native`)
}

// Kills child & grandchildren
const killProcess = child => {
  psTree(child.pid, (err, children) => {
    if (!isWindows) {
      // Spawn kill on Linux/OSX
      spawn(
        'kill',

        // SIGKILL
        ['-9'].concat(
          children.map(p => {
            return p.PID
          })
        )
      )
    } else {
      // Spawn taskkill on Windows
      spawn('taskkill', ['/pid', child.pid, '/f', '/t'])
    }
  })
}

const killProjects = () => {
  if (webProcess) {
    killProcess(webProcess)
  }

  if (nativeProcess) {
    killProcess(nativeProcess)
  }
}

const projectsStarted = () => !!webProcess && !!nativeProcess

module.exports = {
  writeCodeToFile,
  startProjects,
  killProjects,
  projectsStarted,
}
