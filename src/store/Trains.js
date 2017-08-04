import { Map } from 'immutable';
import moment from 'moment';

//初始化moment的语言包。
switch (document.domain) {
  case 'www.arachina.com':
    moment.locale('ja');
    break;
  case 'www.viaje-a-china.com':
    moment.locale('es');
    break;
  case 'www.voyageschine.com':
    moment.locale('fr');
    break;
  case 'www.viaggio-in-cina.it':
    moment.locale('it');
    break;
  case 'www.chinahighlights.ru':
    moment.locale('ru');
    break;
  default:
    moment.locale('it');
}

//初始化store
const initStates = Map({
  //[全局 states]
  stationsTxt: null,
  startDate: moment().add(1, 'd'),
  trainsResult: null,
  fromStation: {cn:'北京', code:'BJP', en:'Beijing'},
  toStation : {cn:'上海', code:'SHH', en:'Shanghai'},
  selectTrain: null,
  arriveDate: null, //抵达日期需要出发日期和运行时间计算得出。
  selectSeat: null,
  passengers: null, //乘客列表（对象数组）
  linkman: null, //联系人（对象）
  orderState: null, //表单提交后的响应
  sorterTab: null, //默认排序:sortByStartTime, sortByRunTime, sortByPrice
  noSearch: false, //从book页跳回搜索页时，仅一次有效。
  totalPrice: 0, //价格合计
  totalFee: 0, //手续费合计
  //[全局 api] - /public/data 模拟接口返回数据，生产环境请替换成对应的接口。
  stationsUrl: '/public/data/stations.txt',
  //fetchTrainsUrl: '/public/data/fetchTrain.txt',
  fetchTrainsUrl: 'http://202.103.68.62:9093/index.php/tools/tt/',
  //表单提交
  //orderUrl: 'https://www.arachina.com/orders/train_thankyou/',
  orderUrl: 'http://202.103.68.62:9093/orders/train_thankyou/',
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
  filterType: [], //过滤条件数组：highSpeed、slowSpeed、time0006、time0612、time1218、time1824
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
    moreIcon: '/public/img/more2.png',
    lessIcon: '/public/img/less2.png',
    passIcon: '/public/img/pass.png',
    nameIcon: '/public/img/name.png',
    ageIcon: '/public/img/age.png',
    totalPriceIcon: '/public/img/p1.png',
    filterIcon: '/public/img/filter-w.png',
    refreshIcon: '/public/img/refresh-w.png',
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
    datepickerTitle: '', //日历选择框标题，语言文字长的推介留空
    datepickerExtra: '请选择',
    searchTxt: '查询',
    priceMarkBegin: '¥', //货币前缀
    priceMarkAfter: '',   //货币后缀
    //datepicker
    datepicker: {
      okText: '確認',
      dismissText: 'キャンセル',
      year: '年',
      month: '月',
      day: '日',
      hour: '時',
      minute: '分'
    },
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
    filterText: '筛选',
    pullFlush: '上滑刷新数据',
    selloutText: '无票',
    selloutAlert: '已无票，请选择其他车次',
    //[表单页 layout/TrainBook.js]
    bookNaviBar: '填写订单',
    checkNaviBar: '确认订单信息',
    trainText: '车次',
    bookinfo: '预定后，我们会在24小时内通过邮件联系您。',
    needTime: '历时',
    selectSeatText: '请选择您的座位：',
    passengerText: '请填写乘客的姓名和护照：',
    passText: '乘客',
    nameText: '姓名',
    emailText: '邮箱',
    nationText: '国家',
    phoneText: '手机',
    namePlaceholder: '例如：达康书记',
    emailPlaceholder: '例如：jobs@outlook.com',
    nationPlaceholder: '例如：中国',
    phonePlaceholder: '例如：86-13768741352',
    passportPlaceholder: '例如：AFS19750218',
    passportText: '护照',
    leavingTiket: '剩余',
    perPerson: '/人',
    addOneText: '添加乘客',
    subOneText: '删除乘客',
    adultText: '成人',
    childText: '儿童',
    ageModalTitle: '请确认乘客年龄',
    ageTips: '注意：身高小于1.5米的儿童，享受儿童折扣：坐票1/2，卧铺3/4。',
    ageText: '年龄',
    agePlaceholder: '例如：成人/儿童',
    totalTitle: '价格合计，包含含卡费和服务费：',
    nextStepLinker: '下一步',
    bookNpay: '下单',
    bookTips: '*为了保证您的预定有效，请尽快完成付款，付款后会在24小时内帮您锁定车次。',
    requiredAge: '请填写乘客年龄。',
    requiredName: '请填写乘客姓名。',
    requiredPassport: '请填写乘客护照号。',
    detailText: '详细',
    startDateText: '发车日期',
    endDateText: '抵达日期',
    checkTrainText: '请仔细确认列车信息。',
    checkPersonText: '请仔细确认乘客信息。',
    linkmanHead: '请填写联系人信息，我们会在24小时内联系您。',
    'lName': '请填写联系人的姓名。',
    'lEmail': '请填写联系人的Email：jobs@facebook.com。',
    'lNation': '请填写联系人的国籍。',
    'lPhone': '请填写联系人的联系手机。',
    'chooseNationText': '选择国籍',
    'tryAgainText': '请重新提交',
    'nations': [
      { label: '日本', value: ['日本', 2] },
      { label: '中国', value: ['中国', 1] },
      { label: 'その他', value: ['その他', 0] },
    ],
  },
});

export default initStates;