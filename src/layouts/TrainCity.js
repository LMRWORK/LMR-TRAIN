import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { NavBar, SearchBar, WhiteSpace, WingBlank, List} from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchStationsTxt, setFromStation, setToStation } from '../actions/Trains';

class TrainCity extends React.PureComponent {

  constructor(props) {
    super(props);
    this.clientHeight = document.documentElement.clientHeight; //fix弹出输入框造成的高度变化
    this.state = {
      cityNavibarTitle: this.props.location.search=='?from' ? this.props.lang.fromStationLabel : this.props.lang.toStationLabel,
      searchType: this.props.location.search=='?from' ? 'from' : 'to',
      stationsArr: [],
    };
    console.log('😃 TrainCity');
    console.log(props);
  }

  componentDidMount = () => {
    if (!this.props.stationsTxt) {
      //显示轻提示（因为使用cdn分发，速度很快，不显示loading）
      //Toast.info(<Loading text={this.props.lang.loadingText}/>, 0);
      //抓取车站文本
      this.props.fetchStationsTxt(this.props.stationsUrl);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    //隐藏新提示
    /*因为使用cdn分发，速度很快，不显示loading
    if (nextProps.stationsTxt){
      Toast.hide();
    }
    */
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainCity.shouldComponentUpdate');
    return this.state.stationsArr != nextState.stationsArr;
  }

  //正则匹配城市字串，数据格式："@Guangzhou|広州|广州|GZQ|707@"
  onSearch = (str) => {
    if (str) {
      const reg = new RegExp('@[^@]{0,50}?'+str+'[^@]{0,50}?@', 'gi');
      const reg_arr = [];
      let temp_arr = [];
      let count = 0;
      while ((temp_arr = reg.exec(this.props.stationsTxt)) !== null) {
        let tmp = temp_arr[0].split('|');
        reg_arr.push({ en: tmp[1], cn: tmp[2], code: tmp[3] });
        if (count++ > 8) break; 
      }
      if (reg_arr.length > 0) {
        this.setState({stationsArr: reg_arr});
        //console.log(stationObj_arr);
      }
    } else {
      this.setState({stationsArr: []});
    }
  }

  onSelect = (city) => {
    this.state.searchType == 'from' ? this.props.setFromStation(city) : this.props.setToStation(city);
    this.props.history.push('/');
  }

  render() {
    console.log("🔥 TrainCity.render()");
    let lists = this.state.stationsArr.length ? this.state.stationsArr : this.props.stationsArrInit;
    return (
      <QueueAnim className="router-wrap" type="bottom">
        <div className="trainPage" key="2">
          <NavBar iconName={null} leftContent={[<img className="chtBack" src={this.props.lang.backIcon}/>,this.props.lang.navibarLeftBack]} mode="dark" onLeftClick={() => this.props.history.push('/')}>
            <h1 id="TrainIndex-h1">{this.state.cityNavibarTitle}</h1>
          </NavBar>
          <WhiteSpace/>
          <WingBlank>
            <SearchBar placeholder={this.props.lang.searchPlaceholder} onChange={str => this.onSearch(str)} cancelText={this.props.lang.searchCancel}/>
          </WingBlank>
          <WhiteSpace/>
          <List style={{overflow:'scroll', maxHeight:this.clientHeight}}>
            {lists.map( city => (
              <List.Item arrow="horizontal" key={city.en} thumb={this.props.lang.cityIcon} extra={city.cn} onClick={() => this.onSelect(city)}> 
                {city.en}
              </List.Item>
            ))}
          </List>
        </div>
      </QueueAnim>
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
