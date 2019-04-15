import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native/dist/styled-components.native.cjs'
import ListItem from './ListItem'

const StyledList = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-bottom: 8px;
`

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #222;
  padding-left: 4px;
  padding-right: 4px;
  margin-bottom: 4px;
`

const Content = styled.View`
  background-color: white;
`

// {
//   children.map((child, index) => (
//     <ListItem text={child.text} key={`listitem-${index}`} />
//   ))
// }

const List = ({ title, children, ...rest }) => (
  <StyledList {...rest}>
    {!!title && <Title>{title}</Title>}
    <Content>
      <ListItem text={'Text 1'} key={`listitem-1`} />
      <ListItem text={'Text 2'} key={`listitem-2`} />
      <ListItem text={'Text 3'} key={`listitem-3`} />
      <ListItem text={'Text 4'} key={`listitem-4`} />
    </Content>
  </StyledList>
)

List.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  image: PropTypes.string,
  isParentDragging: PropTypes.bool,
}

export default List
