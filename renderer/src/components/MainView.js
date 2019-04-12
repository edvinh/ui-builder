/* eslint-disable no-param-reassign */
/* global window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import Item from './dnd/Item'
import ItemList from './dnd/ItemList'
import * as layoutActions from '../actions/layoutActions'

const reorder = (list, startIndex, endIndex) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const insert = (list, item, index) => {
  const newList = [...list]
  newList.splice(index, 0, item)
  return newList
}

const recursiveDelete = (items, id) => {
  const itemsCopy = [...items]
  let droppedItem = itemsCopy.find(item => item.id === id)
  if (!droppedItem) {
    itemsCopy
      .filter(item => item.canHaveChildren)
      .some((item) => {
        droppedItem = item.children.find(child => child.id === id)
        if (droppedItem) {
          item.children = item.children.filter(child => child.id !== id)
          return true
        }

        return false
      })
  }

  return [itemsCopy, droppedItem]
}

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

const maxContainerHeight = 768
const maxContainerWidth = maxContainerHeight * 0.5625

const Container = styled.div`
  display: flex;
  margin: 32px auto 16px auto;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  max-height: ${maxContainerHeight}px;
  max-width: ${maxContainerWidth}px;
  overflow-y: auto;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
`

class MainView extends Component {
  constructor () {
    super()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions = () => {
    const { width, height } = calcViewport(this.props.platformView)
    this.setState({ width, height })
  }

  onDragEnd = (result) => {
    const {
      source, destination, combine, draggableId,
    } = result

    // Dropped outside the list
    if (!destination && !combine) {
      return
    }

    let items = [...this.props.layout]
    let droppedItem = items.find(i => i.id === draggableId)

    if (combine) {
      const itemDroppedOn = items.find(i => i.id === combine.draggableId)
      if (!itemDroppedOn || !itemDroppedOn.canHaveChildren) {
        return
      }

      // Sometimes droppedItem is undefined during combine... dont know why
      if (!droppedItem) {
        return
      }

      // No more than 2 children on splitviews
      if (itemDroppedOn.children.length >= 2 && itemDroppedOn.name === 'splitview') {
        return
      }

      // Cards cant be children of cards
      if (droppedItem.name === 'card' && itemDroppedOn.name === 'card') {
        return
      }

      itemDroppedOn.children.push(droppedItem)
      items = items.filter(item => item.id !== droppedItem.id)
      this.updateLayout(items)
      return
    }

    // Child component moved out to root
    if (!droppedItem) {
      [items, droppedItem] = recursiveDelete(items, draggableId)
      items = insert(items, droppedItem, destination.index)
      this.updateLayout(items)
      return
    }

    const newItems = reorder(items, source.index, destination.index)

    this.updateLayout(newItems)
  }

  updateLayout = (layout) => {
    this.props.replaceLayout(layout)
  }

  render () {
    const { layout, platformView } = this.props
    const { width, height } = calcViewport(platformView)

    return (
      <Container width={width} height={height} id="rootView" onClick={this.onViewClick}>
        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
          <ItemList droppableId="droppable">
            {layout.map((item, index) => (
              <Item index={index} item={item} key={`item-${index}`} />
            ))}
          </ItemList>
        </DragDropContext>
      </Container>
    )
  }
}

MainView.propTypes = {
  layout: PropTypes.array.isRequired,
  platformView: PropTypes.string.isRequired,
  replaceLayout: PropTypes.func.isRequired,
  selectComponent: PropTypes.func.isRequired,
}

function mapStateToProps (state) {
  return {
    layout: state.layout.layout,
    platformView: state.project.platformView,
    selectedComponent: state.layout.selectedComponent,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...layoutActions }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView)
