import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { List, NavBar, Toast, TabBar, WingBlank, WhiteSpace, Radio, Flex, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { setSelectSeat } from '../actions/Trains';

const RadioItem = Radio.RadioItem;
const FlexItem = Flex.Item;

class TrainBook extends React.PureComponent {

  constructor(props) {
    super(props);
    this.clientHeight = document.documentElement.clientHeight; //fix弹出输入框造成的高度变化
    this.state = {
      lastAction: 'init', //用于记录复杂页面的操作历史
      sexPickData: [
        {label: this.props.lang.adultText, value: 'adult'}, 
        {label: this.props.lang.childText, value: 'child'}
      ],
    };
    console.log('😃 TrainBook ');
    console.log(props);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainBook.componentWillReceiveProps');
    console.log(nextProps);
  }

  onChange = (seat) => {
    this.props.setSelectSeat(seat);
  }

  addOne = () => {
    console.log('addOne');
  }

  onSelectAge = () => {
    console.log('onSelectAge');
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
      <div>
        <QueueAnim className="router-wrap" type="top">
          <div className="trainPage" key="4">
            <NavBar iconName={null} leftContent={[<img className="chtBack" src={this.props.lang.backIcon}/>,this.props.lang.navibarLeftBack]} mode="light" onLeftClick={() => this.props.history.push('/search')}>
              <h1 id="TrainIndex-h1">{this.props.lang.bookNaviBar}</h1>
            </NavBar>
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
                <RadioItem key={i.SeatCode} checked={selectSeatCode === i.SeatCode} onChange={() => this.onChange(i)} disabled={i.SeatInventory === 0}>
                  <Flex>
                    <FlexItem>{i.SeatName}</FlexItem>
                    <FlexItem>{this.props.lang.priceMarkBegin}{i.SeatPrice}{this.props.lang.pricemarkAfter} <span className="bookSmall">{this.props.lang.perPerson}</span></FlexItem>
                    <FlexItem>{i.SeatInventory} <span className="bookSmall">{this.props.lang.leavingTiket}</span></FlexItem>
                  </Flex>
                </RadioItem>
              ))}
              </List>
              <List renderHeader={this.props.lang.passengerText}>
                <InputItem placeholder={this.props.lang.agePlaceholder} editable={false} onClick={this.onSelectAge}>
                  {this.props.lang.ageText}
                </InputItem>
                <InputItem clear placeholder={this.props.lang.namePlaceholder}>
                  {this.props.lang.nameText}
                </InputItem>
                <InputItem clear placeholder={this.props.lang.passportPlaceholder}>
                  {this.props.lang.passportText}
                </InputItem>
                <List.Item>
                  <div className="addOne" onClick={this.addOne}>
                    <img src={this.props.lang.addIcon} className="addOneIcon"/>
                    {this.props.lang.addOneText}
                  </div>
                </List.Item>
              </List>
            </div>
          </div>
          <div id="TrainIndex-tabbar-div">
            <TabBar barTintColor="white">
              {this.props.lang.indexTabBar.map( 
                i => <TabBar.Item title={i.name} key={i.name} icon={<div/>}/>
              )}
            </TabBar>
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
  selectSeat: store.get('selectSeat')
});

const mapDispatchToProps = (dispatch) => ({
  setSelectSeat: (seat) => dispatch(setSelectSeat(seat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainBook);
