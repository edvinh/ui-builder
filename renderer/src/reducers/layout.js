import { default as _ } from 'lodash'
import * as types from '../constants/types'
import { getComponentData } from '../utils/componentMapper'

const initialState = {
  layout: [
    {
      id: 'header1',
      ...getComponentData('header'),
    },
    {
      id: 'card1',
      ...getComponentData('card'),
    },
    {
      id: 'card2',
      ...getComponentData('card'),
    },
  ],
  rootBackground: '#999',
  selectedComponent: null,
}

export default function projectReducer (state = initialState, action) {
  switch (action.type) {
    case types.ADD_COMPONENT:
      return { ...state, layout: [...state.layout, action.payload] }

    case types.REMOVE_COMPONENT:
      return {
        ...state,
        layout: state.layout.filter(l => l.i !== action.payload),
      }

    case types.REPLACE_LAYOUT: {
      // // The new layout object (action.payload) doesn't have the
      // // `name` or `props` key on each item. We need manually add it from the old layout.
      // const newLayout = action.payload.map((newLayoutItem) => {
      //   const oldLayoutItem = state.layout.find(l => newLayoutItem.i === l.i)

      //   // Replace the layout item and add reapply the old layout item's name & props
      //   return {
      //     ...oldLayoutItem,
      //     ...newLayoutItem,
      //   }
      // })

      // return {
      //   ...state,
      //   layout: newLayout,
      // }

      return {
        ...state,
        layout: _.cloneDeep(action.payload),
      }
    }

    case types.SELECT_COMPONENT:
      return {
        ...state,
        selectedComponent: action.payload,
      }

    case types.UPDATE_COMPONENT: {
      const newLayout = _.cloneDeep(state.layout)
      const component = newLayout.find(c => c.id === action.payload.id)

      // TODO Recursive find
      if (!component) {
        return state
      }

      // If it was a prop change
      if (action.payload.changedProps) {
        component.props = { ...component.props, ...action.payload.changedProps }
      }

      // If it was a change in children (e.g. in Text View)
      if (action.payload.changedChildren) {
        component.children = [...action.payload.changedChildren]
      }

      return {
        ...state,
        layout: newLayout,
        selectedComponent: component,
      }
    }

    default:
      return state
  }
}
