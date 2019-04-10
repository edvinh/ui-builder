import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  List, ListItem, ListSubheader, TextField, Button,
} from '@material-ui/core'
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

const RightDrawer = ({ selectedComponent, updateComponent, deleteComponent }) => {
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
        style={{ height: '100%' }}
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
      <Button
        variant="contained"
        color="secondary"
        onClick={() => deleteComponent(selectedComponent.id)}
        style={{ margin: '32px 12px' }}
      >
        Delete {selectedComponent.displayName}
      </Button>
    </Drawer>
  )
}

RightDrawer.propTypes = {
  selectedComponent: PropTypes.object,
  updateComponent: PropTypes.func.isRequired,
  deleteComponent: PropTypes.func.isRequired,
}

RightDrawer.defaultProps = {
  selectedComponent: {},
}

export default RightDrawer
