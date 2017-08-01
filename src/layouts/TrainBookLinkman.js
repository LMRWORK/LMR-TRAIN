import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { List, NavBar, Flex, WhiteSpace, WingBlank, Button, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { setNoSearch, setLinkman } from '../actions/Trains';

class TrainBookLinkman extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      lastAction: 'init',
      lNameError: false,
      lEmailError: false,
      lPhoneError: false,
      lNationError: false
    };
    console.log('😃 TrainBookLinkman', props);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainBookLinkman.componentWillReceiveProps', nextProps);
  }

  updateLinkman = () => {
    const lName = document.getElementById('lName').value;
    const lEmail = document.getElementById('lEmail').value;
    const lNation = document.getElementById('lNation').value;
    const lPhone = document.getElementById('lPhone').value;
    //更新联系人信息
    this.props.setLinkman({
      name: lName,
      email: lEmail,
      nation: lNation,
      phone: lPhone,
    });
    
  }

  //预定支付
  onNextBook = () => {
    this.updateLinkman();
    //联系人表单校验
    const lName = document.getElementById('lName').value;
    const lEmail = document.getElementById('lEmail').value;
    const lNation = document.getElementById('lNation').value;
    const lPhone = document.getElementById('lPhone').value;
    lName ? this.setState({'lNameError': false}) : this.setState({'lNameError': true});
    lNation ? this.setState({'lNationError': false}) : this.setState({'lNationError': true});
    lPhone ? this.setState({'lPhoneError': false}) : this.setState({'lPhoneError': true});
    const remail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let valiEmail = false;
    if (remail.test(lEmail)) {
      valiEmail = true;
      this.setState({'lEmailError': false});
    } else {
      this.setState({'lEmailError': true});
    }
    //提交表单
    if (lName && lEmail && lNation && lPhone && valiEmail) {
      console.log('已搜集完所有数据，TODO：异步提交表单，监控响应!');
    } else {
      console.log('验证失败禁止提交!');
    }
  }

  goBack = () => {
    this.updateLinkman();
    this.props.history.push('/book');
  }

  render() {
    console.log("🔥 TrainBookLinkman.render()");
    //没有数据路由到搜索页
    if (!this.props.selectTrain) {
      this.props.setNoSearch(false);
      this.props.history.push('/search');
      return false;
    }
    return (
      <QueueAnim className="router-wrap" type="top">
        <div className="bookPage" key="1">
          <NavBar iconName={null} leftContent={[<img className="chtBack" src={this.props.lang.backIcon}/>,this.props.lang.navibarLeftBack]} mode="dark" onLeftClick={this.goBack}>
            <h1 id="TrainIndex-h1">{this.props.lang.checkNaviBar}</h1>
          </NavBar>
          <List renderHeader={this.props.lang.checkTrainText} id="payDiv1">
            <List.Item thumb={this.props.lang.trainIcon}><span style={{fontSize:'0.6rem'}}>{this.props.selectTrain.TrainCode}</span> <span className="sFont">{this.props.selectSeat.SeatName}</span></List.Item>
            <List.Item thumb={this.props.lang.cityIcon}><span style={{fontSize:'0.6rem'}}>{this.props.selectTrain.DepartStation}</span> <span className="sFont">{this.props.startDate.format('lll')}</span></List.Item>
            <List.Item thumb={this.props.lang.cityIcon}><span style={{fontSize:'0.6rem'}}>{this.props.selectTrain.ArriveStation}</span> <span className="sFont">{this.props.arriveDate.format('lll')}</span></List.Item>
          </List>
          <List renderHeader={this.props.lang.checkPersonText} id="payDiv2">
          {this.props.passengers.map( i => (
            <List.Item thumb={this.props.lang.nameIcon} extra={i.age ? this.props.lang.childText : this.props.lang.adultText} align="top" multipleLine>
              <span style={{fontSize:'0.6rem'}}>{i.name}</span> <List.Item.Brief>{i.passport}</List.Item.Brief>
            </List.Item>
          ))}
          </List>
          <List renderHeader={this.props.lang.linkmanHead}>
            <List.Item className="imgAutoList">
              <InputItem placeholder={this.props.lang.namePlaceholder} id="lName" error={this.state.lNameError} onErrorClick={() => alert(this.props.lang.lName)} defaultValue={this.props.linkman ? this.props.linkman.name : null}>
                {this.props.lang.nameText}
              </InputItem>
            </List.Item>
            <List.Item className="imgAutoList">
              <InputItem placeholder={this.props.lang.emailPlaceholder} id="lEmail" error={this.state.lEmailError} onErrorClick={() => alert(this.props.lang.lEmail)} defaultValue={this.props.linkman ? this.props.linkman.email : null}>
                {this.props.lang.emailText}
              </InputItem>
            </List.Item>
            <List.Item className="imgAutoList">
              <InputItem placeholder={this.props.lang.nationPlaceholder} id="lNation" error={this.state.lNationError} onErrorClick={() => alert(this.props.lang.lNation)} defaultValue={this.props.linkman ? this.props.linkman.nation : null}>
                {this.props.lang.nationText}
              </InputItem>
            </List.Item>
            <List.Item className="imgAutoList">
              <InputItem placeholder={this.props.lang.phonePlaceholder} id="lPhone" error={this.state.lPhoneError} onErrorClick={() => alert(this.props.lang.lPhone)} defaultValue={this.props.linkman ? this.props.linkman.phone : null}>
                {this.props.lang.phoneText}
              </InputItem>
            </List.Item>
          </List>
          <List renderHeader={this.props.lang.totalTitle} id="payDiv3">
            <List.Item thumb={this.props.lang.totalPriceIcon}>
              <Flex>
                <Flex.Item className="bItem bTotal">{this.props.lang.priceMarkBegin}{this.props.totalPrice}{this.props.lang.priceMarkAfter}</Flex.Item>
                <Flex.Item className="bItem bPay">
                  <Button className="btn" type="primary" onClick={this.onNextBook}>
                    {this.props.lang.bookNpay}
                  </Button>
                </Flex.Item>
              </Flex>
            </List.Item>
          </List>
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
  totalPrice: store.get('totalPrice'),
  passengers: store.get('passengers'),
  selectSeat: store.get('selectSeat'),
  linkman: store.get('linkman'),
});

const mapDispatchToProps = (dispatch) => ({
  setLinkman: (linkman) => dispatch(setLinkman(linkman)),
  setNoSearch: (noSearch) => dispatch(setNoSearch(noSearch))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainBookLinkman);
