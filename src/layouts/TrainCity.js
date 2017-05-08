import React from 'react';
import { NavBar, List, InputItem, WingBlank, WhiteSpace, TabBar, Icon } from 'antd-mobile';
import { Link } from 'react-router-dom';

class TrainCity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trainsNavibarTitle: '中国火车票预定',
      trainsNavibarLeft: '返回',
      trainsNavibarRight: '帮助',
      tips: '温馨提示：办理购票、改签和退票业务时，请不晚于开车前48小时.',
      cityIcon: '/public/img/city.png',
    };
    //console.log('TrainCity =>');
    //console.log(props);
  }

  render() {
    return (
      <div>
        <NavBar iconName={null} leftContent={this.state.trainsNavibarLeft} mode="light" onLeftClick={() => history.go(-1)}>
          <h1 id="TrainIndex-h1">{this.state.trainsNavibarTitle}</h1>
        </NavBar>
      </div>
    );
  }
}

export default TrainCity;
