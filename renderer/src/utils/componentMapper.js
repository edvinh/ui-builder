import Checkbox from '../components/dnd-components/Checkbox'
import Card from '../components/dnd-components/Card'
import Header from '../components/dnd-components/Header'
import Text from '../components/dnd-components/Text'
import Button from '../components/dnd-components/Button'
import Input from '../components/dnd-components/Input'

const components = [
  {
    displayName: 'Header',
    name: 'header',
    component: Header,
    children: [],
    canHaveChildren: false,
    props: {
      title: 'Title',
      subtitle: null,
      leftIcon: 'menu',
      rightIcon: 'more-vert',
      placement: 'center',
      backgroundColor: '#6200ee',
      foregroundColor: 'white',
    },
    propTypes: {
      title: 'string',
      subtitle: 'string',
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
      image: '',
    },
  },
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
    props: {
      title: 'Button',
      color: '#6200ee',
      icon: null,
      type: 'contained',
    },
    propTypes: {
      title: 'string',
      icon: 'string',
      color: 'string',
      type: {
        type: 'string',
        oneOf: ['text', 'outlined', 'contained'],
      },
    },
  },
  {
    displayName: 'Input',
    name: 'input',
    component: Input,
    children: [],
    canHaveChildren: false,
    props: {
      placeholder: 'Placeholder',
      mode: 'outlined',
      label: 'Label',
      password: false,
    },
    propTypes: {
      label: 'string',
      placeholder: 'string',
      mode: {
        type: 'string',
        oneOf: ['outlined', 'flat'],
      },
      password: 'boolean',
    },
  },
  {
    displayName: 'Checkbox',
    name: 'checkbox',
    component: Checkbox,
    children: [],
    canHaveChildren: false,
    props: {
      label: 'Label',
      align: 'flex-start',
      checked: false,
    },
    propTypes: {
      label: 'string',
      align: {
        type: 'string',
        oneOf: ['flex-start', 'center', 'flex-end'],
      },
      checked: 'boolean',
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
