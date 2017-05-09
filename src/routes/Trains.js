import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Route, Redirect } from 'react-router-dom';
import TrainIndex from '../layouts/TrainIndex';
import TrainCity from '../layouts/TrainCity';

export const routes = (props) => {

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

  //首页跳转
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