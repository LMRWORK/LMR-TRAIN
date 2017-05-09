import React from 'react';
import { NavBar, SearchBar, WhiteSpace, WingBlank } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStationsTxt } from '../actions/Trains';

//对旧版浏览器的fetch、promise兼容性
import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

class TrainCity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trainsNavibarTitle: props.location.search=='?from' ? '出发地' : '目的地',
      trainsNavibarLeft: '返回',
      trainsNavibarRight: '帮助',
      searchPlaceholder: '搜索',
      stationsUrl: '/public/data/stations.txt',
      stationsTxt: props.stationsTxt,
    };
    console.log('TrainCity 👇');
    console.log(props);
  }

  componentDidMount = () => {
    if (!this.state.stationsTxt) {
      //抓取车站文本
      this.props.fetchStationsTxt(this.state.stationsUrl);
    }
  }

  render() {
    return (
      <div>
        <NavBar iconName={null} leftContent={this.state.trainsNavibarLeft} mode="light" onLeftClick={() => history.go(-1)}>
          <h1 id="TrainIndex-h1">{this.state.trainsNavibarTitle}</h1>
        </NavBar>
        <WhiteSpace size="lg"/>
        <WingBlank>
          <SearchBar placeholder={this.state.searchPlaceholder} />
        </WingBlank>
        <WhiteSpace />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  stationsTxt: store.get('stationsTxt')
});

const mapDispatchToProps = (dispatch) => ({
  fetchStationsTxt: (url) => dispatch(fetchStationsTxt(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainCity);
