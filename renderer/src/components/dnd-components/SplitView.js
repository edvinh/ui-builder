import React from 'react'
import styled from 'styled-components'
import Item from '../dnd/Item'

const Container = styled.div`
  position: relative;
  z-index: 0;
  border: 1px solid green;
  display: flex;
  width: 100%;
  height: 200px;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  padding: 2px;
`

const EmptySlot = styled.div`
  border: 2px dotted #ccc;
  border-radius: 8px;
  height: 100%;
  width: 49%;
`

/* WIP */
const SplitView = ({ children, ...rest }) => {
  const firstChild = children[0]
  const secondChild = children[1]

  return (
    <Container {...rest}>
      {firstChild ? <Item index={0} item={firstChild} key={`child-item-1`} /> : <EmptySlot />}
      {secondChild ? <Item index={1} item={secondChild} key={`child-item-2`} /> : <EmptySlot />}
    </Container>
  )
}

export default SplitView
