import initStates from '../store/Trains'
import moment from 'moment';

const trainReducer = (state=initStates, action) => {
  switch(action.type) {

    //设置车站文本。
    case 'SET_STATIONS_TXT':
      return state.set('stationsTxt', action.stationsTxt);
      break;

    //设置出发站。
    case 'SET_FROM_STATION':
      return state.set('fromStation', action.station);
      break;

    //设置目的站。
    case 'SET_TO_STATION':
      return state.set('toStation', action.station);
      break;

    //设置出发时间。
    case 'SET_START_DATE':
      return state.set('startDate', action.moment);
      break;

    //设置抓取的火车车次+价格数据。
    case 'SET_TRAINS_RESULT':
      return state.set('trainsResult', action.json);
      break;

    //按运行时间排序。
    case 'SORT_BY_RUNTIME':
      let rs1 = state.get('trainsResult');
      rs1.result.sort(
        (a, b) => {
          return a.RunTime - b.RunTime;
        }
      );
      return state.set('trainsResult', rs1);
      break;

    //按发车时间排序。
    case 'SORT_BY_STARTTIME':
      let rs2 = state.get('trainsResult');
      rs2.result.sort(
        (a, b) => {
          return moment(a.DepartTime, "HH:mm").unix() - moment(b.DepartTime, "HH:mm").unix();
        }
      );
      return state.set('trainsResult', rs2);
      break;

    //按最低可预定价格排序。
    case 'SORT_BY_PRICE':
      let rs3 = state.get('trainsResult');
      rs3.result.sort(
        (a, b) => {
          return a.cheapSeat.SeatPrice - b.cheapSeat.SeatPrice;
        }
      );
      return state.set('trainsResult', rs3);
      break;

    default:
      return state;
  }
}

export default trainReducer