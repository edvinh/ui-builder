const { app, BrowserWindow } = require('electron')
const path = require('path')
const { killProjects } = require('./codegen/commands')
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer')

const PRODUCTION = process.env.NODE_ENV === 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1430,
    height: 1070,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js',
    },
  })

  if (PRODUCTION) {
    // Load build for prod
    win.loadURL(`file://${path.join(__dirname, '../../renderer/build/index.html')}`)
  } else {
    // Load React
    win.loadURL('http://localhost:3000')

    // Open the DevTools.
    win.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  // Init API
  require('./codegen')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  console.log('restart')
  killProjects()

  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  killProjects()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// Redux Devtools extension
if (!PRODUCTION) {
  installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS], true)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err))
}
