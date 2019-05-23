import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'
import StopIcon from '@material-ui/icons/Stop'
import Fab from '@material-ui/core/Fab'

import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import * as projectActions from '../actions/projectActions'
import ToggleMetroButtonGroup from './ToggleMetroButtonGroup'

const StyledAppBar = styled(AppBar)`
  && {
    width: 100%;
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const TopBar = ({
  projectServersStarted,
  killServers,
  startServers,
  checkIfProjectServersStarted,
}) => {
  useEffect(() => {
    checkIfProjectServersStarted()
  }, [])

  const toggleProjectServers = () => {
    if (projectServersStarted) {
      killServers()
    } else {
      startServers()
    }
  }

  return (
    <Wrapper>
      <StyledAppBar position="static" color="default">
        <Toolbar
          variant="dense"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <ToggleMetroButtonGroup />
          <Tooltip
            title={
              projectServersStarted
                ? 'Stop Live Preview on web & mobile'
                : 'Start Live Preview on web & mobile'
            }
          >
            <Fab
              variant="extended"
              color={projectServersStarted ? 'secondary' : 'primary'}
              size="small"
              onClick={toggleProjectServers}
            >
              {projectServersStarted ? (
                <React.Fragment>
                  <StopIcon /> &nbsp; Stop Project &nbsp;
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <PlayIcon /> &nbsp; Launch Project &nbsp;
                </React.Fragment>
              )}
            </Fab>
          </Tooltip>
        </Toolbar>
      </StyledAppBar>
    </Wrapper>
  )
}

TopBar.propTypes = {
  projectServersStarted: PropTypes.bool.isRequired,
  killServers: PropTypes.func.isRequired,
  startServers: PropTypes.func.isRequired,
  checkIfProjectServersStarted: PropTypes.func.isRequired,
}

function mapStateToProps (state) {
  return {
    projectServersStarted: state.project.projectServersStarted,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...projectActions }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)
