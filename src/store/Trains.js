import { Map } from 'immutable';
import moment from 'moment';
//初始化store
const initStates = Map({
  //[全局 states]
  stationsTxt: null,
  startDate: moment(),
  trainsResult: null,
  fromStation: {cn:'北京', code:'BJP', en:'Beijing'},
  toStation : {cn:'上海', code:'SHH', en:'Shanghai'},
  selectTrain: null,
  arriveDate: null, //抵达日期需要出发日期和运行时间计算得出。
  selectSeat: null,
  passengers: null, //乘客列表（对象数组）
  selectedTab: 'sortByRunTime',
  noSearch: false, //从book页跳回搜索页时，仅一次有效。
  //[全局 api] - /public/data 模拟接口返回数据，生产环境请替换成对应的接口。
  stationsUrl: '/public/data/stations.txt',
  fetchTrainsUrl: '/public/data/fetchTrain.txt',
  //[城市选择页 layout/TrainCity.js]
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
  //[多语言支持 language]
  lang: {
    //[全局 图片，上线后请替换成cdn图源]
    cityIcon: '/public/img/city.png',
    dateIcon: '/public/img/date.png',
    seatIcon: '/public/img/seat-O.png',
    seatO2Icon: '/public/img/seat-O2.png',
    priceIcon: '/public/img/p7.png',
    rightIcon: '/public/img/rw.png',
    trainIcon: '/public/img/t1.png',
    longArrIcon: '/public/img/lr1.png',
    backIcon: '/public/img/back-w.png',
    addIcon: '/public/img/add.png',
    subIcon: '/public/img/sub.png',
    moreIcon: '/public/img/more.png',
    lessIcon: '/public/img/less.png',
    passIcon: '/public/img/pass.png',
    nameIcon: '/public/img/name.png',
    ageIcon: '/public/img/age.png',
    //[全局 language]
    navibarTitle: '中国火车票预定',
    navibarRight: '帮助',
    navibarLeftIndex: '首页',
    navibarLeftBack: '返回',
    searchPlaceholder: '搜索',
    searchCancel: '取消',
    okText: '确定',
    loadingText: '加载中...',
    fromStationLabel: '出发地',
    toStationLabel: '目的地',
    tips: '温馨提示：办理购票、改签和退票业务时，请不晚于开车前48小时。',
    datepickerLabel: '出发日',
    datepickerTitle: '选择日期',
    datepickerExtra: '请选择',
    searchTxt: '查询',
    priceMarkBegin: '¥', //货币前缀
    priceMarkAfter: '',   //货币后缀
    //[首页 layout/TrainIndex.js]
    indexTabBar: [
      {name: '注意事项'},
      {name: '关于我们'},
    ],
    //[搜索页 layout/TrainSearch.js]
    prevDate: '前一天',
    nextDate: '后一天',
    searchTabBar: [
      {name: '出发:早>晚', data:'sortByStartTime'},
      {name: '耗时:短>长', data:'sortByRunTime'},
      {name: '价格:低>高', data:'sortByPrice'},
    ], 
    //[表单页 layout/TrainBook.js]
    bookNaviBar: '订单填写',
    trainText: '车次',
    bookinfo: '预定后，我们会在24小时内通过邮件联系您。',
    needTime: '历时',
    selectSeatText: '请选择您的座位：',
    passengerText: '请填写乘客的姓名和护照：',
    passText: '乘客',
    nameText: '姓名',
    namePlaceholder: '例如：达康书记',
    passportPlaceholder: '例如：AFS19750218',
    passportText: '护照',
    leavingTiket: '剩余',
    perPerson: '/人',
    addOneText: '添加乘客',
    subOneText: '删除乘客',
    adultText: '成人',
    childText: '儿童',
    ageModalTitle: '请确认乘客年龄',
    ageTips: '请注意：只有身高小于1.5米的儿童，享受儿童票价。',
    ageText: '年龄',
    agePlaceholder: '例如：成人/儿童',
    totalTitle: '价格合计：',
    bookNpay: '下单 & 支付',
  },
});

export default initStates;