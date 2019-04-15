import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox as RNCheckbox } from 'react-native-paper'
import styled from 'styled-components'
import { Platform, TouchableOpacity, Text } from 'react-native'

const isWeb = Platform.OS === 'web'

const StyledLabel = styled(Platform.OS === 'web' ? 'label' : TouchableOpacity)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: ${props => props.align || 'flex-start'};
  ${isWeb ? 'cursor: pointer' : ''};
`

const LabelText = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  color: #222;
`

const Checkbox = ({
  checked, align, label, onPress, ...rest
}) => {
  // eslint-disable-next-line
  let Label = ({ onPress, onClick, ...rest }) => <StyledLabel onPress={onPress} {...rest} />

  if (isWeb) {
    // eslint-disable-next-line
    Label = ({ onPress, onClick, ...rest }) => <StyledLabel onClick={onPress} {...rest} />
  }

  return (
    <Label align={align}>
      <LabelText>{label}</LabelText>
      <RNCheckbox onPress={onPress} status={checked ? 'checked' : 'unchecked'} {...rest} />
    </Label>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onPress: PropTypes.func,
  align: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
}

Checkbox.defaultProps = {
  checked: false,
  label: '',
  align: 'flex-start',
  onPress: () => {},
}

export default Checkbox
