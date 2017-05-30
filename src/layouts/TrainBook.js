import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { WingBlank, WhiteSpace, List, NavBar, Flex, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import TrainForm from '../components/TrainForm';
import { setNoSearch } from '../actions/Trains';

class TrainBook extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      lastAction: 'init',
      showDetailFromTime: false,
      showDetailToTime: false,
    };
    console.log('😃 TrainBook', props);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainBook.componentWillReceiveProps', nextProps);
  }

  componentDidMount = () => {
    //从表单页返回时，不刷新结果。
    this.props.setNoSearch(true);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainBook.shouldComponentUpdate');
    //console.log(nextProps.passengers);
    //console.log(this.props.passengers);
    return true;
  }

  //显示发车时间
  showDetailFromTime = () => {
    this.state.showDetailFromTime ? this.setState({showDetailFromTime: false}) : this.setState({showDetailFromTime: true});
  }

  //显示抵达时间
  showDetailToTime = () => {
    this.state.showDetailToTime ? this.setState({showDetailToTime: false}) : this.setState({showDetailToTime: true});
  }

  //点击预定按钮
  onBook = () => {
    console.log('onBook');
  }

  render() {
    console.log("🔥 TrainBook.render()");
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
          <List renderHeader={this.props.lang.bookinfo} id="trainInfo">
            <List.Item thumb={this.props.lang.trainIcon}> 
              <Flex>
                <Flex.Item className="bItem bTrainText">{this.props.lang.trainText}</Flex.Item>
                <Flex.Item className="bItem bTrain">{this.props.selectTrain.TrainCode}</Flex.Item>
                <Flex.Item className="bItem bTime">{this.props.lang.needTime} {this.props.selectTrain.RunTime}</Flex.Item>
              </Flex>
            </List.Item>
            <List.Item thumb={this.props.lang.cityIcon} onClick={this.showDetailFromTime}> 
              <Flex>
                <Flex.Item className="bItem bFrom">{this.props.selectTrain.DepartStation}</Flex.Item>
                <Flex.Item className="bItem bFromTime">{this.props.selectTrain.DepartTime}
                  <a className="detailTime">详细 
                    { this.state.showDetailFromTime ? <img className="moreIcon" src={this.props.lang.lessIcon}/> : <img className="moreIcon" src={this.props.lang.moreIcon}/> }
                  </a>
                </Flex.Item>
              </Flex>
            </List.Item>
            { this.state.showDetailFromTime ?
            <QueueAnim className="router-wrap" type="right">
              <List.Item thumb={this.props.lang.dateIcon} key="a1"> 
                <Flex>
                  <Flex.Item className="bItem bFrom2">发车日期</Flex.Item>
                  <Flex.Item className="bItem bFromDate2">{this.props.startDate.format('LLLL')}</Flex.Item>
                </Flex>
              </List.Item> 
            </QueueAnim>: ''}
            <List.Item thumb={this.props.lang.cityIcon} onClick={this.showDetailToTime}> 
              <Flex>
                <Flex.Item className="bItem bTo">{this.props.selectTrain.ArriveStation}</Flex.Item>
                <Flex.Item className="bItem bToTime">{this.props.selectTrain.ArriveTime}
                  <a className="detailTime">详细 
                    { this.state.showDetailToTime ? <img className="moreIcon" src={this.props.lang.lessIcon}/> : <img className="moreIcon" src={this.props.lang.moreIcon}/> }
                  </a>
                </Flex.Item>
              </Flex>
            </List.Item>
            { this.state.showDetailToTime ?
            <QueueAnim className="router-wrap" type="right">
              <List.Item thumb={this.props.lang.dateIcon} key="b1"> 
                <Flex>
                  <Flex.Item className="bItem bTo2">抵达日期</Flex.Item>
                  <Flex.Item className="bItem bToDate2">{this.props.arriveDate.format('LLLL')}</Flex.Item>
                </Flex>
              </List.Item>
            </QueueAnim>: ''}
          </List>
          <TrainForm />
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
          <WhiteSpace/>
          <WingBlank>* 弊社にてお席が確保できましたら、お支払い案内のメールをお送りします。</WingBlank>
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
});

const mapDispatchToProps = (dispatch) => ({
  setNoSearch: (noSearch) => dispatch(setNoSearch(noSearch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainBook);
