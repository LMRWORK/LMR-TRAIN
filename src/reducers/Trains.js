import initStates from '../store/Trains'
import moment from 'moment';

const trainReducer = (state=initStates, action) => {
  switch(action.type) {

    case 'SET_STATIONS_TXT':
      return state.set('stationsTxt', action.stationsTxt);
      break;

    case 'SET_FROM_STATION':
      return state.set('fromStation', action.station);
      break;

    case 'SET_TO_STATION':
      return state.set('toStation', action.station);
      break;

    case 'SET_START_DATE':
      return state.set('startDate', action.moment);
      break;

    case 'SET_TRAINS_RESULT':
      return state.set('trainsResult', action.json);
      break;

    case 'SORT_BY_RUNTIME':
      let rs1 = state.get('trainsResult');
      rs1.result.sort(
        (a, b) => {
          return a.RunTime - b.RunTime;
        }
      );
      return state.set('trainsResult', rs1);
      break;

    case 'SORT_BY_STARTTIME':
      let rs2 = state.get('trainsResult');
      rs2.result.sort(
        (a, b) => {
          return moment(a.DepartTime, "HH:mm").unix() - moment(b.DepartTime, "HH:mm").unix();
        }
      );
      return state.set('trainsResult', rs2);
      break;

    default:
      return state;
  }
}

export default trainReducer