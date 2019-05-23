import _ from 'lodash'
import * as types from '../constants/types'
import * as API from './api'

import { getComponentData } from '../utils/componentMapper'

export function addComponent (componentName) {
  const component = getComponentData(componentName)

  // TODO 0.0001% risk for a collision... good enough for now :-)
  component.id = `${componentName}-${(Math.random() * 10000).toFixed(0)}`

  return {
    type: types.ADD_COMPONENT,
    payload: component,
  }
}

export function deleteComponent (componentId) {
  return {
    type: types.DELETE_COMPONENT,
    payload: componentId,
  }
}

export function updateComponent (component) {
  return {
    type: types.UPDATE_COMPONENT,
    payload: component,
  }
}

export function selectComponent (component) {
  return {
    type: types.SELECT_COMPONENT,
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
