import _ from 'lodash'

/** Finds a component and returns a reference to it. */
const findComponent = (layout, componentId) => {
  // Check if in root
  let component = layout.find(c => c.id === componentId)

  // If not, check children
  if (!component) {
    layout.some((c) => {
      component = c.children.find(child => child.id === componentId)
      return !!component
    })
  }

  return component
}

/** Finds a component and deletes it. Returns a new layout & deleted component. Pure function. */
const deleteComponent = (layout, componentId) => {
  // Check if in root
  let component = layout.find(c => c.id === componentId)
  let newLayout = [...layout]

  // If not, check children
  if (component) {
    newLayout = newLayout.filter(c => c.id !== component.id)
  } else {
    newLayout = _.cloneDeep(newLayout)
    newLayout.some((c) => {
      component = c.children.find(child => child.id === componentId)
      if (component) {
        c.children = c.children.filter(c => c.id !== component.id)
      }
      return !!component
    })
  }

  return [newLayout, component]
}

export { findComponent, deleteComponent }
