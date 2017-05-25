import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { List, NavBar, Toast, TabBar, WingBlank, WhiteSpace, Radio, Flex, InputItem, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import TrainForm from '../components/TrainForm';

class TrainBook extends React.PureComponent {

  constructor(props) {
    super(props);
    this.clientHeight = document.documentElement.clientHeight; //fix弹出输入框造成的高度变化
    this.state = {
      lastAction: 'init', //用于记录复杂页面的操作历史
    };
    console.log('😃 TrainBook ');
    console.log(props);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainBook.componentWillReceiveProps');
    console.log(nextProps);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainSearch.shouldComponentUpdate');
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
            <TrainForm />
          </div>
          <div id="TrainIndex-tabbar-div">
            <TabBar barTintColor="white">
              {this.props.lang.indexTabBar.map( 
                i => <TabBar.Item title={i.name} key={i.name} icon={<div/>}/>
              )}
            </TabBar>
          </div>
        </QueueAnim>
        <Modal title={this.props.lang.ageModalTitle} transparent maskClosable={false} visible={this.state.modalVisible} platform="ios" className="ichtModal" closable={true} onClose={this.hideModal}>
            <div className="am-modal-body">
                {this.props.lang.ageTips}
            </div>
            <div className="am-modal-footer">
              <div className="am-modal-button-group-v">
                <a className="am-modal-button" role="button" onClick={() => this.onSelectAge(0)}>{this.props.lang.adultText}</a>
                <a className="am-modal-button" role="button" onClick={() => this.onSelectAge(1)}>{this.props.lang.childText}</a>
              </div>
            </div>
        </Modal>
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
  selectSeat: store.get('selectSeat'),
  passengers: store.get('passengers'),
});

const mapDispatchToProps = (dispatch) => ({
  setSelectSeat: (seat) => dispatch(setSelectSeat(seat)),
  setPassengers: (passengers) => dispatch(setPassengers(passengers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainBook);
