import React from 'react';
import { NavBar, WhiteSpace, WingBlank, Toast, TabBar, DatePicker } from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchTrains, setTrainsResult, setStartDate, sortByRunTime, sortByStartTime, sortByPrice, setSelectTrain } from '../actions/Trains';

class TrainSearch extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      navibarTitle: null,
      datepickerVisible: false,
      selectedTab: null,
      action: 'init', //用于记录复杂页面的操作历史
    };
    console.log('TrainSearch 👇');
    console.log(props);
  }

  componentDidMount = () => {
    //设置navbar
    this.setState({
      navibarTitle: this.props.fromStation.en + ' ⇀ ' + this.props.toStation.en
    });
    //清空原结果
    this.props.setTrainsResult(null);
    //显示轻提示
    Toast.info(this.props.lang.loadingText, 0);
    //抓取火车数据
    this.props.fetchTrains(this.props.fetchTrainsUrl, this.props.fromStation, this.props.toStation, this.props.startDate);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainSearch.componentWillReceiveProps 👇');
    console.log(nextProps);
    //加载完成
    if (nextProps.trainsResult) {
      //隐藏轻提示
      Toast.hide();
      //排序
      this.filter(this.state.selectedTab);
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainSearch.shouldComponentUpdate 👇');
    return this.props.fromStation.code != nextProps.fromStation.code || 
           this.props.toStation.code != nextProps.toStation.code ||
           this.props.startDate != nextProps.startDate ||
           this.props.trainsResult != nextProps.trainsResult ||
           this.state.navibarTitle != nextState.navibarTitle ||
           this.state.selectedTab != nextState.selectedTab ||
           this.state.datepickerVisible != nextState.datepickerVisible;
  }

  //显示日期控件
  showDatePicker = () => {
    this.setState({datepickerVisible: true});
  }

  //OK+取消按钮：隐藏日期控件
  hideDate = () => {
    this.setState({datepickerVisible: false});
  }

  //日期变更时: 重新抓取火车数据
  onChange = (moment) => {
    if (moment != this.props.startDate) {
      //显示轻提示
      Toast.info(this.props.lang.loadingText, 0);
      //更新日期
      this.props.setStartDate(moment);
      //console.log(this.props.startDate.format('L'));
      //console.log(this.props.startDate.format('L'));
      //清空原结果
      this.props.setTrainsResult(null);
      //重新抓取火车数据
      this.props.fetchTrains(this.props.fetchTrainsUrl, this.props.fromStation, this.props.toStation, moment);
    }
    this.setState({action: 'onChange'});
  }

  //前一天
  prevDay = () => {
    //显示轻提示
    Toast.info(this.props.lang.loadingText, 0);
    //日期减一
    this.props.setStartDate(this.props.startDate.subtract(1, 'd'));
    //清空原结果
    this.props.setTrainsResult(null);
    //重新抓取火车数据
    this.props.fetchTrains(this.props.fetchTrainsUrl, this.props.fromStation, this.props.toStation, this.props.startDate);
    //记录操作
    this.setState({action: 'prevDay'});
  }

  //后一天
  nextDay = () => {
    //显示轻提示
    Toast.info(this.props.lang.loadingText, 0);
    //日期加一
    this.props.setStartDate(this.props.startDate.add(1, 'd'));
    //清空原结果
    this.props.setTrainsResult(null);
    //重新抓取火车数据
    this.props.fetchTrains(this.props.fetchTrainsUrl, this.props.fromStation, this.props.toStation, this.props.startDate);
    //记录操作
    this.setState({action: 'nextDay'});
  }

  //火车条件筛选
  filter = (data = this.state.selectedTab) => {
    if (this.state.selectedTab != data || this.state.action != 'filter') {
      switch(data) {
        case 'sortByRunTime':
          this.props.sortByRunTime();
          this.setState({selectedTab: data});
          break;
        case 'sortByStartTime':
          this.props.sortByStartTime();
          this.setState({selectedTab: data});
          break;
        case 'sortByPrice':
          this.props.sortByPrice();
          this.setState({selectedTab: data});
          break;
      }
      this.setState({action: 'filter'});
      //console.log('sort done: ' + data);
    }
  }

  //选择车站后，提交store，并路由到座位选择页
  onSelect = (train) => {
    console.log(train);
    this.props.setSelectTrain(train);
  }
 
  render() {
    console.log("@@ TrainSearch.render() @@");
    return (
      <div>
        <NavBar iconName={null} leftContent={this.props.lang.navibarLeftBack} mode="light" onLeftClick={() => this.props.history.push('/index')}>
          <h1 id="TrainIndex-h1">{this.state.navibarTitle}</h1>
        </NavBar>
        <div className="flex-box searchBar">
          <div className="flex-item flex-grow-1 textLeft">
            <a className="btn" id="prevDay" onClick={this.prevDay}>
              <div className="sBefore-small"></div> {this.props.lang.prevDate} 
            </a>
          </div>
          <div className="flex-item flex-grow-1">
            <div id="showDatepicker">
              <a onClick={() => this.showDatePicker()}> <img src={this.props.lang.dateIcon}/> <span>{this.props.startDate.format('LL')}</span> <div className="sDown-small"></div> </a>
            </div>
            <DatePicker
              visible={this.state.datepickerVisible}
              mode="date"
              extra="请选择"
              onOk={() => this.hideDate()}
              onDismiss={() => this.hideDate()}
              value={this.props.startDate}
              onChange={moment => this.onChange(moment)}
            />
          </div>
          <div className="flex-item flex-grow-1 textRight">
            <a className="btn" id="nextDay" onClick={this.nextDay}>
              {this.props.lang.nextDate} <div className="sNext-small"></div>
            </a>
          </div>
        </div>
        {this.props.trainsResult && this.props.trainsResult.result.map(
          i => (
            <div className="flex-box" onClick={() => this.onSelect(i)}>
              <div className="flex-item flex-grow-3">
                <div className="sTrain">{i.TrainCode}</div>
                <div className="sStart">{i.DepartTime}</div>
                <div className="sEnd">{i.ArriveTime}</div>
              </div>
              <div className="flex-item flex-grow-8">
                <div className="sRun">{i.RunTime} {this.props.lang.minute}</div>
                <div className="sFrom">{i.DepartStation}</div>
                <div className="sTo">{i.ArriveStation}</div>
              </div>
              <div className="flex-item flex-grow-2">
                <div className="sSeat"><img src={this.props.lang.seatIcon}/> {i.cheapSeat.SeatName} </div>
                <div className="sPrice"> <img src={this.props.lang.priceIcon}/> {this.props.lang.priceMarkBegin+i.cheapSeat.SeatPrice+this.props.lang.pricemarkAfter} </div>
              </div>
              <div className="flex-item flex-grow-1">
                <div className="sNext"></div>
              </div>
            </div>
          )
        )}
        <div id="TrainSearch-tabbar-div">
          <TabBar barTintColor="white">
            {this.props.lang.searchTabBar.map( 
              i => <TabBar.Item title={i.name} key={i.name} icon={<div/>} onPress={() => this.filter(i.data)} data-active={this.state.selectedTab === i.data}></TabBar.Item>
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
  trainsResult: store.get('trainsResult'),
  fetchTrainsUrl: store.get('fetchTrainsUrl'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrains: (url, fromStation, toStation, startDate) => dispatch(fetchTrains(url, fromStation, toStation, startDate)),
  setTrainsResult: (result) => dispatch(setTrainsResult(result)),
  setStartDate: (moment) => dispatch(setStartDate(moment)),
  sortByRunTime: () => dispatch(sortByRunTime()),
  sortByStartTime: () => dispatch(sortByStartTime()),
  sortByPrice: () => dispatch(sortByPrice()),
  setSelectTrain: (train) => dispatch(setSelectTrain(train)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainSearch);
