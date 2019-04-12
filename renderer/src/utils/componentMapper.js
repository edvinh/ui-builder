import Card from '../components/dnd-components/Card'
import Header from '../components/dnd-components/Header'
import SplitView from '../components/dnd-components/SplitView'
import Text from '../components/dnd-components/Text'
import Button from '../components/dnd-components/Button'

const components = [
  {
    displayName: 'Header',
    name: 'header',
    component: Header,
    children: [],
    canHaveChildren: false,
    props: {
      title: 'Title',
      leftIcon: 'menu',
      rightIcon: null,
      placement: 'center',
      backgroundColor: '#03A9F4',
      foregroundColor: 'white',
    },
    propTypes: {
      title: 'string',
      leftIcon: 'string',
      rightIcon: 'string',
      backgroundColor: 'string',
      foregroundColor: 'string',
      placement: {
        type: 'string',
        oneOf: ['center', 'left', 'right'],
      },
    },
  },
  {
    displayName: 'Card',
    name: 'card',
    component: Card,
    children: [],
    canHaveChildren: true,
    props: {
      title: 'Card Title',
      image: null,
    },
  },

  // {
  //   displayName: 'Split View',
  //   name: 'splitview',
  //   component: SplitView,
  //   children: [],
  //   canHaveChildren: true,
  //   props: {},
  // },
  {
    displayName: 'Text',
    name: 'text',
    component: Text,
    children: ['Text View'],
    canHaveChildren: false,
    props: {
      color: '#222',
      fontSize: 12,
      textAlign: 'left',
      fontWeight: 'normal',
    },
    propTypes: {
      color: 'string',
      fontSize: 'string',
      textAlign: {
        type: 'string',
        oneOf: ['left', 'center', 'right', 'auto', 'justify'],
      },
      fontWeight: {
        type: 'string',
        oneOf: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      },
    },
  },
  {
    displayName: 'Button',
    name: 'button',
    component: Button,
    children: [],
    canHaveChildren: false,
    propTypes: {
      title: 'string',
      color: 'string',
      backgroundColor: 'string',
      type: {
        type: 'string',
        oneOf: ['solid', 'outline', 'clear'],
      },
    },
    props: {
      title: 'Button',
      color: 'white',
      backgroundColor: '#03A9F4',
      type: 'solid',
    },
  },
]

export function getComponents () {
  return components
}

export function getComponentData (componentName) {
  const {
    displayName, name, props, propTypes, canHaveChildren, children,
  } = components.find(
    component => component.name === componentName
  )
  return {
    displayName,
    name,
    props: { ...props },
    children: [...children],
    propTypes,
    canHaveChildren,
  }
}

export function getDefaultProps (componentName) {
  return components.find(component => component.name === componentName).props
}

export function getComponent (componentName) {
  return components.find(component => component.name === componentName).component
}
