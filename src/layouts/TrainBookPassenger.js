import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { List, NavBar, Flex, WhiteSpace, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { setNoSearch } from '../actions/Trains';

class TrainBookPassenger extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      lastAction: 'init',
    };
    console.log('😃 TrainBookPassenger', props);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainBookPassenger.componentWillReceiveProps', nextProps);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainBookPassenger.shouldComponentUpdate');
    return true;
  }

  render() {
    console.log("🔥 TrainBookPassenger.render()");
    //没有数据路由到搜索页
    if (!this.props.selectTrain) {
      this.props.setNoSearch(false);
      this.props.history.push('/search');
      return false;
    }
    return (
      <QueueAnim className="router-wrap" type="top">
        <div className="bookPage" key="1">
          <NavBar iconName={null} leftContent={[<img className="chtBack" src={this.props.lang.backIcon}/>,this.props.lang.navibarLeftBack]} mode="dark" onLeftClick={() => this.props.history.push('/search')}>
            <h1 id="TrainIndex-h1">{this.props.lang.bookNaviBar}</h1>
          </NavBar>
          
          <WhiteSpace/>
          <WingBlank className="clickPayText">{this.props.lang.bookTips}</WingBlank>
          <WhiteSpace/>
        </div>
      </QueueAnim>
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

const mapDispatchToProps = (dispatch) => ({
  setNoSearch: (noSearch) => dispatch(setNoSearch(noSearch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainBookPassenger);
