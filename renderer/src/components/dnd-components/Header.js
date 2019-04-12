import React from 'react'
import PropTypes from 'prop-types'
import { Header as RNEHeader } from 'react-native-elements'

const Header = ({
  leftIcon, rightIcon, title, backgroundColor, foregroundColor, ...rest
}) => {
  const textStyle = {
    text: title,
    style: {
      color: foregroundColor,
      fontSize: 16,
      fontWeight: '500',
    },
  }

  const leftIconStyle = {
    icon: leftIcon,
    color: foregroundColor,
  }

  const rightIconStyle = {
    icon: rightIcon,
    color: foregroundColor,
  }

  return (
    <RNEHeader
      backgroundColor={backgroundColor}
      leftComponent={leftIcon ? leftIconStyle : null}
      centerComponent={textStyle}
      rightComponent={rightIcon ? rightIconStyle : null}
      {...rest}
    />
  )
}

Header.propTypes = {
  title: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
}

Header.defaultProps = {
  title: '',
  leftIcon: '',
  rightIcon: '',
  backgroundColor: '03A9F4',
  foregroundColor: 'white',
}

export default Header
