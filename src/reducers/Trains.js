import initStates from '../store/Trains'
import moment from 'moment';

const trainReducer = (state=initStates, action) => {
  let list;
  let filter_array;
  let mapped;
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
      list = state.get('trainsResult');
      // 对需要排序的数字和位置的临时存储
      mapped = list.result.map((el, i) => {
        return { index: i, value: moment(el.RunTime, "HH:mm").unix() };
      });
      // 按照多个值排序数组
      mapped.sort((a, b) => {
        return a.value - b.value;
      });
      // 根据索引得到排序的结果
      list.result = mapped.map((el) => {
        return list.result[el.index];
      });
      return state.set('trainsResult', list);
      break;

    //按发车时间排序。
    case 'SORT_BY_STARTTIME':
      list = state.get('trainsResult');
      // 对需要排序的数字和位置的临时存储
      mapped = list.result.map((el, i) => {
        return { index: i, value: moment(el.DepartTime, "HH:mm").unix() };
      });
      // 按照多个值排序数组
      mapped.sort((a, b) => {
        return a.value - b.value;
      });
      // 根据索引得到排序的结果
      list.result = mapped.map((el) => {
        return list.result[el.index];
      });
      return state.set('trainsResult', list);
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
      list = state.get('trainsResult');
      // 对需要排序的数字和位置的临时存储
      mapped = list.result.map((el, i) => {
        return { index: i, value: el.cheapSeat.SeatPrice };
      });
      // 按照多个值排序数组
      mapped.sort((a, b) => {
        return a.value - b.value;
      });
      // 根据索引得到排序的结果
      list.result = mapped.map((el) => {
        return list.result[el.index];
      });
      return state.set('trainsResult', list);
      break;

    //设置过滤条件 highSpeed、time0060，time0612、time1218、time1824
    case 'SET_FILTER_TYPE':
      filter_array = state.get('filterType');
      //添加或删除过滤条件
      switch (action.act) {
        case 'add':
          if (filter_array.indexOf(action.filterType) == -1) {
            filter_array.push(action.filterType);
          }
          break;
        case 'delete':
          filter_array = filter_array.filter(i => i != action.filterType);
          break;
        default:
          filter_array = [];
      }
      console.log('SET_FILTER_TYPE', filter_array);
      return state.set('filterType', filter_array);

    //执行过滤：通过放置显示标识来完成，提高效率。
    case 'RUN_FILTER':
      filter_array = state.get('filterType');
      console.log('RUN_FILTER', filter_array);
      if (filter_array.length) {
        let t, t1, t2;
        list = state.get('trainsResult');
        list.result.forEach(i => {
          //高铁
          if (filter_array.indexOf('highSpeed') != -1) {
            if (['G', 'D', 'C'].indexOf(i.TrainType) != -1) {
              i.display = 'inherit';
            } else {
              i.display = 'none';
            }
          }
          //普通列车
          if (filter_array.indexOf('slowSpeed') != -1) {
            if (['G', 'D', 'C'].indexOf(i.TrainType) == -1) {
              i.display = 'inherit';
            } else {
              i.display = 'none';
            }
          }
          //00:00-06:00 发车
          if (filter_array.indexOf('time0006') != -1) {
            t = moment(i.DepartTime, 'HH:mm');
            t1 = moment('00:00', 'HH:mm');
            t2 = moment('06:00', 'HH:mm');
            //diff
            if (t.diff(t1) >= 0 && t.diff(t2) <= 0) {
              i.display = 'inherit';
            } else {
              i.display = 'none';
            }
          }
          //06:00-12:00 发车
          if (filter_array.indexOf('time0612') != -1) {
            t = moment(i.DepartTime, 'HH:mm');
            t1 = moment('06:00', 'HH:mm');
            t2 = moment('12:00', 'HH:mm');
            //diff
            if (t.diff(t1) >= 0 && t.diff(t2) <= 0) {
              i.display = 'inherit';
            } else {
              i.display = 'none';
            }
          }
          //12:00-18:00 发车
          if (filter_array.indexOf('time1218') != -1) {
            t = moment(i.DepartTime, 'HH:mm');
            t1 = moment('12:00', 'HH:mm');
            t2 = moment('18:00', 'HH:mm');
            //diff
            if (t.diff(t1) >= 0 && t.diff(t2) <= 0) {
              i.display = 'inherit';
            } else {
              i.display = 'none';
            }
          }
          //18:00-24:00 发车
          if (filter_array.indexOf('time1824') != -1) {
            t = moment(i.DepartTime, 'HH:mm');
            t1 = moment('18:00', 'HH:mm');
            t2 = moment('24:00', 'HH:mm');
            //diff
            if (t.diff(t1) >= 0 && t.diff(t2) <= 0) {
              i.display = 'inherit';
            } else {
              i.display = 'none';
            }
          }
        });
        return state.set('trainsResult', list);
      }

    default:
      return state;
  }
}

export default trainReducer