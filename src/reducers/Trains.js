import store from '../store/Trains'

const trainReducer = (state=store, action) => {
  switch(action.type) {
    case 'SET_STATIONS_TXT':
      return state.set('stationsTxt', action.stationsTxt)
    default:
      return state;
  }
}

export default trainReducer