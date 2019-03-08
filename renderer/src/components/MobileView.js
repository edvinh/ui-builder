import React, { Component } from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import RGL, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import Header from './grid/Header'
import Card from './grid/Card'
import GridItem from './grid/GridItem'

const GridLayout = WidthProvider(RGL)

const StyledPaper = styled(Paper)`
  width: ${props => props.viewHeight * 0.5625}px;
  height: ${props => props.viewHeight}px;
  margin: 0 auto;
`

const StyledGridLayout = styled(GridLayout)`
  position: relative;
  padding: 0;
  height: ${props => props.viewHeight}px;
  width: ${props => props.viewHeight * 0.5625}px;
`

const layout = [
  {
    i: 'header',
    x: 0,
    y: 0,
    w: 12,
    h: 7,
    static: true,
  },
  {
    i: 'card1',
    x: 0,
    y: 7,
    w: 6,
    h: 23,

    // minW: 2,
    // maxW: 4,
  },
  {
    i: 'card2',
    x: 6,
    y: 7,
    w: 6,
    h: 23,
  },
]

export default class MobileView extends Component {
  state = {
    viewHeight: window.innerHeight - 110,
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions = () => this.setState({ viewHeight: window.innerHeight - 110 })

  render () {
    return (
      <StyledPaper viewHeight={this.state.viewHeight}>
        <StyledGridLayout
          containerPadding={[0, 0]}
          layout={layout}
          cols={12}
          margin={[0, 0]}
          rowHeight={8}
          viewHeight={this.state.viewHeight}
        >
          <GridItem key="header">
            <Header />
          </GridItem>
          <GridItem key="card1">
            <Card />
          </GridItem>
          <GridItem key="card2">
            <Card />
          </GridItem>
        </StyledGridLayout>
      </StyledPaper>
    )
  }
}
