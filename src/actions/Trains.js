import queryString from 'query-string';
//对旧版浏览器的fetch、promise兼容性
import promise from 'es6-promise';
promise.polyfill();

//正在抓取车站文本
export const gettingStationsTxt = () => ({
  type: 'GETTING_STATIONS_TXT'
})

//存放车站文本到store
export const setStationsTxt = (stationsTxt) => ({
  type: 'SET_STATIONS_TXT',
  stationsTxt
})

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
        setTimeout(() => dispatch(setStationsTxt(text)), 1000);
      });
  }
}

//设置搜索发站
export const setFromStation = (station) => ({
  type: 'SET_FROM_STATION',
  station
})

//设置搜索到站
export const setToStation = (station) => ({
  type: 'SET_TO_STATION',
  station
})

//设置搜索日期
export const setStartDate = (moment) => ({
  type: 'SET_START_DATE',
  moment
})

//正在抓取车站文本
export const gettingTrainsResult = () => ({
  type: 'GETTING_TRAINS_RESULT'
})

//正在抓取车站文本
export const setTrainsResult = (json) => ({
  type: 'SET_TRAINS_RESULT',
  json
})

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
        //模拟ajax延时
        setTimeout(() => dispatch(setTrainsResult(json)), 1000);
      });
  }
}