import React from 'react';
import ReactDom from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import { List, WingBlank, WhiteSpace, Radio, Flex, InputItem, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { setSelectSeat, setPassengers } from '../actions/Trains';

const RadioItem = Radio.RadioItem;
const FlexItem = Flex.Item;
//乘客信息模板
const passengerInfo = {
  age: null,       // 0 成人，1 儿童
  name:null,      // 姓名
  passport:null,  // 护照
  ok:false,       // 是否填写完成
  showAdd: true,  // 是否显示增加按钮
}

class TrainForm extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      lastAction: 'init', //用于记录复杂页面的操作历史
      modalVisible: false,
      ageText: [this.props.lang.adultText, this.props.lang.childText],
      passengerId: null,
    };
    //初始化乘客列表并放入store
    this.props.passengers || this.props.setPassengers([Object.assign({}, passengerInfo)]);
    console.log('😃 TrainForm ');
    console.log(props);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainForm.componentWillReceiveProps');
    console.log(nextProps);
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
               i.ok != nextProps.passengers[id].ok;
      });
    }

    //对比最后操作，更新store，优化性能
    return passengerStatus ||
           nextState.lastAction == 'addOne' ||
           nextState.lastAction == 'subOne' ||
           this.state.lastAction != nextState.lastAction;
  }

  //选择座位
  onSelectSeat = (seat) => {
    this.props.setSelectSeat(seat);
    this.setState({lastAction: 'onSelectSeat'+seat.SeatCode});
  }

  //添加一名乘客
  addOne = (id) => {
    //之前的所有乘客框下不现实增加按钮
    this.props.passengers.forEach(i => {i.showAdd = false});

    //增加一名乘客
    this.props.passengers.push(Object.assign({}, passengerInfo));

    //动画滚动预先处理：指定容器高度
    let passWapper = ReactDom.findDOMNode(this.refs.passWapper);
    passWapper.style.height = (450 * this.props.passengers.length) + 'px';
    window.scrollTo(0, 370 * this.props.passengers.length);

    console.log('addOne', this.props.passengers);

    this.setState({lastAction: 'addOne'});
  }

    //减少一名乘客
  subOne = (id) => {
    //减少一名乘客
    this.props.passengers.splice(id, 1); 

    //动画滚动预先处理：指定容器高度
    let passWapper = ReactDom.findDOMNode(this.refs.passWapper);
    passWapper.style.height = (450 * this.props.passengers.length) + 'px';
    window.scrollTo(0, 370 * this.props.passengers.length);

    console.log('subOne', this.props.passengers);

    this.setState({lastAction: 'subOne'});
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
      lastAction: 'hideModal'+this.state.passengerId,
    });
  }

  onSelectAge = (age) => {
    //passengers是mutable的。
    this.props.passengers[this.state.passengerId].age = age;
    this.setState({
      modalVisible: false,
      lastAction: 'onSelectAge'+this.state.passengerId,
    });
  }

  onClickAge = (id) => {
    this.setState({
      modalVisible: true,
      passengerId: id,
      lastAction: 'onClickAge'+id,
    });
  }
  
  onInputDone = (text, type, id) => {
    if (text) {
      if (type == 'name') {
        this.props.passengers[id].name = text;
      } else if (type == 'passport') {
        this.props.passengers[id].passport = text;
      }
      this.setState({lastAction: 'onInputDone'});
    }
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
            selectSeatCode = this.props.selectSeat.SeatCode;
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
        {this.props.selectTrain.SeatList.map(i => (
          <RadioItem key={i.SeatCode} checked={selectSeatCode === i.SeatCode} onChange={() => this.onSelectSeat(i)} disabled={i.SeatInventory === 0}>
            <Flex>
              <FlexItem>{i.SeatName}</FlexItem>
              <FlexItem>{this.props.lang.priceMarkBegin}{i.SeatPrice}{this.props.lang.pricemarkAfter} <span className="bookSmall">{this.props.lang.perPerson}</span></FlexItem>
              <FlexItem>{i.SeatInventory} <span className="bookSmall">{this.props.lang.leavingTiket}</span></FlexItem>
            </Flex>
          </RadioItem>
        ))}
        </List>
        <div ref="passWapper" style={{overflow:'hidden'}}>
          <QueueAnim className="passWrap" type="bottom" duration="500">
          {this.props.passengers && this.props.passengers.map( (i, id) => 
            <List key={id} renderHeader={this.props.lang.passText+(id+1)+': '+this.props.lang.passengerText}>
              <InputItem placeholder={this.props.lang.agePlaceholder} editable={false} value={i.age!==null ? this.state.ageText[i.age] : null} onClick={() => this.onClickAge(id)}>
                {this.props.lang.ageText}
              </InputItem>
              <InputItem clear placeholder={this.props.lang.namePlaceholder} onBlur={(text) => this.onInputDone(text, 'name', id)}>
                {this.props.lang.nameText}
              </InputItem>
              <InputItem clear placeholder={this.props.lang.passportPlaceholder} onBlur={(text) => this.onInputDone(text, 'passport', id)}>
                {this.props.lang.passportText}
              </InputItem>
              <List.Item className="passBtn">
                { i.showAdd ?
                  <div className="addOne" onClick={() => this.addOne(id)}>
                    <img src={this.props.lang.addIcon} className="addOneIcon"/>
                    {this.props.lang.addOneText}
                  </div>
                  :
                  <div className="subOne" onClick={() => this.subOne(id)}>
                    <img src={this.props.lang.subIcon} className="subOneIcon"/>
                    {this.props.lang.subOneText}
                  </div>
                }
              </List.Item>
            </List>
          )}
          </QueueAnim>
        </div>
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
});

const mapDispatchToProps = (dispatch) => ({
  setSelectSeat: (seat) => dispatch(setSelectSeat(seat)),
  setPassengers: (passengers) => dispatch(setPassengers(passengers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainForm);
