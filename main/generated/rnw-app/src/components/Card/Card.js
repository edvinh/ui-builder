import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Text } from 'react-native'
import { Card, Icon, Button } from 'react-native-elements'

const StyledCard = styled(({ style, ...rest }) => <Card {...rest} containerStyle={style} />)`
  /*flex: 1;
  display: flex;
  flex-direction: column;*/
`

const CardComponent = ({ title, children }) => (
  <StyledCard title={title}>
    <Text>{children}</Text>
  </StyledCard>
)

export default CardComponent
