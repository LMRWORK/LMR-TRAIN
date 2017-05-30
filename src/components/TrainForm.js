import React from 'react';
import ReactDom from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import { List, WingBlank, WhiteSpace, Radio, Flex, InputItem, Modal, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { setSelectSeat, setPassengers, setTotalPrice } from '../actions/Trains';

const alert = Modal.alert;
const RadioItem = Radio.RadioItem;
//乘客信息模板 mutable类型
const passengerInfo = {
  age: null,       // 0 成人，1 儿童
  name:null,      // 姓名
  passport:null,  // 护照
  ageError:false,        // 是否填写年龄
  nameError:false,       // 是否填写姓名
  passportError:false,   // 是否填写护照
  showAdd: true,  // 是否显示增加按钮
  showSub: false, // 是否显示减少按钮
  price: 0,
}

class TrainForm extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      lastAction: 'init', //用于记录复杂页面的操作历史
      modalVisible: false,
      ageText: [this.props.lang.adultText, this.props.lang.childText],
      passengerId: null,
      tmp: '',
    };
    //初始化乘客列表并放入store
    this.props.passengers || this.props.setPassengers([Object.assign({}, passengerInfo)]);
    console.log('😃 TrainForm', props);
  }

  componentDidMount = () => {
    console.log('TrainForm.componentDidMount');
    //计算价格
    this.props.setTotalPrice();
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainForm.componentWillReceiveProps', nextProps);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainForm.shouldComponentUpdate');
    //console.log(nextProps.passengers);
    //console.log(this.props.passengers);

    //对比乘客数据，优化性能
    let passengerStatus = true;
    if (this.props.passengers) {
      passengerStatus = this.props.passengers.every((i, id) => {
        return i.age != nextProps.passengers[id].age && 
               i.name != nextProps.passengers[id].name && 
               i.passport != nextProps.passengers[id].passport && 
               i.ageError != nextProps.passengers[id].ageError && 
               i.nameError != nextProps.passengers[id].nameError && 
               i.passportError != nextProps.passengers[id].passportError;
      });
    }

    //对比最后操作，更新store，优化性能
    return passengerStatus ||
           nextState.lastAction == 'addOne' ||
           nextState.lastAction == 'subOne' ||
           this.state.lastAction != nextState.lastAction ||
           this.state.tmp != nextState.tmp;
  }

  //选择座位
  onSelectSeat = (seat) => {
    console.log('TrainForm.onSelectSeat', seat);
    this.props.setSelectSeat(seat);
    this.setState({lastAction: 'onSelectSeat'+seat.SeatCode});
    //计算价格
    this.props.setTotalPrice();
  }

  //添加一名乘客
  addOne = (id) => {
    
    //增加一名乘客
    const newPassenger = Object.assign({}, passengerInfo);
    this.props.passengers.push(newPassenger);
    //按钮显示逻辑
    const len = this.props.passengers.length;
    this.props.passengers.forEach((i, idx) => {
      if (idx == 0 && len == 1) {
        i.showAdd = true;
        i.showSub = false;
      } else if (idx == len-1) {
        i.showAdd = true;
        i.showSub = true;
      } else {
        i.showAdd = false;
        i.showSub = true;
      }
    });

    //动画滚动预先处理：指定容器高度
    let passWapper = ReactDom.findDOMNode(this.refs.passWapper);
    passWapper.style.height = (450 * this.props.passengers.length) + 'px';
    window.scrollTo(0, 370 * this.props.passengers.length);
    this.setState({lastAction: 'addOne'});
    //计算价格
    this.props.setTotalPrice();
  }

  //减少一名乘客
  subOne = (id) => {
    //减少一名乘客
    this.props.passengers.splice(id, 1); 
    //按钮显示逻辑
    const len = this.props.passengers.length;
    this.props.passengers.forEach((i, idx) => {
      if (idx == 0 && len == 1) {
        i.showAdd = true;
        i.showSub = false;
      } else if (idx == len-1) {
        i.showAdd = true;
        i.showSub = true;
      } else {
        i.showAdd = false;
        i.showSub = true;
      }
    });

    //动画滚动预先处理：指定容器高度
    let passWapper = ReactDom.findDOMNode(this.refs.passWapper);
    passWapper.style.height = (450 * this.props.passengers.length) + 'px';
    window.scrollTo(0, 370 * this.props.passengers.length);
    this.setState({lastAction: 'subOne'});
    //计算价格
    this.props.setTotalPrice();
  }

  //隐藏age modal
  hideModal = () => {
    this.setState({
      modalVisible: false,
      lastAction: 'hideModal'+this.state.passengerId,
    });
  }

  //点击显示age modal
  onClickAge = (id) => {
    this.setState({
      modalVisible: true,
      passengerId: id,
      lastAction: 'onClickAge'+id,
    });
  }

  onSelectAge = (age) => {
    //passengers是mutable的。
    this.props.passengers[this.state.passengerId].age = age;
    this.setState({
      modalVisible: false,
      lastAction: 'onSelectAge'+this.state.passengerId,
    });
    this.props.passengers[this.state.passengerId].ageError = false;
    //计算价格
    this.props.setTotalPrice();
  }
  
  //输入姓名
  onNameInput = (value, id) => {
    this.props.passengers[id].name = value;
    this.setState({tmp: value});
    if (value) {
      this.props.passengers[id].nameError = false;
    } else {
      this.props.passengers[id].nameError = true;
    }
  }

  //输入护照
  onPassportInput = (value, id) => {
    this.props.passengers[id].passport = value;
    this.setState({tmp: value});
    if (value) {
      this.props.passengers[id].passportError = false;
    } else {
      this.props.passengers[id].passportError = true;
    }
  }

  //点击预定按钮
  onBook = () => {
    this.props.passengers.forEach(i => {
      i.age!==null ? i.ageError = false : i.ageError = true;
      i.name ? i.nameError = false : i.nameError = true;
      i.passport ? i.passportError = false : i.passportError = true;
    })
    this.setState({lastAction: 'onBook'});
    console.log('TrainBook.onBook', this.props.passengers);
  }

  onErrorClick = (warnText) => {
    alert(warnText)
  } 

  render() {
    console.log("🔥 TrainForm.render()");
    //体验优化：如果点选过座位，则保持已选择过的座位类型。
    let selectSeatCode = null;
    if (this.props.selectSeat) {
      this.props.selectTrain.SeatList.every(
        i => {
          if (i.SeatInventory > 0 && i.SeatCode == this.props.selectSeat.SeatCode) {
            selectSeatCode = i.SeatCode;
            this.props.setSelectSeat(i);
            return false;
          } else {
            return true;
          }
        }
      );
    }
    //体验优化：默认勾选邮票的第一个座位。
    if (!selectSeatCode) {
      this.props.selectTrain.SeatList.every(
        i => {
          if (i.SeatInventory > 0) {
            selectSeatCode = i.SeatCode;
            this.props.setSelectSeat(i);
            return false;
          } else {
            return true;
          }
        }
      );
    }
    return (
      <div>
        <List renderHeader={this.props.lang.selectSeatText}>
        { this.props.selectTrain.SeatList.map(i => (
          <RadioItem thumb={this.props.lang.seatO2Icon} key={i.SeatCode} checked={ selectSeatCode == i.SeatCode} onChange={() => this.onSelectSeat(i)} disabled={i.SeatInventory === 0}>
            <Flex>
              <Flex.Item className="flex-grow-7">{i.SeatName}</Flex.Item>
              <Flex.Item className="flex-grow-5">{this.props.lang.priceMarkBegin}{i.SeatPrice}{this.props.lang.priceMarkAfter} <span className="bookSmall">{this.props.lang.perPerson}</span></Flex.Item>
              <Flex.Item className="flex-grow-6">{i.SeatInventory} <span className="bookSmall">{this.props.lang.leavingTiket}</span></Flex.Item>
            </Flex>
          </RadioItem>
        ))}
        </List>
        <div ref="passWapper" style={{overflow:'hidden', height:441 * (this.props.passengers ? this.props.passengers.length : 1) }}>
          <QueueAnim className="passWrap" type="bottom" duration="1000">
          {this.props.passengers && this.props.passengers.map( (i, id) => 
            <List key={id} renderHeader={this.props.lang.passText+(id+1)+': '+this.props.lang.passengerText}>
              <List.Item thumb={this.props.lang.ageIcon} className="imgAutoList">
                <InputItem placeholder={this.props.lang.agePlaceholder} editable={false} value={i.age!==null ? this.state.ageText[i.age] : null} onClick={() => this.onClickAge(id)} style={{paddingLeft:0}} error={i.ageError} onErrorClick={() => this.onErrorClick('请填写乘客年龄。')}>
                  {this.props.lang.ageText}
                </InputItem>
              </List.Item>
              <List.Item thumb={this.props.lang.nameIcon} className="imgAutoList">
                <InputItem thumb={this.props.lang.nameIcon} placeholder={this.props.lang.namePlaceholder} value={this.props.passengers[id].name} onChange={(value) => this.onNameInput(value, id)} style={{paddingLeft:0}} error={i.nameError} onErrorClick={() => this.onErrorClick('请填写乘客姓名。')}>
                  {this.props.lang.nameText}
                </InputItem>
              </List.Item>
              <List.Item thumb={this.props.lang.passIcon} className="imgAutoList">
                <InputItem thumb={this.props.lang.passIcon} placeholder={this.props.lang.passportPlaceholder} value={this.props.passengers[id].passport} onChange={(value) => this.onPassportInput(value, id)} style={{paddingLeft:0}} error={i.passportError} onErrorClick={() => this.onErrorClick('请填写乘客护照号。')}>
                  {this.props.lang.passportText}
                </InputItem>
              </List.Item>
              <List.Item className="passBtn">
                <Flex>
                  {i.showSub ?
                  <Flex.Item className="subOne" onClick={() => this.subOne(id)}>
                    <img src={this.props.lang.subIcon} className="subOneIcon"/>
                    {this.props.lang.subOneText}
                  </Flex.Item> :''}
                  {i.showAdd ?
                  <Flex.Item className="addOne" onClick={() => this.addOne(id)}>
                    <img src={this.props.lang.addIcon} className="addOneIcon"/>
                    {this.props.lang.addOneText}
                  </Flex.Item> :''}
                </Flex>
              </List.Item>
            </List>
          )}
          </QueueAnim>
        </div>
        <List renderHeader={this.props.lang.totalTitle} id="payDiv">
          <List.Item thumb={this.props.lang.totalPriceIcon}>
            <Flex>
              <Flex.Item className="bItem bTotal">{this.props.lang.priceMarkBegin}{this.props.totalPrice}{this.props.lang.priceMarkAfter}</Flex.Item>
              <Flex.Item className="bItem bPay">
                <Button className="btn" type="primary" onClick={this.onBook}>
                  {this.props.lang.bookNpay}
                </Button>
              </Flex.Item>
            </Flex>
          </List.Item>
        </List>
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
  selectSeat: store.get('selectSeat'),
  passengers: store.get('passengers'),
  selectTrain: store.get('selectTrain'),
  totalPrice: store.get('totalPrice'),
});

const mapDispatchToProps = (dispatch) => ({
  setSelectSeat: (seat) => dispatch(setSelectSeat(seat)),
  setPassengers: (passengers) => dispatch(setPassengers(passengers)),
  setTotalPrice: () => dispatch(setTotalPrice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainForm);
