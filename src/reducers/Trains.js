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
      let list1 = state.get('trainsResult');
      // 对需要排序的数字和位置的临时存储
      let mapped1 = list1.result.map((el, i) => {
        return { index: i, value: el };
      });
      // 按照多个值排序数组
      mapped1.sort((a, b) => {
        return a.value.RunTime - b.value.RunTime;
      });
      // 根据索引得到排序的结果
      list1.result = mapped1.map((el) => {
        return list1.result[el.index];
      });
      return state.set('trainsResult', list1);
      break;

    //按发车时间排序。
    case 'SORT_BY_STARTTIME':
      let list2 = state.get('trainsResult');
      // 对需要排序的数字和位置的临时存储
      let mapped2 = list2.result.map((el, i) => {
        return { index: i, value: el };
      });
      // 按照多个值排序数组
      mapped2.sort((a, b) => {
        return moment(a.value.DepartTime, "HH:mm").unix() - moment(b.value.DepartTime, "HH:mm").unix();
      });
      // 根据索引得到排序的结果
      list2.result = mapped2.map((el) => {
        return list2.result[el.index];
      });
      return state.set('trainsResult', list2);
      break;

    //按最低可预定价格排序。
    case 'SORT_BY_PRICE':
      let list3 = state.get('trainsResult');
      // 对需要排序的数字和位置的临时存储
      let mapped3 = list3.result.map((el, i) => {
        return { index: i, value: el };
      });
      // 按照多个值排序数组
      mapped3.sort((a, b) => {
        return a.value.cheapSeat.SeatPrice - b.value.cheapSeat.SeatPrice;
      });
      // 根据索引得到排序的结果
      list3.result = mapped3.map((el) => {
        return list3.result[el.index];
      });
      return state.set('trainsResult', list3);
      break;

    default:
      return state;
  }
}

export default trainReducer