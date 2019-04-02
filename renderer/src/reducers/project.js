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

    case types.ADD_VIEW: {
      const view = action.payload
      view.id = state.views.length
      view.name = view.name || `View ${view.id}`
      return { ...state, views: [...state.views, view] }
    }

    case types.DELETE_VIEW: {
      const newViews = state.views.filter(v => v.id === action.payload)
      return { ...state, views: newViews }
    }

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

    default:
      return state
  }
}
