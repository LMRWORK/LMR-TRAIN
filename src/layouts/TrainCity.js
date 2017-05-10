import React from 'react';
import { NavBar, SearchBar, WhiteSpace, WingBlank, Toast, List} from 'antd-mobile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStationsTxt } from '../actions/Trains';

//对旧版浏览器的fetch、promise兼容性
import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

class TrainCity extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      trainsNavibarTitle: props.location.search=='?from' ? '出发地' : '目的地',
      searchType: props.location.search=='?from' ? 'from' : 'to',
      trainsNavibarLeft: '返回',
      trainsNavibarRight: '帮助',
      searchPlaceholder: '搜索',
      loadingText: '加载中...',
      cityIcon: '/public/img/city.png',
      stationsUrl: '/public/data/stations.txt',
      stationsTxt: props.stationsTxt,
      stationsArr: ['北京', '上海', '天津', '重庆', '长沙', '成都', '福州', '广州', '杭州', '济南', '昆明'],
    };
    console.log('TrainCity 👇');
    console.log(props);
  }

  componentDidMount = () => {
    if (!this.state.stationsTxt) {
      Toast.info(this.state.loadingText, 0);
      //抓取车站文本
      this.props.fetchStationsTxt(this.state.stationsUrl);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({stationsTxt: nextProps.stationsTxt});
    Toast.hide();
  }

  //构建城市列表
  createStationList = () => {
    let lists = [];
    for (let i=0; i<this.state.stationsArr.length; i++) {
      lists.push(
        <Link to={{ pathname: '/index'}}>
          <List.Item platform="ios" extra={this.state.toCity} arrow="horizontal" thumb={this.state.cityIcon}> 
            {this.state.stationsArr[i]}
          </List.Item>
        </Link>
      );
    }
    return lists;
  }

  render() {
    return (
      <div>
        <NavBar iconName={null} leftContent={this.state.trainsNavibarLeft} mode="light" onLeftClick={() => history.go(-1)}>
          <h1 id="TrainIndex-h1">{this.state.trainsNavibarTitle}</h1>
        </NavBar>
        <WhiteSpace/>
        <WingBlank>
          <SearchBar placeholder={this.state.searchPlaceholder}/>
        </WingBlank>
        <WhiteSpace/>
        <List>
          {this.createStationList()}
        </List>
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
