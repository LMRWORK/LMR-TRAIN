import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/reducers/Trains';
import thunk from 'redux-thunk';
import TrainApp from './src/app/Trains';

//兼容无 Object.assign() 的旧浏览器
import objectAssignPolyfill from './src/util/objectAssignPolyfill';
objectAssignPolyfill();
//兼容 promise
//require('es6-promise').polyfill();
//require('es6-promise/auto');

//开发模式
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

//打包png目录的所有图片
let requireContext = require.context("./src/assets/png", true, /^\.\/.*\.png$/);
requireContext.keys().map(requireContext);

//生产模式
const store = createStore(reducer, applyMiddleware(thunk));

//高清模式兼容
/*
if (window.innerWidth <= 750) {
  var oMeta = document.getElementsByTagName('meta')[2];
  oMeta.content = "width=device-width,user-scalable=no,initial-scale=1,maximum-scale=0.48,minimum-scale=0.48";
}
*/

render(
  (
    <Provider store={store}>
      <TrainApp/>
    </Provider>
  ), document.getElementById('root')
);