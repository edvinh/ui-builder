import * as types from '../constants/types'
import { getLayout } from '../utils/componentMapper'

export function addComponent (componentName) {
  const component = getLayout(componentName)

  component.name = componentName

  // TODO 0.0001% risk for a collision... good enough for now :-)
  component.i = `${componentName}-${(Math.random() * 10000).toFixed(0)}`

  return {
    type: types.ADD_COMPONENT,
    payload: component,
  }
}

export function removeComponent (componentId) {
  return {
    type: types.REMOVE_COMPONENT,
    payload: componentId,
  }
}

export function updateComponent (component) {
  return {
    type: types.UPDATE_COMPONENT,
    payload: component,
  }
}

export function replaceLayout (layout) {
  return {
    type: types.REPLACE_LAYOUT,
    payload: layout,
  }
}
