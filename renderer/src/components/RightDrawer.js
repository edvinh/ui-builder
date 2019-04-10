import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import Drawer from './Drawer'

const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1)

const renderPropsList = (props, handleChange) => Object.keys(props).map(key => (
  <ListItem key={key}>
    <TextField
      label={capitalize(key)}
      value={props[key]}
      onChange={handleChange(key)}
      margin="normal"
      fullWidth
    />
  </ListItem>
))

const RightDrawer = ({ selectedComponent, updateComponent }) => {
  if (!selectedComponent) {
    return <Drawer />
  }

  const handleChange = propType => (event) => {
    const newValue = { [propType]: event.target.value }

    // Special case if changing child, unique for Text Component
    if (propType === 'children') {
      updateComponent({ id: selectedComponent.id, changedChildren: [event.target.value] })
      return
    }
    updateComponent({ id: selectedComponent.id, changedProps: newValue })
  }

  return (
    <Drawer>
      <List
        component="nav"
        subheader={<ListSubheader component="div">Component Settings</ListSubheader>}
      >
        {selectedComponent.name === 'text' && (
          <ListItem key="text-prop">
            <TextField
              label="Text"
              value={selectedComponent.children[0] || ''}
              onChange={handleChange('children')}
              fullWidth
              multiline
            />
          </ListItem>
        )}
        {Object.keys(selectedComponent.props).map(key => (
          <ListItem key={key}>
            <TextField
              label={capitalize(key)}
              value={selectedComponent.props[key] || ''}
              onChange={handleChange(key)}
              margin="normal"
              fullWidth
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

RightDrawer.propTypes = {
  selectedComponent: PropTypes.object,
  updateComponent: PropTypes.func.isRequired,
}

RightDrawer.defaultProps = {
  selectedComponent: {},
}

export default RightDrawer
