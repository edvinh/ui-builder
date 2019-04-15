import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native-paper'
import styled from 'styled-components/native/dist/styled-components.native.cjs'

const Wrapper = styled.View`
  padding-top: 8px;
  padding-bottom: 8px;
`

const Input = ({
  placeholder,
  label,
  password,
  multiline,
  onChange,
  children, // eslint-disable-line react/prop-types
  ...rest
}) => (
  <Wrapper>
    <TextInput
      label={label}
      mode="outlined"
      placeholder={placeholder}
      secureTextEntry={password}
      multiline={multiline}
      onChangeText={onChange}
      {...rest}
    />
  </Wrapper>
)

Input.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  password: PropTypes.bool,
  multiline: PropTypes.bool,
  onChange: PropTypes.func,
}

export default Input
