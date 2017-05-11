import React from 'react';
import { NavBar, List, DatePicker, Button, WingBlank, WhiteSpace, TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class TrainIndex extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      trainsNavibarTitle: '中国火车票预定',
      trainsNavibarLeft: '首页',
      trainsNavibarRight: '帮助',
      tips: '温馨提示：办理购票、改签和退票业务时，请不晚于开车前48小时.',
      fromStationLabel: '出发地',
      toStationLabel: '目的地',
      fromStation: this.props.fromStation,
      toStation: this.props.toStation,
      tabBar: this.props.lang.tabBar,
      datepickerLabel: '出发日',
      datepickerTitle: '选择日期',
      datepickerExtra: '请选择',
      search: '查询',
      cityIcon: '/public/img/city.png',
      dateIcon: '/public/img/date.png',
      date: ''
    };
    console.log('TrainIndex 👇');
    console.log(props);
  }

  onChange = (date) => {
    this.setState({
      date,
    });
  }

  linkto = (type) => {
    this.props.history.push('/city?'+type);
  }

  render() {
    return (
      <div>
        <NavBar iconName={null} leftContent={this.state.trainsNavibarLeft} rightContent={this.state.trainsNavibarRight} mode="light">
          <h1 id="TrainIndex-h1">{this.state.trainsNavibarTitle}</h1>
        </NavBar>
        <List renderHeader={() => this.state.tips} id="TrainIndex-searchList">
          <List.Item platform="ios" extra={this.state.fromStation.en+', '+this.state.fromStation.cn} arrow="horizontal" thumb={this.state.cityIcon} onClick={() => this.linkto('from')}> 
            {this.state.fromStationLabel}
          </List.Item>
          <List.Item platform="ios" extra={this.state.toStation.en+', '+this.state.toStation.cn} arrow="horizontal" thumb={this.state.cityIcon} onClick={() => this.linkto('to')}> 
            {this.state.toStationLabel} 
          </List.Item>
          <DatePicker mode="date" title={this.state.datepickerTitle} extra={this.state.datepickerExtra} value={this.state.date} onChange={this.onChange}>
            <List.Item platform="ios" arrow="horizontal" thumb={this.state.dateIcon}> {this.state.datepickerLabel} </List.Item>
          </DatePicker>
        </List>
        <WhiteSpace size='lg'/>
        <WingBlank size="lg">
          <Button className="btn" icon="search" id="TrainIndex-search-btn">{this.state.search}</Button>
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
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TrainIndex);