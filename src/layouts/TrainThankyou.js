import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { NavBar, Result, Icon, WhiteSpace, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { setOrderResult } from '../actions/Trains';

class TrainThankyou extends React.PureComponent {

  constructor(props) {
    super(props);
    //直接访问时，跳转到首页
    if (!props.orderState) {
      props.history.push('/');
    }
  }

  goBack = () => {
    this.props.setOrderResult(null)
    this.props.history.push('/booklinkman');
  }

  render() {
    return (
      <div>
        <QueueAnim className="date-wrap" type="top">
          <div className="trainPage" key="1">
            <NavBar iconName={null} leftContent={[<img className="chtBack" src={this.props.lang.backIcon}/>, this.props.lang.navibarLeftBack]} onLeftClick={this.goBack}>
              <h1 id="TrainIndex-h1">{this.props.lang.thankyouH1Text}</h1>
            </NavBar>
            <WhiteSpace />
            <Result
                img={<Icon type="check-circle" className="icon" style={{ fill: '#1F90E6', width: '2.2rem', height: '2.2rem' }} />}
                title={this.props.lang.thankyouTitle}
                message={this.props.lang.thankyouMessage}
              />
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
  totalPrice: store.get('totalPrice'),
  passengers: store.get('passengers'),
  selectSeat: store.get('selectSeat'),
  linkman: store.get('linkman'),
  orderState: store.get('orderState'),
  totalFee: store.get('totalFee'),
});

const mapDispatchToProps = (dispatch) => ({
  setOrderResult: (state) => dispatch(setOrderResult(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainThankyou);
