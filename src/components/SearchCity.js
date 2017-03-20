import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { swapSearchStation } from '../actions/Trains'
import { Link } from 'react-router-dom'

class SearchCity extends React.PureComponent  {

  constructor(props) {
    super(props)
    this.handleTouchTap = this.handleTouchTap.bind(this)
  }

  handleTouchTap() {
    this.props.swapSearchStation(this.props.fromStation, this.props.toStation)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={ WapperStyle }>
          <div style={ LeftContainerStyle }>
            <Link to="/search-city/from">
              <TextField
                style={ TextFieldStyle }
                id="text-field-default"
                hintText="From"
                value={ this.props.fromStation }
                fullWidth={ true }
                inputStyle={ InputStyle }
                hintStyle={ HintStyle }
                disabled={ true }
                underlineDisabledStyle={ UnderlineStyle }
              />
            </Link>
            <Link to="/search-city/to">
              <TextField
                style={ TextFieldStyle }
                id="text-field-default"
                hintText="To"
                value={ this.props.toStation }
                fullWidth={ true }
                inputStyle={ InputStyle }
                hintStyle={ HintStyle }
                disabled={ true }
                underlineDisabledStyle={ UnderlineStyle }
              />
            </Link>
          </div>
          <div style={ RightContainerStyle }>
            <IconButton iconStyle={ SwapStyle } style={ IconButtonStyle } onTouchTap={ this.handleTouchTap }>
              <FontIcon className="material-icons">swap_vertical_circle</FontIcon>
            </IconButton>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({fromStation: state.get('fromStation'), toStation: state.get('toStation')})
const mapDispatchToProps = (dispatch) => ({swapSearchStation: (_from, _to) => dispatch(swapSearchStation(_from, _to))})

export default connect(mapStateToProps, mapDispatchToProps)(SearchCity)

const WapperStyle = {
  "display": "flex",
  "marginTop": "20px",
  "justifyContent": "center"
}
const TextFieldStyle = {
  "width": "90%",
  "margin": "5px 15px",
  "cursor": "default"
}
const InputStyle = {
  "textIndent": "8px",
  "fontSize": "1.3rem",
  "color": "#000",
  "cursor": "default"
}
const HintStyle = {
  "left": "35%"
}
const SwapStyle = {
  "fontSize": "60px",
  "color": "rgb(0, 188, 212)"
}
const IconButtonStyle = {
  "padding": "initial",
  "width":"auto",
  "height":"auto"
}
const UnderlineStyle = {
  "borderBottom": "1px solid #ddd", 
  "borderColor": "#ddd",
  "bottom": 0
}
const LeftContainerStyle = {
  "display": "flex",
  "flexDirection": "column",
  "flexGrow": "1"
}
const RightContainerStyle = {
  "display": "flex",
  "alignItems": "center",
  "flexGrow": "0",
  "padding": "0 15px 0 0"
}