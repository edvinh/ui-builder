import React from 'react'
import { Drawer as MDrawer, withStyles } from '@material-ui/core'
import styled from 'styled-components'

// const drawerWidth = 250

// const styles = theme => ({
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
// })

// const Drawer = ({
//   children, classes, anchor, ...rest
// }) => (
//   <MDrawer
//     className={classes.drawer}
//     classes={{
//       paper: classes.drawerPaper,
//     }}
//     variant="permanent"
//     anchor={anchor}
//     open
//     {...rest}
//   >
//     {children}
//   </MDrawer>
// )

// export default withStyles(styles)(Drawer)

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width: 20%;
  min-height: calc(100vh - 48px);
  background-color: #444;
`

const Drawer = ({ children, ...rest }) => <StyledWrapper {...rest}>{children}</StyledWrapper>

export default Drawer
