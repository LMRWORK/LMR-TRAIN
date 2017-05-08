import React from 'react';
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import TrainIndex from '../layouts/TrainIndex';
import TrainCity from '../layouts/TrainCity';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import '../resources/css/TrainIndex.css';
import '../resources/css/Motion.css';
import '../resources/png/city.png';
import '../resources/png/date.png';

class Trains extends React.Component {

  constructor(props) {
  super(props);
  this.state = {};
  //console.log('TrainsApp =>');
  //console.log(props);
  }

  routes = (props) => {

    //传递redux和router的值
    const location = props.location;

    //页面路由表
    const componentArray = [
      { to: '/index', component: TrainIndex, name: 'index' },
      { to: '/city', component: TrainCity, name: 'city' },
    ];

    //使用当前path遍历路由表，转化取出对应的组件
    const component = componentArray.map(item => {
      if (location.pathname === item.to) {
      return item.component;
      }
    }).filter(item => item)[0];

    //首页路由
    const homeRoute = () => (
      <Redirect to="/index"/>
    );

    return (
      <div>
        <Route exact path="/" render={homeRoute} />
        <CSSTransitionGroup transitionName="page" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
          <Route location={location} key={location.pathname} path={location.pathname} component={component} />
        </CSSTransitionGroup>
      </div>
    );
  }

  render() {
    return (
      <Router>
        <Route render={this.routes} />
      </Router>
      /*
      <Router>
        <CSSTransitionGroup transitionName="page" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
          <Route path="/index" key="index" component={TrainIndex}/>
          <Route path="/city" key="city" component={TrainCity}/>
          <Redirect to="/index"/>
        </CSSTransitionGroup>
      </Router>
      */
    );
  }

}

export default Trains;