import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Text } from 'react-native'
import { Card as RNECard, Icon, Button } from 'react-native-elements'

const StyledCard = styled(({ style, ...rest }) => <RNECard {...rest} containerStyle={style} />)`
  /*flex: 1;
  display: flex;
  flex-direction: column;*/
  background-color: green;
`

const Card = ({ title, children }) => (
  <StyledCard title={title}>
    <Text>{children}</Text>
  </StyledCard>
)

export default Card
