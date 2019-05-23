import React, { useEffect } from 'react'
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

  return (
    <div>
      <StyledWrapper>
        <LeftDrawer generateCode={generateCode} addComponent={addComponent} />
        <MainView />
        <RightDrawer
          selectedComponent={props.selectedComponent}
          updateComponent={props.updateComponent}
          deleteComponent={props.deleteComponent}
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

App.propTypes = {
  selectedComponent: PropTypes.object.isRequired,
  updateComponent: PropTypes.func.isRequired,
  addComponent: PropTypes.func.isRequired,
  deleteComponent: PropTypes.func.isRequired,
  checkIfProjectServersStarted: PropTypes.func.isRequired,
  generateCode: PropTypes.func.isRequired,
  killServers: PropTypes.func.isRequired,
  startServers: PropTypes.func.isRequired,
  projectServersStarted: PropTypes.bool,
  layout: PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
