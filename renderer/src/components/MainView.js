import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
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
  console.log('insert', newList, item)
  return newList
}

const recursiveDelete = (items, id) => {
  console.log('items rec', items)
  const itemsCopy = [...items]
  console.log('items rec copy', itemsCopy)
  let droppedItem = itemsCopy.find(item => item.id === id)
  if (!droppedItem) {
    itemsCopy
      .filter(item => item.canHaveChildren)
      .forEach((item) => {
        console.log(item, id)
        droppedItem = item.children.find(child => child.id === id)
        if (droppedItem) {
          item.children = item.children.filter(child => child.id !== id)
        }
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

const StyledPaper = styled(Paper)`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  max-height: ${props => props.height}px;
  /* overflow-y: scroll; */
  overflow-x: hidden;
  margin: 0 auto;
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
    console.log('before', items)
    let droppedItem = items.find(i => i.id === draggableId)

    if (combine) {
      const itemDroppedOn = items.find(i => i.id === combine.draggableId)
      if (!itemDroppedOn.canHaveChildren) {
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

  onItemClick = (evt, item) => {
    this.setState({
      selectedComponent: item,
    })

    this.props.selectComponent(item)
  }

  render () {
    const { layout, platformView } = this.props
    const { width, height } = calcViewport(platformView)
    return (
      <StyledPaper width={width} height={height} id="rootView" onClick={this.onViewClick}>
        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
          <ItemList droppableId="droppable">
            {layout.map((item, index) => (
              <Item
                index={index}
                item={item}
                key={`item-${index}`}
                onItemClick={this.onItemClick}
              />
            ))}
          </ItemList>
        </DragDropContext>
      </StyledPaper>
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
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...layoutActions }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView)
