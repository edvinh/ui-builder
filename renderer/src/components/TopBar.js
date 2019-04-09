import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import ViewToggleButtonGroup from './ViewToggleButtonGroup'

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: 120,
    '&:focus': {
      width: 200,
    },
  },
})

const StyledAppBar = styled(AppBar)`
  && {
    width: calc(100% - ${props => props.leftOffset}px);
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 16px;
`

const TopBar = ({ classes, leftOffset, switchPlatformView }) => (
  <Wrapper>
    <StyledAppBar position="static" color="default" leftOffset={leftOffset}>
      <Toolbar variant="dense">
        <ViewToggleButtonGroup onChange={switchPlatformView} />

        <div className={classes.grow} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
      </Toolbar>
    </StyledAppBar>
  </Wrapper>
)

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  leftoffset: PropTypes.number.isRequired,
}

TopBar.defaultProps = {
  leftoffset: 0,
}

export default withStyles(styles)(TopBar)
