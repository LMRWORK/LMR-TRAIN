import React from 'react';
import { NavBar, List, InputItem, DatePicker, Button, WingBlank, WhiteSpace, TabBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchStationsText } from '../actions/Trains';

import './TrainIndex.css';
import '../resources/png/city.png';
import '../resources/png/date.png';

class TrainIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trainsNavibarTitle: '中国火车票预定',
      trainsNavibarLeft: '首页',
      trainsNavibarRight: '帮助',
      tips: '温馨提示：办理购票、改签和退票业务时，请不晚于开车前48小时.',
      fromCityLabel: '出发地',
      toCityLabel: '目的地',
      fromCity: '北京',
      toCity: '上海',
      datepickerLabel: '出发日',
      datepickerTitle: '选择日期',
      datepickerExtra: '请选择',
      search: '查询',
      cityIcon: '/public/img/city.png',
      dateIcon: '/public/img/date.png',
      date: ''
    };
    console.log(props);
  }

  onChange = (date) => {
    this.setState({
      date,
    });
  }

  render() {
    return (
      <div>
        <NavBar iconName={null} leftContent={this.state.trainsNavibarLeft} rightContent={this.state.trainsNavibarRight} mode="light">
          <h1 id="TrainIndex-h1">{this.state.trainsNavibarTitle}</h1>
        </NavBar>
        <List renderHeader={() => this.state.tips} className="my-list">
          <List.Item extra={this.state.fromCity} arrow="horizontal" thumb={this.state.cityIcon} onClick={() => {}}> {this.state.fromCityLabel} </List.Item>
          <List.Item extra={this.state.toCity} arrow="horizontal" thumb={this.state.cityIcon} onClick={() => {}}> {this.state.toCityLabel} </List.Item>
          <DatePicker mode="date" title={this.state.datepickerTitle} extra={this.state.datepickerExtra} value={this.state.date} onChange={this.onChange}>
            <List.Item arrow="horizontal" thumb={this.state.dateIcon}> {this.state.datepickerLabel} </List.Item>
          </DatePicker>
        </List>
        <WhiteSpace size='lg'/>
        <WingBlank size="lg">
          <Button className="btn" icon="search" id="TrainIndex-search-btn">{this.state.search}</Button>
        </WingBlank>
        <div id="TrainIndex-tabbar-div">
          <TabBar barTintColor="white">
            <TabBar.Item title="火车查询" key="TabBar1" icon={<div/>}/>
            <TabBar.Item title="注意事项" key="TabBar2" icon={<div/>}/>
            <TabBar.Item title="关于我们" key="TabBar3" icon={<div/>}/>
          </TabBar>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  stationsText: state.get('stationsText')
});

const mapDispatchToProps = (dispatch) => ({
  fetchStationsText: (stationsText) => dispatch(fetchStationsText(stationsText))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainIndex);