import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin'
import HomePage from './src/layouts/HomePage'
import DatePickPage from './src/layouts/DatePickPage'
import SearchCityPage from './src/layouts/SearchCityPage'
import reducer from './src/reducers/Trains';

//MaterialIcons-Regular.woff -> https://fonts.googleapis.com/icon?family=Material+Icons
import './src/resources/css/font.css'
import './src/resources/css/calendar.css'
import './src/resources/font/MaterialIcons-Regular.woff'
import './src/resources/data/stations.txt'

injectTapEventPlugin()

const store = createStore(reducer/*, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/)
const el = document.createElement('div')
document.body.appendChild(el)

render(
  (
    <Provider store={store}>
      <Router hashType="noslash">
        <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/calendar" component={DatePickPage}/>
          <Route path="/search-city/:id" component={SearchCityPage}/>
        </div>
      </Router>
    </Provider>
  ),el
)