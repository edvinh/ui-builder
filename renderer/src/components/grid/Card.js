import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Text } from 'react-native'
import { Card, Icon, Button } from 'react-native-elements'

const StyledCard = styled(({ style, ...rest }) => <Card {...rest} containerStyle={style} />)`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 4px !important;
`

const CardComponent = ({ title, content }) => (
  <StyledCard title={title}>
    <Text style={{ marginBottom: 10 }}>{content}</Text>
    <Button
      icon={<Icon name="code" color="#ffffff" />}
      backgroundColor="#03A9F4"
      buttonStyle={{
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      }}
      title="VIEW NOW"
    />
  </StyledCard>
)

export default CardComponent
