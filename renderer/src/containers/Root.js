import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import App from './App'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </MuiThemeProvider>
)

export default Root
