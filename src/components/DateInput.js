import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import fecha from 'fecha';

class DateInput extends React.PureComponent  {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Link to="/calendar">
        <MuiThemeProvider>
          <div style={ WapperStyle }>
            <div style={ LeftContainerStyle }>
              <TextField
                style={ TextFieldStyle }
                id="text-field-default"
                hintText="From"
                value={ fecha.format(this.props.searchDate, 'YYYY-MM-DD, dddd') }
                fullWidth={ true }
                inputStyle={ InputStyle }
                hintStyle={ HintStyle }
                disabled={ true }
                underlineDisabledStyle={ UnderlineStyle }
              />
            </div>
            <div style={ RightContainerStyle }>
              <IconButton iconStyle={ DateIconStyle } style={ IconButtonStyle }>
                <FontIcon className="material-icons">date_range</FontIcon>
              </IconButton>
            </div>
          </div>
        </MuiThemeProvider>
      </Link>
    )
  }
}

const mapStateToProps = (state) => ({searchDate:  state.get('searchDate')})
export default connect(mapStateToProps)(DateInput)

const WapperStyle = {
  "display": "flex",
  "margin": "10px 0"
}
const LeftContainerStyle = {
  "display": "flex",
  "flexDirection": "column",
  "flexGrow": "1"
}
const IconButtonStyle = {
  "padding": "initial",
  "width":"auto",
  "height":"auto"
}
const RightContainerStyle = {
  "display": "flex",
  "alignItems": "center",
  "flexGrow": "0",
  "padding": "0 18px 0 0",
  "marginTop": "-12px"
}
const InputStyle = {
  "color": "#000",
  "fontSize": "1.3rem",
  "padding": "0 0 5px 8px",
  "cursor": "default"
}
const DateIconStyle = {
  "fontSize": "30px",
  "backgroundColor": "rgb(0, 188, 212)",
  "color": "#fff",
  "borderRadius": "50%",
  "padding": "10px"
}
const UnderlineStyle = {
  "borderBottom": "1px solid #ddd", 
  "borderColor": "#ddd",
  "bottom": 0
}
const HintStyle = {
  "left": "35%"
}
const TextFieldStyle = {
  "width": "90%",
  "margin": "5px 15px",
  "cursor": "default"
}