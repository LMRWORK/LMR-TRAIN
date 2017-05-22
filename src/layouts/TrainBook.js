import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { List, NavBar, Toast, TabBar, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';

class TrainBook extends React.PureComponent {

  constructor(props) {
    super(props);
    this.clientHeight = document.documentElement.clientHeight;
    this.state = {
      action: 'init', //用于记录复杂页面的操作历史
    };
    console.log('😃 TrainBook ');
    console.log(props);
  }

  componentDidMount = () => {
    
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainBook.componentWillReceiveProps');
    console.log(nextProps);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainBook.shouldComponentUpdate');
    return true;
  }
 
  render() {
    console.log("🔥 TrainBook.render()");
    return (
      <div>
        <QueueAnim className="router-wrap" type="scaleX">
          <div className="trainPage" key="4" style={{height: this.clientHeight}}>
            <NavBar iconName={null} leftContent={this.props.lang.navibarLeftBack} mode="light" onLeftClick={() => this.props.history.push('/search')}>
              <h1 id="TrainIndex-h1">{this.props.lang.bookNaviBar}</h1>
            </NavBar>
            <List renderHeader={this.props.lang.bookinfo}>
              <List.Item> 
                <div className="flex-box">
                  <div className="flex-item flex-grow-1">
                    <div className="flex-box">
                      <div className="flex-item">北京南</div>
                      <div className="flex-item">07:35</div>
                      <div className="flex-item">05-24, 周三</div>
                    </div>
                  </div>
                  <div className="flex-item flex-grow-2">
                    <div className="flex-box">
                      <div className="flex-item">G105</div>
                      <div className="flex-item">-- 时刻表 --</div>
                      <div className="flex-item">耗时5小时</div>
                    </div>
                  </div>
                  <div className="flex-item flex-grow-1">
                    <div className="flex-box">
                      <div className="flex-item">北京南</div>
                      <div className="flex-item">07:35</div>
                      <div className="flex-item">05-24, 周三</div>
                    </div>
                  </div>
                </div>
              </List.Item>
            </List>
          </div>
        </QueueAnim>
        <div id="TrainIndex-tabbar-div">
          <TabBar barTintColor="white">
            {this.props.lang.indexTabBar.map( 
              i => <TabBar.Item title={i.name} key={i.name} icon={<div/>}/>
            )}
          </TabBar>
        </div>
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
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TrainBook);
