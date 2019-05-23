import React from 'react'
import PropTypes from 'prop-types'
import { Button as RNPButton } from 'react-native-paper'

const Button = ({ title, icon, type, color, style, contentStyle, onPress, ...rest }) => (
  <RNPButton
    style={{ marginTop: 12, marginBottom: 12, ...style }}
    contentStyle={{ height: 48, ...contentStyle }}
    icon={icon}
    mode={type}
    color={color}
    onPress={onPress}
    {...rest}
  >
    {title}
  </RNPButton>
)

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.string,
  icon: PropTypes.string,
  onPress: PropTypes.func,
  contentStyle: PropTypes.object,
  style: PropTypes.object,
}

Button.defaultProps = {
  type: 'solid',
  color: 'white',
  contentStyle: {},
  style: {},
  onPress: () => {},
}

export default Button
