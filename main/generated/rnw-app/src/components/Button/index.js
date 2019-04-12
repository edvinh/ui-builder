import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native/dist/styled-components.native.cjs'
import { TouchableOpacity, Text } from 'react-native'

const StyledButton = styled.View`
  background-color: ${props => props.backgroundColor || '#03A9F4'};
  align-self: stretch;
  border-radius: 4px;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 4px;
  margin-left: 4px;
`

const Title = styled.Text`
  font-size: 18px;
  align-self: center;
  color: ${props => props.color || 'white'};
`

const ClearButton = styled(StyledButton)`
  background-color: transparent;
`

const OutlinedButton = styled(ClearButton)`
  border-color: ${props => props.backgroundColor || '#03A9F4'};
  border-width: 2px;
`

const getButton = type => {
  switch (type) {
    case 'solid':
      return StyledButton
    case 'clear':
      return ClearButton
    case 'outline':
      return OutlinedButton
    default:
      return StyledButton
  }
}

const Button = ({ title, type, color, backgroundColor, onPress, ...rest }) => {
  const SelectedButton = getButton(type)

  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <SelectedButton color={color} backgroundColor={backgroundColor}>
        <Title color={color}>{title}</Title>
      </SelectedButton>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['solid', 'clear', 'outline']),
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func,
}

Button.defaultProps = {
  type: 'solid',
  color: 'white',
  backgroundColor: '#03A9F4',
  onPress: () => {},
}

export default Button
