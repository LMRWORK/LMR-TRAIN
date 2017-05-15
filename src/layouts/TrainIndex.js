import React from 'react';
import { NavBar, List, DatePicker, Button, WingBlank, WhiteSpace, TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { setStartDate } from '../actions/Trains';
import loc from 'antd-mobile/lib/date-picker/locale/zh_CN';

class TrainIndex extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      NavibarTitle: this.props.lang.NavibarTitle,
      NavibarLeftIndex: this.props.lang.NavibarLeftIndex,
      NavibarRight: this.props.lang.NavibarRight,
      tips: this.props.lang.tips,
      fromStationLabel: this.props.lang.fromStationLabel,
      toStationLabel: this.props.lang.toStationLabel,
      fromStation: this.props.fromStation,
      toStation: this.props.toStation,
      tabBar: this.props.lang.tabBar,
      datepickerLabel: this.props.lang.datepickerLabel,
      datepickerTitle: this.props.lang.datepickerTitle,
      datepickerExtra: this.props.lang.datepickerExtra,
      searchTxt: this.props.lang.searchTxt,
      cityIcon: this.props.lang.cityIcon,
      dateIcon: this.props.lang.dateIcon,
      startDate: this.props.startDate,
    };
    console.log('TrainIndex 👇');
    console.log(props);
  }

  onChange = (moment) => {
    this.setState({ startDate: moment });
    this.props.setStartDate(moment);
  }

  linkto = (type) => {
    this.props.history.push('/city?'+type);
  }

  onSearch = () => {
    this.props.history.push('/search');
  }

  render() {
    return (
      <div>
        <NavBar iconName={null} leftContent={this.state.NavibarLeftIndex} rightContent={this.state.NavibarRight} mode="light">
          <h1 id="TrainIndex-h1">{this.state.NavibarTitle}</h1>
        </NavBar>
        <List renderHeader={() => this.state.tips} id="TrainIndex-searchList">
          <List.Item platform="ios" extra={this.state.fromStation.en+', '+this.state.fromStation.cn} arrow="horizontal" thumb={this.state.cityIcon} onClick={() => this.linkto('from')}> 
            {this.state.fromStationLabel}
          </List.Item>
          <List.Item platform="ios" extra={this.state.toStation.en+', '+this.state.toStation.cn} arrow="horizontal" thumb={this.state.cityIcon} onClick={() => this.linkto('to')}> 
            {this.state.toStationLabel} 
          </List.Item>
          <DatePicker mode="date" title={this.state.datepickerTitle} extra={this.state.datepickerExtra} value={this.state.startDate} onChange={moment => this.onChange(moment)} locale={loc}>
            <List.Item platform="ios" arrow="horizontal" thumb={this.state.dateIcon}> {this.state.datepickerLabel} </List.Item>
          </DatePicker>
        </List>
        <WhiteSpace size='lg'/>
        <WingBlank size="lg">
          <Button className="btn" icon="search" id="TrainIndex-search-btn" onClick={() => this.onSearch()}>{this.state.searchTxt}</Button>
        </WingBlank>
        <div id="TrainIndex-tabbar-div">
          <TabBar barTintColor="white">
            {this.state.tabBar.map( 
              (i) => <TabBar.Item title={i.name} key={i.name} icon={<div/>}/>
            )}
          </TabBar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  lang: store.get('lang'),
  fromStation: store.get('fromStation'),
  toStation: store.get('toStation'),
  startDate: store.get('startDate'),
});

const mapDispatchToProps = (dispatch) => ({
  setStartDate: (moment) => dispatch(setStartDate(moment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainIndex);