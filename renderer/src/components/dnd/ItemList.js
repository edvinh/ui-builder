import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

const List = styled.div`
  background: ${props => (props.isDraggingOver ? 'lightblue' : '#eee')};
  padding: 2px;
  width: 100%;
  overflow-y: auto;
  transition: all 150ms ease-in-out;
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 12px;
    height: 18px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    height: 6px;
    border: 3px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`

const ItemList = ({ children, ...rest }) => (
  <Droppable isCombineEnabled {...rest}>
    {(provided, snapshot) => (
      <List ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
        {children}
        {provided.placeholder}
      </List>
    )}
  </Droppable>
)

ItemList.propTypes = {
  children: PropTypes.any,
}

export default ItemList
