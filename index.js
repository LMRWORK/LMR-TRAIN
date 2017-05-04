import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/reducers/Trains';
import App from './src/app/Trains';

//车站名文本：Acheng|Acheng|阿城|ACB|3141@Acheng|Acheng|阿城|ACB|3141
import './src/resources/data/stations.txt';

const store = createStore(reducer/*, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/);
const el = document.createElement('div');
document.body.appendChild(el);

render(
  (
    <Provider store={store}>
      <div>
        <App/>
      </div>
    </Provider>
  ),el
);