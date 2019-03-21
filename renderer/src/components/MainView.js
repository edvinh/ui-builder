import React, { Component } from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import GridLayout from 'react-grid-layout'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as layoutActions from '../actions/layoutActions'
import GridItem from './grid/GridItem'
import ContextMenu from './ContextMenu'
import { getComponent } from '../utils/componentMapper'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const calcViewport = (platform) => {
  const height = window.innerHeight - 110

  if (platform === 'web') {
    return {
      width: height * 1.7778,
      height,
    }
  }

  return {
    width: height * 0.5625,
    height,
  }
}

const StyledPaper = styled(Paper)`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  max-height: ${props => props.height}px;
  /* overflow-y: scroll; */
  overflow-x: hidden;
  margin: 0 auto;
`

class MobileView extends Component {
  constructor (props) {
    super(props)

    const { width, height } = calcViewport(props.platformView, window.innerHeight)
    this.state = {
      width,
      height,
      selectedComponent: null,
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions = () => {
    const { width, height } = calcViewport(this.props.platform)
    this.setState({ width, height })
  }

  onViewClick = (evt) => {
    if (evt.target.id === 'rootView') {
      // TODO
    }
  }

  onGridItemClick = (componentId) => {
    this.setState({
      selectedComponent: componentId,
    })
  }

  onGridItemRightClick = (componentId, evt) => {
    this.setState({
      showContextMenu: true,
      mouseX: evt.clientX,
      mouseY: evt.clientY,
      selectedComponent: componentId,
    })
  }

  onDelete = () => {
    this.props.removeComponent(this.state.selectedComponent)
    this.setState({ showContextMenu: false, selectedComponent: null })
  }

  mapLayoutToGrid = () => this.props.layout
    .map(component => ({
      Component: getComponent(component.name),
      id: component.i,
    }))
    .map(component => (
      <GridItem
        id={component.id}
        key={component.id}
        onClick={this.onGridItemClick}
        onRightClick={this.onGridItemRightClick}
      >
        <component.Component />
      </GridItem>
    ))

  render () {
    const { showContextMenu, mouseX, mouseY } = this.state

    const { width, height } = calcViewport(this.props.platformView)

    return (
      <StyledPaper
        width={width}
        height={height}
        style={{ backgroundColor: '#222' }}
        id="rootView"
        onClick={this.onViewClick}
      >
        <GridLayout
          containerPadding={[0, 0]}
          layout={this.props.layout}
          cols={12}
          margin={[0, 0]}
          rowHeight={8}
          width={width}
          height={height}
          onLayoutChange={layout => this.props.replaceLayout(layout)}
        >
          {this.mapLayoutToGrid()}
        </GridLayout>
        {showContextMenu && (
          <ContextMenu
            x={mouseX}
            y={mouseY}
            onDelete={this.onDelete}
            onClickAway={() => this.setState({ showContextMenu: false, selectedComponent: null })}
          />
        )}
      </StyledPaper>
    )
  }
}

function mapStateToProps (state) {
  return {
    layout: state.layout.layout,
    platformView: state.project.platformView,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...layoutActions }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileView)
