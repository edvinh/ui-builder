import * as types from '../constants/types'

const initialState = {
  name: 'Untitled',
  views: [],
  platformView: 'mobile',
}

export default function projectReducer (state = initialState, action) {
  switch (action.type) {
    case types.GET_PROJECT_NAME:
      return state.name

    case types.SET_PROJECT_NAME:
      return { ...state, name: action.payload.name }

    case types.SWITCH_PLATFORM_VIEW:
      return {
        ...state,
        platformView: action.payload,
      }
    case types.START_SERVERS:
      return {
        ...state,
        projectServersStarted: true,
      }

    case types.KILL_SERVERS:
      return {
        ...state,
        projectServersStarted: false,
      }

    case types.CHECK_SERVERS_STARTED_SUCCESS: {
      return {
        ...state,
        projectServersStarted: action.payload,
      }
    }

    default:
      return state
  }
}
