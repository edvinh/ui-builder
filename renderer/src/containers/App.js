import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as projectActions from '../actions/projectActions'
import * as layoutActions from '../actions/layoutActions'
import ViewToggleButtonGroup from '../components/ViewToggleButtonGroup'
import TopBar from '../components/TopBar'
import LeftDrawer from '../components/LeftDrawer'
import MainView from '../components/MainView'

const drawerWidth = 250

const StyledWrapper = styled.div`
  margin-left: ${drawerWidth}px;
`

const App = (props) => {
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

  const generateCode = () => {
    props.generateCode(props.layout)
  }

  const toggleProjectServers = () => {
    if (props.projectServersStarted) {
      props.killServers()
    } else {
      props.startServers()
    }
  }

  return (
    <StyledWrapper>
      <TopBar switchPlatformView={platform => props.switchPlatformView(platform)} />
      <LeftDrawer
        generateCode={generateCode}
        toggleProjectServers={toggleProjectServers}
        addComponent={addComponent}
        addView={addView}
        addFolder={addFolder}
        projectServersStarted={props.projectServersStarted}
      />
      <MainView />
    </StyledWrapper>
  )
}

function mapStateToProps (state) {
  return {
    views: state.project.views,
    projectName: state.project.name,
    layout: state.layout.layout,
    projectServersStarted: state.project.projectServersStarted,
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
)(App)
