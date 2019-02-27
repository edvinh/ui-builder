import * as types from '../constants/types'
import * as API from './api'

export function getProjectName() {
  return async (dispatch, getState) => {
    // const name = await API.getProjectName()
    dispatch({
      type: types.GET_PROJECT_NAME,
      payload: getState().project.name,
    })
  }
}

export function setProjectName(name) {
  return async dispatch => {
    const name = await API.setProjectName(name)
    dispatch({
      type: types.SET_PROJECT_NAME,
      payload: name,
    })
  }
}
