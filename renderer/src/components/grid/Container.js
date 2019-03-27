import React from 'react'
import GridLayout from 'react-grid-layout'

const layout = [
  {
    i: 'a',
    x: 0,
    y: 0,
    w: 1,
    h: 2,
  },
  {
    i: 'b',
    x: 1,
    y: 0,
    w: 1,
    h: 2,
  },
  {
    i: 'c',
    x: 2,
    y: 0,
    w: 1,
    h: 2,
  },
]

const GItem = ({ style, ...rest }) => (
  <div style={{ ...style, background: 'white', fontSize: 24 }} {...rest} />
)

/* WIP */
const Container = props => (
  <GridLayout
    style={{ background: '#ccc', height: '100%' }}
    className="layout"
    layout={layout}
    cols={3}
    rowHeight={50}
    width={350}
    onDragStart={(layout, oldItem, newItem, placeholder, e, element) => {
      e.stopPropagation()
    }}
  >
    <GItem key="a">a</GItem>
    <GItem key="b">b</GItem>
    <GItem key="c">c</GItem>
  </GridLayout>
)

export default Container
