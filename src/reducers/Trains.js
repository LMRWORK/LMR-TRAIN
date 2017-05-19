import initStates from '../store/Trains'

const trainReducer = (state=initStates, action) => {
  switch(action.type) {
    case 'SET_STATIONS_TXT':
      return state.set('stationsTxt', action.stationsTxt);
    case 'SET_FROM_STATION':
      return state.set('fromStation', action.station);
    case 'SET_TO_STATION':
      return state.set('toStation', action.station);
    case 'SET_START_DATE':
      return state.set('startDate', action.moment);
    case 'SET_TRAINS_RESULT':
      return state.set('trainsResult', action.json);
    case 'SORT_BY_RUNTIME':
      let rs = state.get('trainsResult');
      //console.log(rs);
      rs.result.sort(
        (a, b) => {
          return a.RunTime - b.RunTime;
        }
      );
      return state.set('trainsResult', rs);;
    default:
      return state;
  }
}

export default trainReducer