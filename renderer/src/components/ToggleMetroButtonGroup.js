import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core'

const ToggleMetroButtonGroup = ({ history }) => {
  const [platform, setPlatform] = useState('design')

  const changeVal = (evt, val) => {
    if (val === 'metro') {
      history.replace('/metro')
      setPlatform('metro')
      return
    }

    history.replace('/')
    setPlatform('design')
  }

  return (
    <Tabs onChange={changeVal} value={platform}>
      <Tab value="design" label="Design View" />
      <Tab value="metro" label="Metro Bundler" />
    </Tabs>
  )
}

ToggleMetroButtonGroup.propTypes = {}

export default withRouter(ToggleMetroButtonGroup)
