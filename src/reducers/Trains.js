import store from '../store/Trains'

const defaultReducer = (state=store, action) => {
  switch(action.type) {
    case 'CHOOSE_DATE':
      return state.set('searchDate', action.searchDate)
    case 'CHOOSE_FROM_STATION':
      return state.set('fromStation', action.fromStation)
    case 'CHOOSE_TO_STATION':
      return state.set('toStation', action.toStation)
    case 'SWAP_SEARCH_STATION':
      state = state.set('fromStation', action.toStation)
      return state.set('toStation', action.fromStation)
    case 'FETCH_STATIONS_TEXT':
      return state.set('stationsText', action.stationsText)
    default:
      return state;
  }
}

export default defaultReducer