import React from 'react'
import PropTypes from 'prop-types'
import { Appbar } from 'react-native-paper'
import ErrorBoundary from './ErrorBoundary'

const Header = ({
  leftIcon,
  rightIcon,
  title,
  subtitle,
  backgroundColor,
  foregroundColor,
  ...rest
}) => (
  <ErrorBoundary>
    <Appbar.Header style={{ backgroundColor }} {...rest}>
      {!!leftIcon && <Appbar.Action icon={leftIcon} color={foregroundColor} />}
      <Appbar.Content title={title || null} subtitle={subtitle || null} color={foregroundColor} />
      {!!rightIcon && <Appbar.Action icon={rightIcon} color={foregroundColor} />}
    </Appbar.Header>
  </ErrorBoundary>
)

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
}

Header.defaultProps = {
  title: '',
  subtitle: '',
  leftIcon: '',
  rightIcon: '',
  backgroundColor: '#03A9F4',
  foregroundColor: 'white',
}

export default Header
