import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TrainIndex from '../layouts/TrainIndex';
import TrainCity from '../layouts/TrainCity';
import TrainSearch from '../layouts/TrainSearch';
import TrainBook from '../layouts/TrainBook';
import TrainBookLinkman from '../layouts/TrainBookLinkman';
import TrainThankyou from '../layouts/TrainThankyou';

export const routes = (props) => {

  //传递redux和router的值
  const location = props.location;

  //页面路由表
  const componentArray = [
    { to: '/', component: TrainIndex, name: 'index' },
    { to: '/city', component: TrainCity, name: 'city' },
    { to: '/search', component: TrainSearch, name: 'search' },
    { to: '/book', component: TrainBook, name: 'search' },
    { to: '/booklinkman', component: TrainBookLinkman, name: 'booklinkman' },
    { to: '/thankyou', component: TrainThankyou, name: 'thankyou' }
  ];

  //使用当前path遍历路由表，转化取出对应的组件
  const component = componentArray.filter(i => {
    if (location.pathname === i.to) {
      return true;
    }
  })[0].component;

  //动画API参考文档：https://motion.ant.design/api/queue-anim
  return (
    <Route location={location} key={location.key} path={location.pathname} component={component} />
  );

}
