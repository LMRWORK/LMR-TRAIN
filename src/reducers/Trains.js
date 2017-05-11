import initStates from '../store/Trains'

const trainReducer = (state=initStates, action) => {
  switch(action.type) {
    case 'SET_STATIONS_TXT':
      return state.set('stationsTxt', action.stationsTxt);
    case 'SET_FROM_STATION':
      return state.set('fromStation', action.station)
    case 'SET_TO_STATION':
      return state.set('toStation', action.station)
    default:
      return state;
  }
}

export default trainReducer