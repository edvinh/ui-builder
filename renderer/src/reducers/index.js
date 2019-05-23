import { combineReducers } from 'redux'
import projectReducer from './project'
import layoutReducer from './layout'

export default combineReducers({
  project: projectReducer,
  layout: layoutReducer,
})
