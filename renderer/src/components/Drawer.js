import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width: 20%;
  min-height: calc(100vh - 48px);
  background-color: #444;
`

const Drawer = ({ children, ...rest }) => <StyledWrapper {...rest}>{children}</StyledWrapper>

export default Drawer
