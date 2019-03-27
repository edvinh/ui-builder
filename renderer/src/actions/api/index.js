/* global electron */
const { ipcRenderer } = electron

/* API calls to electron's main thread goes here */

export function getProjectName () {
  // Mock api call
  return Promise.resolve('Project Name')
}

export function setProjectName (name) {
  // Mock API call
  return Promise.resolve(name)
}

export function generateCode (layout) {
  ipcRenderer.send('GENERATE_CODE', JSON.stringify(layout))
}
