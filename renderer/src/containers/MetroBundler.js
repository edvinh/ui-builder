import React, { useState, useEffect } from 'react'
import { CircularProgress, Typography } from '@material-ui/core'
import styled from 'styled-components'

const SERVER_URL = 'http://localhost:19002'

const StyledIFrame = styled.iframe`
  width: 100%;
  min-height: calc(100vh - 52px);
  border: none;
  display: ${props => (props.visible ? 'initial' : 'none')};
  position: relative;
  z-index: 2;
`

const Wrapper = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  min-width: 100%;
  min-height: calc(100vh - 52px);
  justify-content: center;
  align-items: center;
`

const LoadingWrapper = styled.div`
  position: absolute;
  width: 300px;
  left: calc(50% - 150px);
  top: calc(50% - 150px);
  text-align: center;
  z-index: 1;
`

const MetroBundler = (props) => {
  const [loading, setLoading] = useState(true)

  return (
    <Wrapper visible>
      <LoadingWrapper>
        <CircularProgress />
        <br />
        <br />
        <Typography variant="subtitle1">
          Loading Metro Bundler... <br /> Make sure you've started the project.
        </Typography>
      </LoadingWrapper>
      <StyledIFrame
        visible={!loading}
        src="http://localhost:19002"
        onLoad={e => setLoading(false)}
      />
    </Wrapper>
  )
}

export default MetroBundler
