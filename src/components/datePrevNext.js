import React from 'react';
import { DatePicker } from 'antd-mobile';

class DatePrevNext extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      dateText: null,
      dateIcon: null,
      datepickerVisible: false,
      prevDayText: null,
      onClickPrevDay: null,
      nextDayText: null,
      onClick: null,
      onClickNextDay: null,
      onOk: null,
      onDismiss: null,
      onChange: null,
      value: null,
    };
    console.log('DatePrevNext 👇');
    console.log(props);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('DatePrevNext.componentWillReceiveProps 👇');
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('DatePrevNext.shouldComponentUpdate 👇');
    return true;
  }

  render() {
    console.log("@@ DatePrevNext.render() @@");
    return (
      <div className="flex-box searchBar">
        <div className="flex-item flex-grow-1 textLeft">
          <a className="btn" id="prevDay" onClick={this.props.onClickPrevDay}>
            <div className="sBefore-small"></div> {this.props.prevDateText} 
          </a>
        </div>
        <div className="flex-item flex-grow-1">
          <div id="showDatepicker">
            <a onClick={() => this.props.onClick()}> <img src={this.props.dateIcon} /> <span>{this.props.dateText}</span> <div className="sDown-small"></div> </a>
          </div>
          <DatePicker
            visible={this.props.datepickerVisible}
            mode="date"
            onOk={() => this.props.hideDate()}
            onDismiss={() => this.props.hideDate()}
            value={this.props.dateText}
            onChange={moment => this.props.onChange(moment)}
          />
        </div>
        <div className="flex-item flex-grow-1 textRight">
          <a className="btn" id="nextDay" onClick={this.props.onClickNextDay}>
            {this.props.nextDateText} <div className="sNext-small"></div>
          </a>
        </div>
      </div>
    );
  }
}
