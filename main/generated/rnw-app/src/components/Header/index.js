import React from 'react'
import PropTypes from 'prop-types'
import { Appbar } from 'react-native-paper'

const Header = ({ leftIcon, rightIcon, title, backgroundColor, foregroundColor, ...rest }) => (
  <Appbar.Header style={{ backgroundColor }} {...rest}>
    <Appbar.Action icon="menu" />
    <Appbar.Content title="Title" subtitle="Subtitle" />
    <Appbar.Action icon="more-vert" />
  </Appbar.Header>
)

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
