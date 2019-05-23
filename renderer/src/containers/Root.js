import React from 'react'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import App from './App'
import MetroBundler from './MetroBundler'
import TopBar from '../components/TopBar'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const Navigation = withRouter(props => <TopBar switchView={path => props.history.replace(path)} />)

const Root = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <div>
        <Navigation />
        <Route path="/" exact component={App} />
        {/* use children prop to prevent unmount/mount when switching views */}
        <Route path="/metro" render={props => <MetroBundler {...props} />} />
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
)

export default Root
