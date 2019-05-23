import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  Button,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import GenerateIcon from '@material-ui/icons/Autorenew'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import { getComponents } from '../utils/componentMapper'
import Drawer from './Drawer'

const componentTypes = getComponents()

const StyledListSubheader = styled(ListSubheader)`
  display: flex;
  justify-content: space-between;
  margin-right: -12px;
  padding: 4px;
`

const LeftDrawer = ({ addComponent, generateCode }) => (
  <Drawer
    anchor="left"
    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
  >
    <List
      component="nav"
      subheader={<StyledListSubheader component="span">Component Library</StyledListSubheader>}
    >
      {componentTypes.map((type, i) => (
        <ListItem button onClick={() => addComponent(type.name)} key={`${type.name}-${i}`}>
          <ListItemText primary={type.displayName} />
          <Tooltip title={`Click to add ${type.name}`}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
          </Tooltip>
        </ListItem>
      ))}
    </List>
    <Button
      variant="contained"
      color="secondary"
      size="large"
      style={{ borderRadius: 0, paddingTop: 16, paddingBottom: 16 }}
      onClick={generateCode}
    >
      <GenerateIcon /> &nbsp; Generate Code
    </Button>
  </Drawer>
)

export default LeftDrawer
