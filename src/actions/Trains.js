export const setStationsTxt = (stationsText) => ({
  type: 'SET_STATIONS_TXT',
  payload: stationsText
})

export const fetchStationsTxt = (url) => {
  return (dispatch) => {
    //异步Ajax请求
    fetch(url)
      .then((res) => {
        //从返回的Promise里得到文本
        return res.text()
      })
      .then((text) => {
        //从Json里拿到数据再去Dispatch Action
        dispatch(setStationsTxt(text))
        //console.log(text);
      })
  }
}