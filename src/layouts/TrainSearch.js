import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { NavBar, Toast, TabBar, DatePicker } from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchTrains, setTrainsResult, setStartDate, sortByRunTime, sortByStartTime, sortByPrice, setSelectTrain, setSelectedTab, ActivityIndicator } from '../actions/Trains';
import Loading from '../components/Loading';

class TrainSearch extends React.PureComponent {

  constructor(props) {
    super(props);
    this.clientHeight = document.documentElement.clientHeight; //fix弹出输入框造成的高度变化
    this.state = {
      datepickerVisible: false,
      selectedTab: this.props.selectedTab,
      lastAction: 'init', //用于记录复杂页面的操作历史

    };
    console.log('😃 TrainSearch ');
    console.log(props);
  }

  componentDidMount = () => {
    //清空原结果
    this.props.setTrainsResult(null);
    //显示轻提示
    Toast.info(<Loading text={this.props.lang.loadingText}/>, 0);
    //抓取火车数据
    this.props.fetchTrains(this.props.fetchTrainsUrl, this.props.fromStation, this.props.toStation, this.props.startDate);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainSearch.componentWillReceiveProps');
    console.log(nextProps);
    //加载完成
    if (nextProps.trainsResult) {
      //隐藏轻提示
      Toast.hide();
      //排序
      this.filter(this.props.selectedTab);
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainSearch.shouldComponentUpdate');
    return this.props.fromStation.code != nextProps.fromStation.code || 
           this.props.toStation.code != nextProps.toStation.code ||
           this.props.startDate != nextProps.startDate ||
           this.props.trainsResult != nextProps.trainsResult ||
           this.props.selectedTab != nextProps.selectedTab ||
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
      Toast.info(<Loading text={this.props.lang.loadingText}/>, 0);
      //更新日期
      this.props.setStartDate(moment);
      //console.log(this.props.startDate.format('L'));
      //console.log(this.props.startDate.format('L'));
      //清空原结果
      this.props.setTrainsResult(null);
      //重新抓取火车数据
      this.props.fetchTrains(this.props.fetchTrainsUrl, this.props.fromStation, this.props.toStation, moment);
    }
    this.setState({lastAction: 'onChange'});
  }

  //前一天
  prevDay = () => {
    //显示轻提示
    Toast.info(<Loading text={this.props.lang.loadingText}/>, 0);
    //日期减一
    this.props.setStartDate(this.props.startDate.subtract(1, 'd'));
    //清空原结果
    this.props.setTrainsResult(null);
    //重新抓取火车数据
    this.props.fetchTrains(this.props.fetchTrainsUrl, this.props.fromStation, this.props.toStation, this.props.startDate);
    //记录操作
    this.setState({lastAction: 'prevDay'});
  }

  //后一天
  nextDay = () => {
    //显示轻提示
    Toast.info(<Loading text={this.props.lang.loadingText}/>, 0);
    //日期加一
    this.props.setStartDate(this.props.startDate.add(1, 'd'));
    //清空原结果
    this.props.setTrainsResult(null);
    //重新抓取火车数据
    this.props.fetchTrains(this.props.fetchTrainsUrl, this.props.fromStation, this.props.toStation, this.props.startDate);
    //记录操作
    this.setState({lastAction: 'nextDay'});
  }

  //火车条件筛选
  filter = (data = this.props.selectedTab) => {
    if (this.props.selectedTab != data || this.state.lastAction != 'filter') {
      switch(data) {
        case 'sortByRunTime':
          this.props.sortByRunTime();
          this.props.setSelectedTab(data);
          break;
        case 'sortByStartTime':
          this.props.sortByStartTime();
          this.props.setSelectedTab(data);
          break;
        case 'sortByPrice':
          this.props.sortByPrice();
          this.props.setSelectedTab(data);
          break;
      }
      this.setState({lastAction: 'filter'});
      //console.log('sort done: ' + data);
    }
  }

  //选择车站后，提交store，并路由到座位选择页
  onSelect = (train) => {
    //console.log(train);
    this.props.setSelectTrain(train);
    this.props.history.push('/book');
  }
 
  render() {
    console.log("🔥 TrainSearch.render()");
    return (
      <div>
        <QueueAnim className="router-wrap" type="bottom">
          <div className="trainPage" key="3">
            <NavBar iconName={null} leftContent={[<img className="chtBack" src={this.props.lang.backIcon}/>,this.props.lang.navibarLeftBack]} mode="dark" onLeftClick={() => this.props.history.push('/')}>
              <h1 id="TrainIndex-h1">{this.props.fromStation.en} <img src={this.props.lang.rightIcon} className="rightArrow"/> {this.props.toStation.en}</h1>
            </NavBar>
            <div className="flex-box searchBar">
              <div className="flex-item flex-grow-1 textLeft">
                <a className="btn" id="prevDay" onClick={this.prevDay}>
                  <div className="sBefore-small"></div> {this.props.lang.prevDate} 
                </a>
              </div>
              <div className="flex-item flex-grow-1">
                <div id="showDatepicker">
                  <a onClick={this.showDatePicker}> <img src={this.props.lang.dateIcon}/> <span>{this.props.startDate.format('LL')}</span> <div className="sDown-small"></div> </a>
                </div>
                <DatePicker
                  visible={this.state.datepickerVisible}
                  mode="date"
                  onOk={this.hideDate}
                  onDismiss={this.hideDate}
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
            <div style={{overflow:'scroll', maxHeight:this.clientHeight-214}}>
              {this.props.trainsResult && this.props.trainsResult.result.map(
                (i, id) => (
                  <div className="trainResults flex-box" key={id} onClick={() => this.onSelect(i)}>
                    <div className="flex-item flex-grow-4">
                      <div className="sTrain">{i.TrainCode}</div>
                      <div className="sStart">{i.DepartTime}</div>
                      <div className="sEnd">{i.ArriveTime}</div>
                    </div>
                    <div className="flex-item flex-grow-6">
                      <div className="sRun">{this.props.lang.needTime} {i.RunTime}</div>
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
            </div>
          </div>
        </QueueAnim>
        <div id="TrainSearch-tabbar-div">
          <TabBar barTintColor="white">
            {this.props.lang.searchTabBar.map( 
              i => <TabBar.Item title={i.name} key={i.name} icon={<div/>} onPress={() => this.filter(i.data)} data-active={this.props.selectedTab === i.data}></TabBar.Item>
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
  selectedTab: store.get('selectedTab'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrains: (url, fromStation, toStation, startDate) => dispatch(fetchTrains(url, fromStation, toStation, startDate)),
  setTrainsResult: (result) => dispatch(setTrainsResult(result)),
  setStartDate: (moment) => dispatch(setStartDate(moment)),
  sortByRunTime: () => dispatch(sortByRunTime()),
  sortByStartTime: () => dispatch(sortByStartTime()),
  sortByPrice: () => dispatch(sortByPrice()),
  setSelectTrain: (train) => dispatch(setSelectTrain(train)),
  setSelectedTab: (filterType) => dispatch(setSelectedTab(filterType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainSearch);
