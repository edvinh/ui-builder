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
  {
    displayName: 'Split View',
    name: 'splitview',
    component: SplitView,
    children: [],
    canHaveChildren: true,
    props: {},
  },
  {
    displayName: 'Text',
    name: 'text',
    component: Text,
    children: ['Text View'],
    canHaveChildren: false,
    props: {},
  },
  {
    displayName: 'Button',
    name: 'button',
    component: Button,
    children: [],
    canHaveChildren: false,
    props: { title: 'Button' },
  },
]

export function getComponents () {
  return components
}

export function getComponentData (componentName) {
  const {
    displayName, name, props, canHaveChildren, children,
  } = components.find(
    component => component.name === componentName
  )
  return {
    displayName,
    name,
    props: { ...props },
    children: [...children],
    canHaveChildren,
  }
}

export function getDefaultProps (componentName) {
  return components.find(component => component.name === componentName).props
}

export function getComponent (componentName) {
  return components.find(component => component.name === componentName).component
}
