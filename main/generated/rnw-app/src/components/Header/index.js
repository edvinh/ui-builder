import React from 'react'
import PropTypes from 'prop-types'
import { Header as RNEHeader, Icon } from 'react-native-elements'

const Header = ({ leftIcon, rightIcon, title }) => (
  <RNEHeader
    leftComponent={leftIcon ? { icon: leftIcon, color: '#fff' } : null}
    centerComponent={{ text: title, style: { color: '#fff' } }}
    rightComponent={rightIcon ? { icon: rightIcon, color: '#fff' } : null}
  />
)

Header.propTypes = {
  title: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
}

Header.defaultProps = {
  title: '',
  leftIcon: '',
  rightIcon: '',
}

export default Header
