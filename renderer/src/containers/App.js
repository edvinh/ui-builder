import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

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
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import MoreIcon from '@material-ui/icons/MoreVert'
import styled from 'styled-components'
import * as projectActions from '../actions/projectActions'
import * as layoutActions from '../actions/layoutActions'
import ViewToggleButtonGroup from '../components/ViewToggleButtonGroup'
import TopBar from '../components/TopBar'
import MainView from '../components/MainView'
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

const StyledWrapper = styled.div`
  margin-left: ${drawerWidth}px;
`

const StyledListSubheader = styled(ListSubheader)`
  display: flex;
  justify-content: space-between;
  margin-right: -12px;
  padding: 4px;
`

const App = (props) => {
  const [openMenu, setOpenMenu] = useState({ anchorEl: null, open: false })

  const addView = () => {
    props.addView({
      type: 'view',
    })
  }

  const addFolder = () => {
    props.addView({
      type: 'folder',
    })
  }

  const addComponent = (type) => {
    props.addComponent(type)
  }

  return (
    <StyledWrapper>
      <TopBar />
      <Drawer
        className={props.classes.drawer}
        classes={{
          paper: props.classes.drawerPaper,
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
            <StyledListSubheader component="div">
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
      </Drawer>
      <ViewToggleButtonGroup onChange={platform => props.switchPlatformView(platform)} />
      <MainView />
    </StyledWrapper>
  )
}

function mapStateToProps (state) {
  return {
    views: state.project.views,
    projectName: state.project.name,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...projectActions, ...layoutActions }, dispatch)
}

App.propTypes = {
  views: PropTypes.array.isRequired,
  addView: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
