import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const StyledWrapper = styled.div`
  box-sizing: content-box;
  width: inherit;
  height: inherit;
  border: ${props => (props.focus ? '1px solid #447cd6' : '1px solid transparent')};
  overflow: hidden;
  flex-direction: column;
  justify-items: stretch;
  justify-content: stretch;
  flex: 1;
  display: flex;
`

class GridItem extends Component {
  state = {
    focus: false,
  }

  onClick = (evt) => {
    this.setState({ focus: true })

    // Right click
    if (evt.type === 'contextmenu') {
      this.props.onRightClick(this.props.id, evt)
    } else {
      this.props.onClick(this.props.id)
    }
  }

  onClickAway = () => {
    this.setState({ focus: false })
    this.props.onClickAway(this.props.id)
  }

  render () {
    const { onClickAway, onRightClick, ...rest } = this.props
    return (
      <ClickAwayListener onClickAway={this.onClickAway}>
        <StyledWrapper
          {...rest}
          focus={this.state.focus}
          onClick={this.onClick}
          onContextMenu={this.onClick}
        />
      </ClickAwayListener>
    )
  }
}

GridItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  onRightClick: PropTypes.func,
  onClickAway: PropTypes.func,
}

GridItem.defaultProps = {
  onClickAway: () => {},
  onRightClick: () => {},
  onClick: () => {},
}

export default GridItem
