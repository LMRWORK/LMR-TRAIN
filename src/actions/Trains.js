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
        //拿到文本，然后dispatch setStationsTxt
        dispatch(setStationsTxt(text));
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
export const setSorterTab = (sorterType) => ({
  type: 'SET_SORTER_TAB',
  sorterType
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

//设置总价格
export const setTotalPrice = () => ({
  type: 'SET_TOTAL_PRICE',
});

//异步抓取车站文本
export const fetchTrains = (url, fromStation, toStation, startDate) => {
  const data = {
    from: fromStation.code,
    to: toStation.code,
    date: startDate.format('YYYY-MM-DD'),
  };
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
        //console.log(json);
        dispatch(setTrainsResult(json));
      });
  }
};

//异步提交订单
export const ajaxOrder = (data) => {
  //使用POST
  const postHeader = {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: queryString.stringify(data, {arrayFormat: 'bracket'}),
  };
  return (dispatch) => {
    //异步Ajax请求
    fetch(data.url, postHeader)
      .then((res) => {
        //从返回的Promise里得到文本
        return res.json();
      })
      .then((json) => {
        //拿到文本后设置订单状态
        dispatch(setOrderResult(json));
      });
  }
};

//按运行时间排序
export const setOrderResult = (orderState) => ({
  type: 'SET_ORDER_RESULT',
  orderState,
});

//按运行时间排序
export const sortByRunTime = () => ({
  type: 'SORT_BY_RUNTIME',
});

//按出发时间排序
export const sortByStartTime = () => ({
  type: 'SORT_BY_STARTTIME',
});

//按价格排序
export const sortByPrice = () => ({
  type: 'SORT_BY_PRICE',
});

//筛选条件：高铁、发车时段
export const setFilterType = (filterType, act) => ({
  type: 'SET_FILTER_TYPE',
  filterType,
  act,
});

//筛选条件：高铁、发车时段
export const runFilter = () => ({
  type: 'RUN_FILTER',
});

//设置乘客列表
export const setPassengers = (passengers) => ({
  type: 'SET_PASSENGERS',
  passengers
});

//设置返回不重新搜索的标志
export const setNoSearch = (noSearch) => ({
  type: 'SET_NOSEARCH',
  noSearch
});

//设置联系人信息
export const setLinkman = (linkman) => ({
  type: 'SET_LINKMAN',
  linkman
});

//设置联系人国籍选项状态
export const setLinkmanNation = (nation) => ({
  type: 'SET_LINKMAN_NATION',
  nation
});