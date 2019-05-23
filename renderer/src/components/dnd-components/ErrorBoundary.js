import React from 'react'
import PropTypes from 'prop-types'

/*
 * Error Boundary for when components throw errors because of invalid props.
 * TODO: Dispatch error message for visual feedback.
 */
class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }

  state = { hasError: false }

  static getDerivedStateFromError () {
    return { hasError: true }
  }

  /* We need to continually reset the error state for each prop change on the child */
  UNSAFE_componentWillReceiveProps () {
    this.setState({ hasError: false })
  }

  render () {
    return this.state.hasError ? null : this.props.children
  }
}

export default ErrorBoundary
