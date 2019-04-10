import React, { useState } from 'react'
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  Menu,
  MenuItem,
  Button,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import MoreIcon from '@material-ui/icons/MoreVert'
import styled from 'styled-components'
import { getComponents } from '../utils/componentMapper'
import Drawer from './Drawer'

const componentTypes = getComponents()

const StyledListSubheader = styled(ListSubheader)`
  display: flex;
  justify-content: space-between;
  margin-right: -12px;
  padding: 4px;
`

const LeftDrawer = ({
  toggleProjectServers,
  addComponent,
  generateCode,
  projectServersStarted,
}) => (
  <Drawer anchor="left">
    <List
      component="nav"
      subheader={<StyledListSubheader component="span">Component Library</StyledListSubheader>}
    >
      {componentTypes.map((type, i) => (
        <ListItem button onClick={() => addComponent(type.name)} key={`${type.name}-${i}`}>
          <ListItemText primary={type.displayName} />
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
    <Button
      variant="contained"
      color="secondary"
      style={{ margin: '32px 8px' }}
      onClick={generateCode}
    >
      Generate Code
    </Button>
    <Button
      variant="contained"
      color="secondary"
      style={{ margin: '16px 8px' }}
      onClick={toggleProjectServers}
    >
      {projectServersStarted ? 'Stop Project' : 'Launch Project'}
    </Button>
  </Drawer>
)

export default LeftDrawer
