import React from 'react'
import styled from 'styled-components'
import { getComponent } from '../../utils/componentMapper'

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

  let FirstComponent = null
  let SecondComponent = null

  if (firstChild) {
    FirstComponent = getComponent(firstChild.name)
  }

  if (secondChild) {
    SecondComponent = getComponent(secondChild.name)
  }

  return (
    <Container {...rest}>
      {FirstComponent ? (
        <FirstComponent {...firstChild.props} children={{ ...firstChild.children }} />
      ) : (
        <EmptySlot />
      )}
      {SecondComponent ? (
        <SecondComponent {...secondChild.props} children={{ ...secondChild.children }} />
      ) : (
        <EmptySlot />
      )}
    </Container>
  )
}

export default SplitView
