import React from 'react';
import { NavBar, WhiteSpace, WingBlank, Toast, TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchTrains } from '../actions/Trains';

class TrainSearch extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      fromStation: this.props.fromStation,
      toStation: this.props.toStation,
      startDate: this.props.startDate,
      trainsResult: this.props.trainsResult,
    };
    console.log('TrainSearch 👇');
    console.log(props);
  }

  componentDidMount = () => {
    this.setState({
      navibarTitle: this.props.fromStation.en + ' ⇀ ' + this.props.toStation.en
    });
    //显示轻提示
    Toast.info(this.props.lang.loadingText, 0);
    //抓取车站文本
    this.props.fetchTrains(this.props.fetchTrainsUrl);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainSearch.componentWillReceiveProps 👇');
    console.log(nextProps);
    //隐藏新提示
    //Toast.hide();
    //开发中延时一下，发布时取消。
    setTimeout(() => Toast.hide(), 1000);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainSearch.shouldComponentUpdate 👇');
    return this.state.fromStation.code != nextState.fromStation.code || 
           this.state.toStation.code != nextState.toStation.code ||
           this.state.startDate != nextState.startDate ||
           this.state.navibarTitle != nextState.navibarTitle;
  }

  render() {
    console.log("render()");
    return (
      <div>
        <NavBar iconName={null} leftContent={this.props.lang.navibarLeftBack} mode="light" onLeftClick={() => this.props.history.goBack()}>
          <h1 id="TrainIndex-h1">{this.props.lang.searchNavibarTitle}</h1>
        </NavBar>

        <div className="flex-box">
          <div className="flex-item flex-grow-3">
            <div className="sTrain">G114</div>
            <div className="sStart">08:53</div>
            <div className="sEnd">14:30</div>
          </div>
          <div className="flex-item flex-grow-8">
            <div className="sRun">05:37</div>
            <div className="sFrom">Beijing Nan (South)</div>
            <div className="sTo">Shanghai Hongqiao</div>
          </div>
          <div className="flex-item flex-grow-1">
            <div className="sNext"></div>
          </div>
        </div>

        <div id="TrainIndex-tabbar-div">
          <TabBar barTintColor="white">
            {this.props.lang.searchTabBar.map( 
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
  startDate: store.get('startDate'),
  trainsResult: store.get('trainsResult'),
  fetchTrainsUrl: store.get('fetchTrainsUrl'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrains: (url) => dispatch(fetchTrains(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainSearch);
