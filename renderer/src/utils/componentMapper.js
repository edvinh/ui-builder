import Card from '../components/grid/Card'
import Header from '../components/grid/Header'

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
  },
]

export function getComponents () {
  return components
}

export function getLayout (componentName) {
  return components.find(component => component.name === componentName).layout
}

export function getComponent (componentName) {
  return components.find(component => component.name === componentName).component
}
