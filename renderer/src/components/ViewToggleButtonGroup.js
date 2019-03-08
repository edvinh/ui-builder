import React from 'react'
import PropTypes from 'prop-types'
import DesktopIcon from '@material-ui/icons/DesktopMac'
import MobileIcon from '@material-ui/icons/Smartphone'
import styled from 'styled-components'
import { Tabs, Tab } from '@material-ui/core'

const Container = styled.div`
  border-radius: 4px;
  background-color: #222;
`

const ViewToggleButtonGroup = ({ onChange }) => (
  <Tabs onChange={onChange} value={0}>
    <Tab icon={<MobileIcon />} />
    <Tab icon={<DesktopIcon />} />
  </Tabs>
)

export default ViewToggleButtonGroup
