import React from 'react'
import PropTypes from 'prop-types'
import { Input as RNEInput } from 'react-native-elements'

const inputContainerStyle = {
  borderWidth: 1,
  borderColor: '#777',
  borderRadius: 4,
}

const inputStyle = { paddingLeft: 8 }

const labelStyle = { fontSize: 16, paddingBottom: 4 }

const containerStyle = { marginVertical: 8, paddingHorizontal: 4 }

const Input = ({
  placeholder,
  label,
  leftIcon,
  rightIcon,
  password,
  children, // eslint-disable-line react/prop-types
  ...rest
}) => (
  <RNEInput
    inputContainerStyle={inputContainerStyle}
    inputStyle={inputStyle}
    labelStyle={labelStyle}
    placeholder={placeholder}
    containerStyle={containerStyle}
    label={label}
    secureTextEntry={password}
    leftIcon={leftIcon ? { name: leftIcon } : null}
    rightIcon={rightIcon ? { name: rightIcon } : null}
    {...rest}
  />
)

Input.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  password: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
}

export default Input
