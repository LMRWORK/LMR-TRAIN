import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { NavBar, Result, Icon, WhiteSpace, WingBlank, Button } from 'antd-mobile';
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

  pay_massage = () => (
    <div>
      {this.props.lang.payMessage}<br/><br/>
      <div className="payText">
        {this.props.lang.totalTitle}
        {this.props.lang.priceMarkBegin}{this.props.totalPrice}{this.props.lang.priceMarkAfter}
      </div>
      <a href={this.props.orderState.payurl} target="_blank"><img src={this.props.lang.payImage} width="500"/></a><br/><br/>
      {this.props.lang.payThanksText2}
      <WingBlank><Button className="btn" type="primary" style={{margin:'0.5rem 0'}} onClick={ () => this.props.history.push('/') }>{this.props.lang.paySearchNext}</Button></WingBlank>
      {this.props.lang.payThanksLinker}
    </div>
  );

  nopay_massage = () => (
    <div>
      {this.props.lang.thankyouMessage}<br/><br/>
      {this.props.lang.payThanksText}
      <WingBlank><Button className="btn" type="primary" style={{margin:'0.5rem 0'}} onClick={ () => this.props.history.push('/') }>{this.props.lang.paySearchNext}</Button></WingBlank>
      {this.props.lang.payThanksLinker}
    </div>
  );

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
            <Result
              img={<Icon type="check-circle" className="icon" style={{ fill: '#1F90E6', width: '2.4rem', height: '2.4rem' }} />}
              title={this.props.lang.thankyouTitle}
              message={(this.props.orderState && this.props.orderState.payurl) ? this.pay_massage() : this.nopay_massage()}
            />
            <WhiteSpace />
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
