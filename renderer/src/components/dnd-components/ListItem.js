import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native/dist/styled-components.native.cjs'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'

const StyledListItem = styled.View`
  flex: 1;
  flex-direction: row;
  display: flex;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  min-height: 48px;
  align-items: center;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  justify-content: space-between;
`

const MainText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #222;
`

const ListItem = ({ text, onPress, ...rest }) => (
  <TouchableOpacity onPress={onPress}>
    <StyledListItem {...rest}>
      <MainText>{text || ''}</MainText>
      <Icon color="#aaa" name="chevron-right" />
    </StyledListItem>
  </TouchableOpacity>
)

ListItem.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
}

export default ListItem
