import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as projectActions from '../actions/projectActions'
import * as layoutActions from '../actions/layoutActions'
import LeftDrawer from '../components/LeftDrawer'
import MainView from '../components/MainView'
import RightDrawer from '../components/RightDrawer'

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
`

const App = (props) => {
  useEffect(() => {
    props.checkIfProjectServersStarted()
  }, [])

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

  const updateComponent = (component) => {
    props.updateComponent(component)
  }

  return (
    <div>
      <StyledWrapper>
        <LeftDrawer
          generateCode={generateCode}
          toggleProjectServers={toggleProjectServers}
          addComponent={addComponent}
          projectServersStarted={props.projectServersStarted}
        />
        <MainView />
        <RightDrawer
          selectedComponent={props.selectedComponent}
          updateComponent={updateComponent}
        />
      </StyledWrapper>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    projectName: state.project.name,
    layout: state.layout.layout,
    projectServersStarted: state.project.projectServersStarted,
    selectedComponent: state.layout.selectedComponent,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...projectActions, ...layoutActions }, dispatch)
}

App.propTypes = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
