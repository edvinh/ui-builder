import Card from '../components/grid/Card'
import Header from '../components/grid/Header'
import Container from '../components/grid/Container'

const components = [
  {
    displayName: 'Action Bar',
    name: 'actionbar',
    component: Header,
    layout: {
      x: 0,
      y: 0,
      w: 12,
      h: 7,
      static: true,
    },
    props: {
      title: 'Title',
      leftIcon: 'menu',
    },
  },
  {
    displayName: 'Card',
    name: 'card',
    component: Card,
    layout: {
      x: 0,
      y: 0,
      w: 12,
      h: 24,
    },
    props: {
      content: 'Card Content',
      title: 'Card Title',
    },
  },
  {
    displayName: 'Container',
    name: 'container',
    component: Container,
    layout: {
      x: 0,
      y: 5,
      w: 12,
      h: 24,
    },
  },
]

export function getComponents () {
  return components
}

export function getLayout (componentName) {
  return components.find(component => component.name === componentName).layout
}

export function getDefaultProps (componentName) {
  return components.find(component => component.name === componentName).props
}

export function getComponent (componentName) {
  return components.find(component => component.name === componentName).component
}
