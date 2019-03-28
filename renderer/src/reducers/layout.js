import * as types from '../constants/types'

const initialState = {
  layout: [
    {
      name: 'actionbar',
      i: 'header',
      x: 0,
      y: 0,
      w: 6,
      h: 7,
      static: true,
      props: {
        leftIcon: 'menu',
        rightIcon: 'home',
        title: 'Header Title',
      },
    },
    {
      name: 'card',
      i: 'card1',
      x: 0,
      y: 7,
      w: 6,
      h: 23,
      props: {
        title: 'Card Title',
        content: 'Card Content',
      },
    },
    {
      name: 'card',
      i: 'card2',
      x: 6,
      y: 7,
      w: 6,
      h: 23,
      props: {
        title: 'Card Title 2',
        content: 'Card Content 2',
      },
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
      // The new layout object (action.payload) doesn't have the
      // `name` or `props` key on each item. We need manually add it from the old layout.
      const newLayout = action.payload.map((newLayoutItem) => {
        const oldLayoutItem = state.layout.find(l => newLayoutItem.i === l.i)

        // Replace the layout item and add reapply the old layout item's name & props
        return {
          ...oldLayoutItem,
          ...newLayoutItem,
        }
      })

      return {
        ...state,
        layout: newLayout,
      }
    }
    default:
      return state
  }
}
