import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

const List = styled.div`
  background: ${props => (props.isDraggingOver ? 'lightblue' : 'lightgrey')};
  padding: 2px;
  width: 100%;
  height: 100%;
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

export default ItemList
