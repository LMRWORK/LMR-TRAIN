import React from 'react';
import { NavBar, SearchBar, WhiteSpace, WingBlank, Toast, List} from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchStationsTxt, setFromStation, setToStation } from '../actions/Trains';

class TrainCity extends React.PureComponent {

  constructor(props) {
    super(props);
    this.clientHeight = document.documentElement.clientHeight;
    this.state = {
      cityNavibarTitle: this.props.location.search=='?from' ? this.props.lang.fromStationLabel : this.props.lang.toStationLabel,
      searchType: this.props.location.search=='?from' ? 'from' : 'to',
      stationsArr: [],
    };
    //console.log('TrainCity 👇');
    //console.log(props);
  }

  componentDidMount = () => {
    if (!this.props.stationsTxt) {
      //显示轻提示
      Toast.info(this.props.lang.loadingText, 0);
      //抓取车站文本
      this.props.fetchStationsTxt(this.props.stationsUrl);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    //隐藏新提示
    //Toast.hide();
    //开发中延时一下，发布时取消。
    setTimeout(() => Toast.hide(), 1000);
  }

  //正则匹配城市字串，数据格式："@Guangzhou|広州|广州|GZQ|707@"
  onSearch = (str) => {
    if (str) {
      const reg = new RegExp('@[^@]{0,50}?'+str+'[^@]{0,50}?@', 'gi');
      const reg_arr = this.props.stationsTxt.match(reg);
      let count = 0;
      if (reg_arr) {
        let stationObj_arr = [];
        for (let i=0; i<reg_arr.length; i++) {
          let tmp = reg_arr[i].split('|');
          stationObj_arr.push({ en: tmp[1], cn: tmp[2], code: tmp[3] });
          if (count++ > 10) break;
        }
        this.setState({stationsArr: stationObj_arr});
        //console.log(stationObj_arr);
      }
    } else {
      this.setState({stationsArr: []});
    }
  }

  onSelect = (city) => {
    this.state.searchType == 'from' ? this.props.setFromStation(city) : this.props.setToStation(city);
    this.props.history.push('/index');
  }

  render() {
    let lists = this.state.stationsArr.length ? this.state.stationsArr : this.props.stationsArrInit;
    return (
      <div>
        <NavBar iconName={null} leftContent={this.props.lang.navibarLeftBack} mode="light" onLeftClick={() => this.props.history.goBack()}>
          <h1 id="TrainIndex-h1">{this.state.cityNavibarTitle}</h1>
        </NavBar>
        <WhiteSpace/>
        <WingBlank>
          <SearchBar placeholder={this.props.lang.searchPlaceholder} onChange={str => this.onSearch(str)}/>
        </WingBlank>
        <WhiteSpace/>
        <List style={{overflow:'scroll', maxHeight:this.clientHeight-214}}>
          {lists.map( city => (
              <List.Item platform="ios" arrow="horizontal" thumb={this.props.lang.cityIcon} extra={city.cn} onClick={() => this.onSelect(city)}> 
                {city.en}
              </List.Item>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  lang: store.get('lang'),
  stationsUrl: store.get('stationsUrl'),
  stationsTxt: store.get('stationsTxt'),
  stationsArrInit: store.get('stationsArrInit'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchStationsTxt: (url) => dispatch(fetchStationsTxt(url)),
  setFromStation: (station) => dispatch(setFromStation(station)),
  setToStation: (station) => dispatch(setToStation(station)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainCity);
