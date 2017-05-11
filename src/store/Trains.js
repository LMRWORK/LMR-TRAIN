import { Map } from 'immutable';

const store = Map({
  stationsTxt: '',
  fromStation: {cn:'北京', code:'BJP', en:'Beijing'},
  toStation : {cn:'上海', code:'SHH', en:'Shanghai'},
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
});

export default store;