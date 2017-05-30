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

    //设置抓取的火车车次+价格数据。
    case 'SET_SELECT_TRAIN':
      let runTimeArr = action.train['RunTime'].split(':');
      let departTimeArr = action.train['DepartTime'].split(':');
      if (runTimeArr.length == 2 && departTimeArr.length == 2) {
        const startDate = state.get('startDate');
        startDate.set({
          hours: departTimeArr[0],
          minutes: departTimeArr[1],
        })
        let arriveDate = startDate.clone().add({
          hours: runTimeArr[0],
          minutes: runTimeArr[1],
        });
        return state.set('selectTrain', action.train).set('startDate', startDate).set('arriveDate', arriveDate);
      }
      break;

    //按运行时间排序。
    case 'SORT_BY_RUNTIME':
      let list1 = state.get('trainsResult');
      // 对需要排序的数字和位置的临时存储
      let mapped1 = list1.result.map((el, i) => {
        return { index: i, value: moment(el.RunTime, "HH:mm").unix() };
      });
      // 按照多个值排序数组
      mapped1.sort((a, b) => {
        return a.value - b.value;
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
        return { index: i, value: moment(el.DepartTime, "HH:mm").unix() };
      });
      // 按照多个值排序数组
      mapped2.sort((a, b) => {
        return a.value - b.value;
      });
      // 根据索引得到排序的结果
      list2.result = mapped2.map((el) => {
        return list2.result[el.index];
      });
      return state.set('trainsResult', list2);
      break;

    //设置排序状态。
    case 'SET_SORTER_TAB':
      return state.set('sorterTab', action.sorterType);

    //设置已选座位。
    case 'SET_SELECT_SEAT':
      return state.set('selectSeat', action.seat);

    //设置乘客列表。
    case 'SET_PASSENGERS':
      return state.set('passengers', action.passengers);

    //设置总价格。
    case 'SET_TOTAL_PRICE':
      let price = 0;
      const selectSeat = state.get('selectSeat');
      const passengers = state.get('passengers');
      console.log('SET_TOTAL_PRICE', selectSeat, passengers);
      passengers.forEach(i => {
        if (i.age == 0 || i.age == null) {
          price += selectSeat.SeatPrice;
        } else {
          price += selectSeat.SeatPrice*0.5;
        }
      })
      return state.set('totalPrice', Math.ceil(price));

    //不重新搜索的标志。
    case 'SET_NOSEARCH':
      return state.set('noSearch', action.noSearch);

    //按最低可预定价格排序。
    case 'SORT_BY_PRICE':
      let list3 = state.get('trainsResult');
      // 对需要排序的数字和位置的临时存储
      let mapped3 = list3.result.map((el, i) => {
        return { index: i, value: el.cheapSeat.SeatPrice };
      });
      // 按照多个值排序数组
      mapped3.sort((a, b) => {
        return a.value - b.value;
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