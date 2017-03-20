import React from 'react'
import DayPicker from 'react-day-picker';
import { connect } from 'react-redux';
import { chooseDate } from '../actions/Trains'

class _DatePicker extends React.PureComponent {

  constructor(props) {
    super(props)
    this.disableTime = new Date().getTime() - 3600000*24
    this.handleDayClick = this.handleDayClick.bind(this)
  }

  handleDayClick(day, disabled) {
    if (day.getTime() > this.disableTime) {
      this.props.chooseDate(day)
      location.href = "#/"
    }
  }

  render() {
    return (
      <DayPicker
        selectedDays={ this.props.searchDate }
        onDayClick={ day => this.handleDayClick(day) }
        disabledDays={ day => day.getTime() <= this.disableTime }
        initialMonth={ this.props.searchDate }
        numberOfMonths={ 2 }
        fixedWeeks={ true }
      />
    )
  }
}

const mapStateToProps = (state) => ({searchDate: state.get('searchDate')})
const mapDispatchToProps = (dispatch) => ({chooseDate: (_date) => dispatch(chooseDate(_date))})


export default connect(mapStateToProps, mapDispatchToProps)(_DatePicker)
