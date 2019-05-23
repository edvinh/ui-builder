import React from 'react'
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ClickAwayListener,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import styled from 'styled-components'

const Wrapper = styled(Paper)`
  position: absolute !important;
  left: ${props => props.x}px !important;
  top: ${props => props.y}px !important;
`

const ContextMenu = ({
  x, y, onClickAway, onDelete,
}) => (
  <ClickAwayListener onClickAway={onClickAway}>
    <Wrapper x={x} y={y}>
      <List dense>
        <ListItem button onClick={onDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete Component</ListItemText>
        </ListItem>
      </List>
    </Wrapper>
  </ClickAwayListener>
)

export default ContextMenu
