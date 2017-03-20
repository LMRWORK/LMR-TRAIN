import { Map } from 'immutable'

const store = Map({
  searchDate: new Date(new Date().getTime()+3600000*24*2),
  fromStation: 'Beijing',
  toStation: 'Shanghai',
  stationsText: ''
});

export default store