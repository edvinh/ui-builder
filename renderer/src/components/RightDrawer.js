import React from 'react'
import PropTypes from 'prop-types'
import {
  List,
  ListItem,
  ListSubheader,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from '@material-ui/core'
import CodeIcon from '@material-ui/icons/Code'
import Drawer from './Drawer'

const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1)

/**
 * Renders a text view.
 * @param {string} key The prop key. This will be the label as well.
 * @param {string} value The initial value.
 * @param {function} handleChange Function returning the corresponding onChange function.
 */
const renderTextView = (key, value, handleChange) => (
  <TextField
    label={capitalize(key)}
    value={value || ''}
    onChange={handleChange(key)}
    margin="normal"
    fullWidth
  />
)

/**
 * Renders a select view.
 * @param {string} key The prop key. This will be the label as well.
 * @param {string} value The initial value.
 * @param {string[]} values The array of allowed values.
 * @param {function} handleChange Function returning the corresponding onChange function.
 */
const renderSelect = (key, value, values, handleChange) => (
  <span style={{ width: '100%' }}>
    <InputLabel htmlFor={key}>{capitalize(key)}</InputLabel>
    <Select
      fullWidth
      value={value}
      onChange={handleChange(key)}
      inputProps={{
        name: key,
        id: key,
      }}
    >
      {values.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </span>
)

const renderPropsList = (props, propTypes, handleChange) => {
  // If we have no propTypes to go after, just render text views
  if (!propTypes) {
    return Object.keys(props).map(key => (
      <ListItem key={key}>{renderTextView(key, props[key], handleChange)}</ListItem>
    ))
  }

  // If we have propTypes to go after, render the appropriate input view
  return Object.keys(propTypes).map(key => (
    <ListItem key={key}>
      {propTypes[key] === 'string'
        ? renderTextView(key, props[key], handleChange)
        : renderSelect(key, props[key], propTypes[key].oneOf, handleChange)}
    </ListItem>
  ))
}

const emptyDrawerStyle = { alignItems: 'center', justifyContent: 'center', textAlign: 'center' }

const RightDrawer = ({ selectedComponent, updateComponent, deleteComponent }) => {
  if (!selectedComponent) {
    return (
      <Drawer style={emptyDrawerStyle}>
        <CodeIcon color="action" fontSize="large" />
        <Typography variant="subheading">Click on a component to access its properties.</Typography>
      </Drawer>
    )
  }

  const handleChange = prop => (event) => {
    const newValue = { [prop]: event.target.value }

    // Special case if changing child, unique for Text Component
    if (prop === 'children') {
      updateComponent({ id: selectedComponent.id, changedChildren: [event.target.value] })
      return
    }

    updateComponent({ id: selectedComponent.id, changedProps: newValue })
  }

  const { props, propTypes } = selectedComponent
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
        {renderPropsList(props, propTypes, handleChange)}
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
