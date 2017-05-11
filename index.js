import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/reducers/Trains';
import thunk from 'redux-thunk';
import TrainApp from './src/app/Trains';

//开发模式
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

//生产模式
const store = createStore(reducer, applyMiddleware(thunk));

render(
  (
    <Provider store={store}>
        <TrainApp/>
    </Provider>
  ), document.getElementById('root')
);