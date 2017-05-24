import queryString from 'query-string';
import moment from 'moment';
//对旧版浏览器的fetch、promise兼容性
//import promise from 'es6-promise';
//promise.polyfill();
import 'whatwg-fetch';

//正在抓取车站文本
export const gettingStationsTxt = () => ({
  type: 'GETTING_STATIONS_TXT'
});

//存放车站文本到store
export const setStationsTxt = (stationsTxt) => ({
  type: 'SET_STATIONS_TXT',
  stationsTxt
});

//异步抓取车站文本
export const fetchStationsTxt = (url) => {
  return (dispatch) => {
    dispatch(gettingStationsTxt());
    //异步Ajax请求
    fetch(url)
      .then((res) => {
        //从返回的Promise里得到文本
        return res.text()
      })
      .then((text) => {
        //拿到文本，然后dispatch action
        //模拟ajax延时
        setTimeout(() => dispatch(setStationsTxt(text)), 200);
      });
  }
};

//设置搜索发站
export const setFromStation = (station) => ({
  type: 'SET_FROM_STATION',
  station
});

//设置搜索到站
export const setToStation = (station) => ({
  type: 'SET_TO_STATION',
  station
});

//设置出发日期
export const setStartDate = (moment) => ({
  type: 'SET_START_DATE',
  moment
});

//正在搜索火车
export const gettingTrainsResult = () => ({
  type: 'GETTING_TRAINS_RESULT'
});

//设置过滤条件
export const setTrainsResult = (json) => ({
  type: 'SET_TRAINS_RESULT',
  json
});

//设置搜索结果
export const setSelectedTab = (filterType) => ({
  type: 'SET_SELECTED_TAB',
  filterType
});

//设置点选的站点
export const setSelectTrain = (train) => ({
  type: 'SET_SELECT_TRAIN',
  train
});

//设置已选位置
export const setSelectSeat = (seat) => ({
  type: 'SET_SELECT_SEAT',
  seat
});

//异步抓取车站文本
export const fetchTrains = (url, fromStation, toStation, startDate) => {
  const data = {
    from: fromStation.code,
    to: toStation.code,
    date: startDate.format('YYYY-MM-DD'),
  };
  /** 生产环境使用POST
  const postHeader = {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: queryString.stringify(data),
  };
  **/
  return (dispatch) => {
    dispatch(gettingTrainsResult());
    //异步Ajax请求
    fetch(url+'?'+queryString.stringify(data))
      .then((res) => {
        //从返回的Promise里得到文本
        return res.json();
      })
      .then((json) => {
        //拿到文本，然后dispatch action

        /**
        模拟ajax延时，并随机重置'运行时间'，方便测试。
        json.result[0].RunTime = Math.ceil(Math.random()*100);
        */
        let t = moment();
        json.result.forEach(i => {
          i.cheapSeat.SeatPrice = 50 + Math.ceil(Math.random()*2000);
          i.SeatList[0].SeatPrice = i.cheapSeat.SeatPrice;
          t.minute(Math.ceil(Math.random()*60));
          t.hour(Math.ceil(12 + Math.random()*24))
          i.RunTime = t.format('HH:mm');
          t.minute(Math.ceil(Math.random()*60));
          t.hour(Math.ceil(Math.random()*24))
          i.DepartTime = t.format('HH:mm');
          t.minute(Math.ceil(Math.random()*60));
          t.hour(Math.ceil(Math.random()*24))
          i.ArriveTime = t.format('HH:mm');
        });
        /**
        生产环境注释掉上面测试
        */

        setTimeout(() => dispatch(setTrainsResult(json)), 400);
      });
  }
};

//按运行时间排序
export const sortByRunTime = () => ({
  type: 'SORT_BY_RUNTIME',
});

//按出发时间排序
export const sortByStartTime = () => ({
  type: 'SORT_BY_STARTTIME',
});

//按出发时间排序
export const sortByPrice = () => ({
  type: 'SORT_BY_PRICE',
});