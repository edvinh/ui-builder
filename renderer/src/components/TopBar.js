import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import styled from 'styled-components'
import ToggleMetroButtonGroup from './ToggleMetroButtonGroup'

const StyledAppBar = styled(AppBar)`
  && {
    width: calc(100% - ${props => props.leftOffset}px);
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const TopBar = () => (
  <Wrapper>
    <StyledAppBar position="static" color="default">
      <Toolbar variant="dense">
        <ToggleMetroButtonGroup />
      </Toolbar>
    </StyledAppBar>
  </Wrapper>
)

TopBar.propTypes = {}

TopBar.defaultProps = {}

export default TopBar
