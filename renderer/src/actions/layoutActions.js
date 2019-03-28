import * as types from '../constants/types'
import * as API from './api'

import { getLayout, getDefaultProps } from '../utils/componentMapper'

export function addComponent (componentName) {
  const component = getLayout(componentName)

  // Get default props
  component.props = getDefaultProps(componentName)

  // Set component name
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

export function generateCode (layout) {
  return async (dispatch) => {
    API.generateCode(layout)
    dispatch({
      type: types.GENERATE_CODE,
      payload: {
        success: true,
      },
    })
  }
}
