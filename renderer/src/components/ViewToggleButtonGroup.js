import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DesktopIcon from '@material-ui/icons/DesktopMac'
import MobileIcon from '@material-ui/icons/Smartphone'
import { Tabs, Tab } from '@material-ui/core'

const ViewToggleButtonGroup = ({ onChange }) => {
  const [platform, setPlatform] = useState('mobile')

  const changeVal = (evt, val) => {
    onChange(val)
    setPlatform(val)
  }

  return (
    <Tabs onChange={changeVal} value={platform}>
      <Tab value="mobile" icon={<MobileIcon />} />
      <Tab value="web" icon={<DesktopIcon />} />
    </Tabs>
  )
}

ViewToggleButtonGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default ViewToggleButtonGroup
