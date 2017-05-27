import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { List, NavBar, Flex, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import TrainForm from '../components/TrainForm';

class TrainBook extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
    console.log('😃 TrainBook ');
    console.log(props);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainBook.componentWillReceiveProps');
    console.log(nextProps);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainBook.shouldComponentUpdate');
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
          <div className="bookPage" key="4">
            <NavBar iconName={null} leftContent={[<img className="chtBack" src={this.props.lang.backIcon}/>,this.props.lang.navibarLeftBack]} mode="dark" onLeftClick={() => this.props.history.push('/search')}>
              <h1 id="TrainIndex-h1">{this.props.lang.bookNaviBar}</h1>
            </NavBar>
            <List renderHeader={this.props.lang.bookinfo}>
              <List.Item thumb={this.props.lang.trainIcon}> 
                <Flex>
                  <Flex.Item className="bItem bTrainText">{this.props.lang.trainText}</Flex.Item>
                  <Flex.Item className="bItem bTrain">{this.props.selectTrain.TrainCode}</Flex.Item>
                  <Flex.Item className="bItem bTime">{this.props.lang.needTime} {this.props.selectTrain.RunTime}</Flex.Item>
                </Flex>
              </List.Item>
              <List.Item thumb={this.props.lang.cityIcon}> 
                <Flex>
                  <Flex.Item className="bItem bFrom">{this.props.selectTrain.DepartStation}</Flex.Item>
                  <Flex.Item className="bItem bFromTime">{this.props.selectTrain.DepartTime}</Flex.Item>
                  <Flex.Item className="bItem bFromDate">{this.props.startDate.format('LL')}</Flex.Item>
                </Flex>
              </List.Item>
              <List.Item thumb={this.props.lang.cityIcon}> 
                <Flex>
                  <Flex.Item className="bItem bTo">{this.props.selectTrain.ArriveStation}</Flex.Item>
                  <Flex.Item className="bItem bToTime">{this.props.selectTrain.ArriveTime}</Flex.Item>
                  <Flex.Item className="bItem bToDate">{this.props.arriveDate.format('LL')}</Flex.Item>
                </Flex>
              </List.Item>
            </List>
            <TrainForm />
            <List renderHeader={this.props.lang.totalTitle} id="payDiv">
              <List.Item thumb={this.props.lang.totalPriceIcon}>
                <Flex>
                  <Flex.Item className="bItem bTotal">{this.props.lang.priceMarkBegin}965{this.props.lang.priceMarkAfter}</Flex.Item>
                  <Flex.Item className="bItem bPay">
                    <Button className="btn" type="primary">
                      {this.props.lang.bookNpay}
                    </Button>
                  </Flex.Item>
                </Flex>
              </List.Item>
            </List>
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
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TrainBook);
