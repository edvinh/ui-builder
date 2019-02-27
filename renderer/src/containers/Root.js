import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import App from './App'
import TopBar from '../components/TopBar'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <TopBar />

    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </MuiThemeProvider>
)

export default Root
