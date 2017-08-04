import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { List, NavBar, Flex, WhiteSpace, WingBlank, Button, InputItem, Toast, Picker } from 'antd-mobile';
import { connect } from 'react-redux';
import { setNoSearch, setLinkman, ajaxOrder } from '../actions/Trains';
import Loading from '../components/Loading';

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
    //console.log('😃 TrainBookLinkman', props);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps);
    if (nextProps.orderState) {
      if (nextProps.orderState.status == 'ok') {
        Toast.hide();
        this.props.history.push('/thankyou');
      } else {
        Toast.hide();
        alert(this.props.lang.tryAgainText);
      }
    }
  }

  updateLinkman = () => {
    const lName = document.getElementById('lName').value;
    const lEmail = document.getElementById('lEmail').value;
    const lNation = document.getElementById('lNation').value;
    const lNationId = document.getElementById('lNation').getAttribute('data-ref');
    const lPhone = document.getElementById('lPhone').value;
    //更新联系人信息
    this.props.setLinkman({
      name: lName,
      email: lEmail,
      nation: lNation,
      nationId: lNationId,
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
    const lNationId = document.getElementById('lNation').getAttribute('data-ref');
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
    if (lName && lEmail && lNation && lPhone && valiEmail && lNationId) {
      //console.log('已搜集完所有数据，TODO：异步提交表单，监控响应!');
      //火车信息整理
      let selectTrain = {};
      selectTrain.search_index = 1;
      selectTrain.select_train = this.props.selectTrain.TrainCode;
      selectTrain.select_seat = '0|0|'+this.props.selectSeat.SeatName+'|'+this.props.selectSeat.SeatCode+'|'+this.props.selectSeat.SeatInventory+'|'+this.props.selectSeat.SeatPriceRMB+'|'+this.props.selectSeat.SeatPrice;
      selectTrain.select_train_seats = '';
      this.props.selectTrain.SeatList.forEach( i => {
        selectTrain.select_train_seats += '0|0|'+i.SeatName+'|'+i.SeatCode+'|'+i.SeatInventory+'|'+i.SeatPriceRMB+'|'+i.SeatPrice + '@';
      });
      selectTrain.select_train_seats = selectTrain.select_train_seats.slice(0 , -1);
      selectTrain.select_from_time = this.props.selectTrain.DepartTime;
      selectTrain.select_to_time = this.props.selectTrain.ArriveTime;
      selectTrain.select_fz = this.props.selectTrain.DepartStation;
      selectTrain.select_dz = this.props.selectTrain.ArriveStation;
      selectTrain.select_duration = this.props.selectTrain.RunTime;
      selectTrain.select_date = this.props.startDate.format('MM/DD/YYYY');
      selectTrain.select_dz_date = this.props.arriveDate.format('MM/DD/YYYY');
      selectTrain.service_fee = ''; //国际火车票指定手续费
      selectTrain.train_no = this.props.selectTrain.TrainNo;
      selectTrain.seat_types = this.props.selectTrain.SeatType;
      selectTrain.from_no = this.props.selectTrain.DepartStationNo;
      selectTrain.to_no = this.props.selectTrain.ArriveStationNo;
      selectTrain.select_fz_code = this.props.selectTrain.DepartStationCode;
      selectTrain.select_dz_code = this.props.selectTrain.ArriveStationCode;
      selectTrain.select_yp = this.props.selectSeat.SeatInventory;

      //乘客分类处理
      const adult = this.props.passengers.filter(i => !i.age);
      const child = this.props.passengers.filter(i => i.age);
      let adultsName = [], adultsPass = [], adultsPic = [];
      let childrenName = [], childrenPass = [], childrenPic = [];
      adult.forEach( i => {
        adultsName.push(i.name);
        adultsPass.push(i.passport);
        adultsPic.push('');
      });
      child.forEach( i => {
        childrenName.push(i.name);
        childrenPass.push(i.passport);
        childrenPic.push('');
      });
      this.props.ajaxOrder({
        //火车订单信息
        fromSSmobile: JSON.stringify([selectTrain]),
        //乘客和联系人信息
        SpecialRequest: '!-REACT-手机订单-!',
        url: this.props.orderUrl,
        fullname: lName,
        email: lEmail,
        phone: lPhone,
        Nationality: lNationId,
        passenerno: adult.length,
        guestName: adultsName,
        guestpassport: adultsPass,
        passPic: adultsPic,
        passenerno_chd: child.length,
        guestNameCHD: childrenName,
        guestpassportCHD: childrenPass,
        passPicCHD: childrenPic,
        //下面是固定选项
        changeseat: 1,
        changetrain: 1,
        isDelivery: 'my',
        gender: 100002,
        email1: '',
        data_type: 'mobile',
        ticketclass_1: ''
      });
      //显示轻提示
      Toast.info(<Loading text={this.props.lang.loadingText}/>, 0);
    } else {
      //console.log('验证失败禁止提交!');
    }
  }

  goBack = () => {
    this.updateLinkman();
    this.props.history.push('/book');
  }

  selectNation = (value) => {
    const lName = document.getElementById('lName').value;
    const lEmail = document.getElementById('lEmail').value;
    const lNation = value[0];
    const lPhone = document.getElementById('lPhone').value;
    //更新联系人信息
    this.props.setLinkman({
      name: lName,
      email: lEmail,
      nation: lNation[0],
      nationId: lNation[1],
      phone: lPhone,
    });
  }

  render() {
    //console.log("🔥 TrainBookLinkman.render()");
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
          <div id="guestinfo">
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
          </div>
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
            <Picker data={this.props.lang.nations} cols={1} onOk={(value) => this.selectNation(value)} okText={this.props.lang.okText} dismissText={this.props.lang.searchCancel} extra="">
              <List.Item className="imgAutoList">
                <InputItem placeholder={this.props.lang.nationPlaceholder} editable={false} id="lNation" error={this.state.lNationError} onErrorClick={() => alert(this.props.lang.lNation)} value={this.props.linkman ? this.props.linkman.nation : null} data-ref={this.props.linkman ? this.props.linkman.nationId : null}>
                  {this.props.lang.nationText}
                </InputItem>
              </List.Item>
            </Picker>
            <List.Item className="imgAutoList">
              <InputItem placeholder={this.props.lang.phonePlaceholder} id="lPhone" error={this.state.lPhoneError} onErrorClick={() => alert(this.props.lang.lPhone)} defaultValue={this.props.linkman ? this.props.linkman.phone : null}>
                {this.props.lang.phoneText}
              </InputItem>
            </List.Item>
          </List>
          <List renderHeader={this.props.lang.totalTitle + this.props.lang.priceMarkBegin + this.props.totalFee + this.props.lang.priceMarkAfter} id="payDiv3">
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
  orderUrl: store.get('orderUrl'),
  orderState: store.get('orderState'),
  totalFee: store.get('totalFee'),
});

const mapDispatchToProps = (dispatch) => ({
  setLinkman: (linkman) => dispatch(setLinkman(linkman)),
  setNoSearch: (noSearch) => dispatch(setNoSearch(noSearch)),
  ajaxOrder: (data) => dispatch(ajaxOrder(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainBookLinkman);
