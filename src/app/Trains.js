import React from 'react';
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import TrainIndex from '../layouts/TrainIndex';
import TrainCity from '../layouts/TrainCity';

import '../resources/css/TrainIndex.css';
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
        <Route location={location} key={location.pathname} path={location.pathname} component={component} />
      </div>
    );
  }

  render() {
    return (
      <Router>
        <Route render={this.routes} />
      </Router>
    );
 }

}

export default Trains;