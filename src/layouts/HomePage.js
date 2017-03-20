import React from "react"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import HeaderBar from "../components/HeaderBar"
import SearchCity from "../components/SearchCity"
import DateInput from "../components/DateInput"

const Home = (props) => 
  <div>
    <HeaderBar logo="home"/>
    <SearchCity />
    <DateInput />
  </div>

export default Home