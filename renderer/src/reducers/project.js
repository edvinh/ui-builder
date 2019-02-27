import * as types from '../constants/types'

const initialState = {
  name: 'Untitled',
}

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_PROJECT_NAME:
      return state.name
    case types.SET_PROJECT_NAME:
      return { ...state, name: action.payload.name }
    default:
      return state
  }
}
