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
    default:
      return state
  }
}
