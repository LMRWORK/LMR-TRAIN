import { Map } from 'immutable';

//初始化store
const initStates = Map({
  //[全局 states]
  stationsTxt: null,
  startDate: null,
  fromStation: {cn:'北京', code:'BJP', en:'Beijing'},
  toStation : {cn:'上海', code:'SHH', en:'Shanghai'},
  //[多语言支持 language]
  lang: {
    //[全局 language]
    NavibarTitle: '中国火车票预定',
    NavibarRight: '帮助',
    NavibarLeftIndex: '首页',
    NavibarLeftBack: '返回',
    searchPlaceholder: '搜索',
    loadingText: '加载中...',
    fromStationLabel: '出发地',
    toStationLabel: '目的地',
    tips: '温馨提示：办理购票、改签和退票业务时，请不晚于开车前48小时。',
    datepickerLabel: '出发日',
    datepickerTitle: '选择日期',
    datepickerExtra: '请选择',
    searchTxt: '查询',
    cityIcon: '/public/img/city.png',
    dateIcon: '/public/img/date.png',
    //[全局 fecthApi] - /public/data 模拟接口返回数据，生产环境请替换成对应的接口。
    stationsUrl: '/public/data/stations.txt',
    fetchTrainsUrl: '/public/data/fetchTrain.data',
    //[首页 layout/TrainIndex.js]
    tabBar: [
      {name: '注意事项', url:''},
      {name: '关于我们', url:''},
    ],
    //[搜索页 layout/TrainCity.js]
    stationsArrInit: [
      {cn:'北京', code:'BJP', en:'Beijing'}, 
      {cn:'上海', code:'SHH', en:'Shanghai'},
      {cn:'天津', code:'TJP', en:'Tianjin'},
      {cn:'重庆', code:'CQW', en:'Chongqing'},
      {cn:'长沙', code:'CSQ', en:'Changsha'},
      {cn:'成都', code:'CDW', en:'Chengdu'},
      {cn:'福州', code:'FZS', en:'Fuzhou'},
      {cn:'广州', code:'GZQ', en:'Guangzhou'},
      {cn:'杭州', code:'HZH', en:'Hangzhou'},
      {cn:'济南', code:'JNK', en:'Jinan'},
      {cn:'昆明', code:'KMM', en:'Kunming'},
    ],
  },
});

export default initStates;