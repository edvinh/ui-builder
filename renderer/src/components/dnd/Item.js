import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { getComponent } from '../../utils/componentMapper'

const Container = styled.div`
  /* border: 1px solid green; */
  /* border-radius: 2px; */
  margin-bottom: 16px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDragDisabled ? 'lightgrey' : props.isDragging ? 'lightgreen' : 'transparent')};
`

const Item = ({
  index, item, onItemClick, ...rest
}) => {
  const Component = getComponent(item.name)
  return (
    <Draggable key={item.id} draggableId={item.id} index={index} {...rest}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={evt => onItemClick(evt, item)}
          isDragging={snapshot.isDragging}
        >
          <Component {...item.props} children={item.children} />
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  )
}

export default Item
