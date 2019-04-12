import * as types from '../constants/types'
import * as API from './api'

export function getProjectName () {
  return async (dispatch, getState) => {
    // const name = await API.getProjectName()
    dispatch({
      type: types.GET_PROJECT_NAME,
      payload: getState().project.name,
    })
  }
}

export function setProjectName (name) {
  return async (dispatch) => {
    const projName = await API.setProjectName(name)
    dispatch({
      type: types.SET_PROJECT_NAME,
      payload: projName,
    })
  }
}

export function switchPlatformView (platformView) {
  return {
    type: types.SWITCH_PLATFORM_VIEW,
    payload: platformView,
  }
}

export function startServers () {
  return async (dispatch) => {
    dispatch({
      type: types.START_SERVERS,
    })

    API.startServers()

    // dispatch({
    //  type: types.START_SERVERS_SUCCESS,
    // })
  }
}

export function killServers () {
  return async (dispatch) => {
    dispatch({
      type: types.KILL_SERVERS,
    })

    API.killServers()

    // dispatch({
    //  type: types.KILL_SERVERS_SUCCESS,
    // })
  }
}

export function checkIfProjectServersStarted () {
  return async (dispatch) => {
    dispatch({
      type: types.CHECK_SERVERS_STARTED,
    })

    const res = await API.checkIfServersStarted()

    dispatch({
      type: types.CHECK_SERVERS_STARTED_SUCCESS,
      payload: res,
    })
  }
}
