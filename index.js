import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/reducers/Trains';
import thunk from 'redux-thunk';
import TrainApp from './src/app/Trains';


const store = createStore(reducer, applyMiddleware(thunk) /*, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/);

render(
  (
    <Provider store={store}>
        <TrainApp/>
    </Provider>
  ), document.getElementById('root')
);