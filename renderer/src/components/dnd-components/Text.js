import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native/dist/styled-components.native.cjs'

const StyledText = styled.Text`
  font-size: ${props => props.fontSize || 12}px;
  color: ${props => props.color || '#222'};
  text-align: ${props => props.textAlign || 'left'};
  font-weight: ${props => props.fontWeight || 'normal'};
  align-self: stretch;
`

const Wrapper = styled.View`
  align-self: stretch;
  padding: 8px;
`

const Text = ({
  children, color, fontSize, textAlign, fontWeight, ...rest
}) => (
  <Wrapper>
    <StyledText
      color={color}
      fontSize={fontSize}
      textAlign={textAlign}
      fontWeight={fontWeight}
      {...rest}
    >
      {children}
    </StyledText>
  </Wrapper>
)

Text.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.number,
  textAlign: PropTypes.oneOf(['left', 'center', 'right', 'auto', 'justify']),
  fontWeight: PropTypes.oneOf([
    'normal',
    'bold',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ]),
}

Text.defaultProps = {
  children: '',
  color: '#222',
  textAlign: 'left',
  fontWeight: 'normal',
  fontSize: 12,
}

export default Text
