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
  OutlinedInput,
  FormControl,
  FormControlLabel,
  Switch,
} from '@material-ui/core'
import CodeIcon from '@material-ui/icons/Code'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import Drawer from './Drawer'

const emptyDrawerStyle = { alignItems: 'center', justifyContent: 'center', textAlign: 'center' }

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
    margin="dense"
    variant="outlined"
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
  <FormControl variant="outlined" style={{ width: '100%' }}>
    <InputLabel style={{ backgroundColor: '#444', paddingRight: 4, borderRadius: 4 }} htmlFor={key}>
      {capitalize(key)}
    </InputLabel>
    <Select
      fullWidth
      label={capitalize(key)}
      value={value}
      onChange={handleChange(key)}
      input={<OutlinedInput margin="dense" labelWidth={10} name={key} id={key} />}
      variant="outlined"
    >
      {values.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

const renderCheckbox = (key, value, handleChange) => (
  <FormControlLabel
    control={<Switch checked={value} onChange={handleChange(key, true)} />}
    label={capitalize(key)}
  />
)

/**
 *
 * @param {Object} props The props
 * @param {?Object} propTypes
 * @param {Function} handleChange
 */
const renderPropsList = (props, propTypes, handleChange) => {
  // If we have no propTypes to go after, use the props object
  const selectedPropObject = propTypes || props

  return Object.keys(selectedPropObject).map((key) => {
    let renderedView = null

    // Get the type, either off of propTypes (if defined) or typeof prop
    const type = propTypes ? propTypes[key] : typeof props[key]

    // Render a text view if type is a string or a number
    if (type === 'string' || type === 'number') {
      renderedView = renderTextView(key, props[key], handleChange)
    }

    // Render a checkbox if type is boolean
    if (type === 'boolean') {
      renderedView = renderCheckbox(key, props[key], handleChange)
    }

    // If the type has a oneOf array, render a Select view
    if (type.oneOf) {
      renderedView = renderSelect(key, props[key], propTypes[key].oneOf, handleChange)
    }

    return <ListItem key={key}>{renderedView}</ListItem>
  })
}

const RightDrawer = ({ selectedComponent, updateComponent, deleteComponent }) => {
  if (!selectedComponent) {
    return (
      <Drawer style={emptyDrawerStyle}>
        <CodeIcon color="action" fontSize="large" />
        <Typography variant="subheading">Click on a component to access its properties.</Typography>
      </Drawer>
    )
  }

  const handleChange = (prop, isCheckbox = false) => (event) => {
    const value = isCheckbox ? event.target.checked : event.target.value
    const newValue = { [prop]: value }

    // Special case if changing child, unique for Text Component
    if (prop === 'children') {
      updateComponent({ id: selectedComponent.id, changedChildren: [value] })
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
              margin="dense"
              variant="outlined"
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
        style={{ margin: '12px 12px' }}
      >
        <DeleteIcon /> &nbsp; Delete {selectedComponent.displayName}
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
