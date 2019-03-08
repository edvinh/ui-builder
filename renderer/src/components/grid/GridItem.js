import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const StyledWrapper = styled.div`
  box-sizing: content-box;
  width: inherit;
  height: inherit;
  border: ${props => (props.focus ? '1px solid blue' : 'none')};
  margin-left: ${props => (props.focus ? -1 : 0)}px;
  margin-top: ${props => (props.focus ? -1 : 0)}px;
  overflow: hidden;
`

class GridItem extends Component {
  state = {
    focus: false,
  }

  onClick = () => {
    this.setState({ focus: true })
  }

  onClickAway = () => {
    this.setState({ focus: false })
  }

  render () {
    return (
      <ClickAwayListener onClickAway={this.onClickAway}>
        <StyledWrapper {...this.props} focus={this.state.focus} onClick={this.onClick} />
      </ClickAwayListener>
    )
  }
}

GridItem.propTypes = {
  key: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}

export default GridItem
