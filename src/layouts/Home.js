import React from "react"
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import HeaderBar from "../components/HeaderBar"
import SearchCity from "../components/SearchCity"

const Home = (props) => 
  <div>
    <HeaderBar logo="home"/>
    <SearchCity />
  </div>

export default Home