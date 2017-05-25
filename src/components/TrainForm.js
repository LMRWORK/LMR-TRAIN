import React from 'react';
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
}

class TrainBook extends React.PureComponent {

  constructor(props) {
    super(props);
    this.clientHeight = document.documentElement.clientHeight; //fix弹出输入框造成的高度变化
    this.state = {
      lastAction: 'init', //用于记录复杂页面的操作历史
      modalVisible: false,
      ageText: [this.props.lang.adultText, this.props.lang.childText],
      passengerId: null,
    };
    //初始化乘客列表并放入store
    this.props.passengers || this.props.setPassengers([passengerInfo]);
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
           this.state.lastAction != nextState.lastAction;
  }

  onSelectSeat = (seat) => {
    this.props.setSelectSeat(seat);
    this.setState({lastAction: 'onSelectSeat'+seat.SeatCode});
  }

  addOne = () => {
    console.log('addOne');
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
    if (type == 'name') {
      this.props.passengers[id].name = text;
    } else if (type == 'passport') {
      this.props.passengers[id].passport = text;
    }
    this.setState({lastAction: 'onInputDone'});
  }

  render() {
    console.log("🔥 TrainBook.render()");
    //没有数据路由到搜索页
    if (!this.props.selectTrain) {
      this.props.history.push('/search');
      return false;
    }
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
      <div style={{overflow:'scroll', height:this.clientHeight-180}}>
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
        {this.props.passengers && this.props.passengers.map( (i, id) => 
          <List renderHeader={this.props.lang.passengerText}>
            <InputItem placeholder={this.props.lang.agePlaceholder} editable={false} value={i.age!==null ? this.state.ageText[i.age] : null} onClick={() => this.onClickAge(id)}>
              {this.props.lang.ageText}
            </InputItem>
            <InputItem clear placeholder={this.props.lang.namePlaceholder} defaultValue={i.name} onBlur={(text) => this.onInputDone(text, 'name', id)}>
              {this.props.lang.nameText}
            </InputItem>
            <InputItem clear placeholder={this.props.lang.passportPlaceholder} defaultValue={i.passport} onBlur={(text) => this.onInputDone(text, 'passport', id)}>
              {this.props.lang.passportText}
            </InputItem>
            <List.Item>
              <div className="addOne" onClick={this.addOne}>
                <img src={this.props.lang.addIcon} className="addOneIcon"/>
                {this.props.lang.addOneText}
              </div>
            </List.Item>
          </List>
        )}
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
