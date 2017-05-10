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
      stationsArrInit: [
        {cn:'北京', code:'BJP', en:'Beijing'}, 
        {cn:'上海', code:'SHH', en:'Shanghai'},
        {cn:'天津', code:'TJP', en:'Tianjin'},
        {cn:'重庆', code:'CQW', en:'Chongqing'},
        {cn:'长沙', code:'CSQ', en:'Changsha'},
        {cn:'成都', code:'CDW', en:'Chengdu'},
        {cn:'福州', code:'FZS', en:'Fuzhou'},
        {cn:'广州', code:'GZQ', en:'Guangzhou'},
        {cn:'杭州', code:'HZH', en:'Hangzhou'},
        {cn:'济南', code:'JNK', en:'Jinan'},
        {cn:'昆明', code:'KMM', en:'Kunming'},
      ],
      stationsArr: [],
    };
    //console.log('TrainCity 👇');
    //console.log(props);
  }

  componentDidMount = () => {
    if (!this.state.stationsTxt) {
      //显示轻提示
      Toast.info(this.state.loadingText, 0);
      //抓取车站文本
      this.props.fetchStationsTxt(this.state.stationsUrl);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({stationsTxt: nextProps.stationsTxt});
    //隐藏新提示
    Toast.hide();
  }

  //正则匹配城市字串，数据格式："@Guangzhou|広州|广州|GZQ|707@"
  onSearch = (str) => {
    if (str) {
      let reg = new RegExp('@[^@]*?'+str+'[^@]*?@', 'gi');
      let reg_arr = this.state.stationsTxt.match(reg);
      let count = 0;
      if (reg_arr) {
        let stationObj_arr = [];
        for (let i=0; i<reg_arr.length; i++) {
          let tmp = reg_arr[i].split('|');
          stationObj_arr.push({ en: tmp[1], cn: tmp[2], code: tmp[3] });
          if (count++ > 9) break;
        }
        this.setState({stationsArr: stationObj_arr});
        //console.log(stationObj_arr);
      }
    } else {
      this.setState({stationsArr: []});
    }
  }

  onSelect = (city) => {
    console.log(city);
  }

  render() {
    let lists = this.state.stationsArr.length ? this.state.stationsArr : this.state.stationsArrInit;
    return (
      <div>
        <NavBar iconName={null} leftContent={this.state.trainsNavibarLeft} mode="light" onLeftClick={() => history.go(-1)}>
          <h1 id="TrainIndex-h1">{this.state.trainsNavibarTitle}</h1>
        </NavBar>
        <WhiteSpace/>
        <WingBlank>
          <SearchBar placeholder={this.state.searchPlaceholder} onChange={this.onSearch}/>
        </WingBlank>
        <WhiteSpace/>
        <List>
          { 
            lists.map( city => (
              <List.Item platform="ios" arrow="horizontal" thumb={this.state.cityIcon} extra={city.cn} onClick={() => this.onSelect(city)}> 
                {city.en}
              </List.Item>
            ))
          }
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
