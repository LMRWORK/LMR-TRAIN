import React from "react"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import HeaderBar from "../components/HeaderBar"
import AutoCompleteCity from "../components/AutoCompleteCity"

const CityPage = (props) => (
  <div>
    <HeaderBar logo="undo"/>
    <AutoCompleteCity />
  </div>
);

export default CityPage;