import React from "react"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import HeaderBar from "../components/HeaderBar"
import CityInput from "../components/CityInput"

const TrainCity = (props) => 
  <div>
    <HeaderBar logo="undo"/>
    <CityInput />
  </div>

export default TrainCity