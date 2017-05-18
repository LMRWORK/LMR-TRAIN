import React from 'react';
import { NavBar, WhiteSpace, WingBlank, Toast, TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchTrains, setTrainsResult, setStartDate } from '../actions/Trains';

class TrainSearch extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      navibarTitle: '',
      fromStation: this.props.fromStation,
      toStation: this.props.toStation,
      startDate: this.props.startDate,
      trainsResult: null,
      datepickerVisible: false,
    };
    console.log('TrainSearch 👇');
    console.log(props);
  }

  componentDidMount = () => {
    this.setState({
      navibarTitle: this.state.fromStation.en + ' ⇀ ' + this.state.toStation.en
    });
    //显示轻提示
    Toast.info(this.props.lang.loadingText, 0);
    //抓取火车数据
    this.props.fetchTrains(this.props.fetchTrainsUrl);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainSearch.componentWillReceiveProps 👇');
    console.log(nextProps);
    if (nextProps.trainsResult) {
      this.setState({trainsResult: nextProps.trainsResult});
      //清空抓取数据
      this.props.setTrainsResult(null);
      //隐藏轻提示
      Toast.hide();
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainSearch.shouldComponentUpdate 👇');
    return this.state.fromStation.code != nextState.fromStation.code || 
           this.state.toStation.code != nextState.toStation.code ||
           this.state.startDate != nextState.startDate ||
           this.state.navibarTitle != nextState.navibarTitle ||
           this.state.trainsResult != nextState.trainsResult;
  }

  showDatePicker = () => {
    this.setState({ datepickerVisible: true });
  }

  prevDay = () => {
    console.log('prevDay');
    //显示轻提示
    Toast.info(this.props.lang.loadingText, 0);
    //清空原结果 & 日期减一
    this.setState({
      trainsResult: null,
      startDate: this.state.startDate.subtract(1, 'd'),
    });
    //重新抓取火车数据
    this.props.fetchTrains(this.props.fetchTrainsUrl);
  }

  nextDay = () => {
    console.log('nextDay');
    //显示轻提示
    Toast.info(this.props.lang.loadingText, 0);
    //清空原结果 & 日期加一
    this.setState({
      trainsResult: null,
      startDate: this.state.startDate.add(1, 'd'),
    });
    //重新抓取火车数据
    this.props.fetchTrains(this.props.fetchTrainsUrl);
  }

  render() {
    console.log("TrainSearch.render()");
    let list = this.state.trainsResult ? this.state.trainsResult.result : [];
    return (
      <div>
        <NavBar iconName={null} leftContent={this.props.lang.navibarLeftBack} mode="light" onLeftClick={() => this.props.history.goBack()}>
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
              <a> <img src={this.props.lang.dateIcon}/> <span>{this.state.startDate.format('LL')}</span> <div className="sDown-small"></div> </a>
            </div>
          </div>
          <div className="flex-item flex-grow-1 textRight">
            <a className="btn" id="nextDay" onClick={this.nextDay}>
              {this.props.lang.nextDate} <div className="sNext-small"></div>
            </a>
          </div>
        </div>
        {list.map(
          i => (
            <div className="flex-box">
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
              <div className="flex-item flex-grow-1">
                <div className="sNext"></div>
              </div>
            </div>
          )
        )}
        <div id="TrainIndex-tabbar-div">
          <TabBar barTintColor="white">
            {this.props.lang.searchTabBar.map( 
              i => <TabBar.Item title={i.name} key={i.name} icon={<div/>}/>
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
  fetchTrains: (url) => dispatch(fetchTrains(url)),
  setTrainsResult: (result) => dispatch(setTrainsResult(result)),
  setStartDate: (moment) => dispatch(setStartDate(moment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainSearch);
