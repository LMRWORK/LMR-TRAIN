import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { List, NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import TrainForm from '../components/TrainForm';

class TrainBook extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
    console.log('😃 TrainBook ');
    console.log(props);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainBook.componentWillReceiveProps');
    console.log(nextProps);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainBook.shouldComponentUpdate');
    //console.log(nextProps.passengers);
    //console.log(this.props.passengers);
    return true;
  }

  render() {
    console.log("🔥 TrainBook.render()");
    //没有数据路由到搜索页
    if (!this.props.selectTrain) {
      this.props.history.push('/search');
      return false;
    }
    return (
      <div>
        <QueueAnim className="router-wrap" type="top">
          <div className="trainPage" key="4">
            <NavBar iconName={null} leftContent={[<img className="chtBack" src={this.props.lang.backIcon}/>,this.props.lang.navibarLeftBack]} mode="light" onLeftClick={() => this.props.history.push('/search')}>
              <h1 id="TrainIndex-h1">{this.props.lang.bookNaviBar}</h1>
            </NavBar>
            <List renderHeader={this.props.lang.bookinfo}>
              <List.Item> 
                <div className="flex-box bookinfo">
                  <div className="flex-item flex-grow-1 bookinfoLeft">
                    <div className="bItem bFrom">{this.props.selectTrain.DepartStation}</div>
                    <div className="bItem bFromTime">{this.props.selectTrain.DepartTime}</div>
                    <div className="bItem bFromDate">{this.props.startDate.format('LL')}</div>
                  </div>
                  <div className="flex-item flex-grow-1 bookinfoMiddle">
                    <div className="bItem bTrain"><img src={this.props.lang.trainIcon} id="img-tcd"/>{this.props.selectTrain.TrainCode}</div>
                    <div className="bItem bLongArr"><img src={this.props.lang.longArrIcon}/></div>
                    <div className="bItem bTime">{this.props.lang.needTime} {this.props.selectTrain.RunTime}</div>
                  </div>
                  <div className="flex-item flex-grow-1 bookinfoRight">
                    <div className="bItem bTo">{this.props.selectTrain.ArriveStation}</div>
                    <div className="bItem bToTime">{this.props.selectTrain.ArriveTime}</div>
                    <div className="bItem bToDate">{this.props.arriveDate.format('LL')}</div>
                  </div>
                </div>
              </List.Item>
            </List>
            <TrainForm />
          </div>
        </QueueAnim>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  lang: store.get('lang'),
  fromStation: store.get('fromStation'),
  toStation: store.get('toStation'),
  startDate: store.get('startDate'),
  selectTrain: store.get('selectTrain'),
  arriveDate: store.get('arriveDate'),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TrainBook);
