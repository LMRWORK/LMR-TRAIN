import React from 'react'
import { connect, mapDispatchToProps } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

const HeaderBar = (props) => 
  <MuiThemeProvider>
    <AppBar
      title="China Train Search"
      iconElementLeft = {
        <IconButton>
          <FontIcon className="material-icons">{ props.logo||"home" }</FontIcon>
        </IconButton>
      }
      onLeftIconButtonTouchTap={ () => location.href="#/" }
    />
  </MuiThemeProvider>

export default HeaderBar