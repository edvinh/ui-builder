import React from 'react'
import PropTypes from 'prop-types'

import { Button as RNEButton } from 'react-native-elements'

const Button = ({ title, type, color, backgroundColor, ...rest }) => (
  <RNEButton title={title} color={color} backgroundColor={backgroundColor} {...rest} />
)

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['solid', 'clear', 'outline']),
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
}

Button.defaultProps = {
  type: 'solid',
  color: 'white',
  backgroundColor: '#03A9F4',
}

export default Button
