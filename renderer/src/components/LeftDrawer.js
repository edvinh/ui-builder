import React, { useState } from 'react'
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  Menu,
  MenuItem,
  withStyles,
  Button,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import MoreIcon from '@material-ui/icons/MoreVert'
import styled from 'styled-components'
import { getComponents } from '../utils/componentMapper'

const componentTypes = getComponents()
const drawerWidth = 250

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
})

const StyledListSubheader = styled(ListSubheader)`
  display: flex;
  justify-content: space-between;
  margin-right: -12px;
  padding: 4px;
`

const LeftDrawer = ({
  classes,
  addFolder,
  addView,
  toggleProjectServers,
  addComponent,
  generateCode,
  projectServersStarted,
}) => {
  const [openMenu, setOpenMenu] = useState({ anchorEl: null, open: false })

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
      anchor="left"
      open
    >
      <Menu
        onClose={() => setOpenMenu({ anchorEl: null, open: false })}
        anchorEl={openMenu.anchorEl}
        open={openMenu.open}
      >
        <MenuItem onClick={addFolder}>Add Folder</MenuItem>
        <MenuItem onClick={addView}>Add View</MenuItem>
      </Menu>
      <List
        component="nav"
        subheader={
          <StyledListSubheader component="span" style={{ width: '100%' }}>
            Views
            <IconButton onClick={evt => setOpenMenu({ anchorEl: evt.currentTarget, open: true })}>
              <MoreIcon />
            </IconButton>
          </StyledListSubheader>
        }
      >
        {componentTypes.map((type, i) => (
          <ListItem onClick={() => addComponent(type.name)} button key={`${type.name}-${i}`}>
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
}

export default withStyles(styles)(LeftDrawer)
