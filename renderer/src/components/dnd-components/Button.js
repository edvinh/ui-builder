import React from 'react'
import PropTypes from 'prop-types'
import { Button as RNPButton } from 'react-native-paper'
import ErrorBoundary from './ErrorBoundary'

const Button = ({
  title, icon, type, color, contentStyle, onPress, ...rest
}) => (
  <ErrorBoundary>
    <RNPButton
      contentStyle={{ height: 48, ...contentStyle }}
      icon={icon}
      mode={type}
      color={color}
      onPress={onPress}
      {...rest}
    >
      {title}
    </RNPButton>
  </ErrorBoundary>
)

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.string,
  icon: PropTypes.string,
  onPress: PropTypes.func,
  contentStyle: PropTypes.object,
}

Button.defaultProps = {
  type: 'solid',
  color: 'white',
  contentStyle: {},
  onPress: () => {},
}

export default Button
