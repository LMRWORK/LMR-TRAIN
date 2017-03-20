export const chooseDate = (searchDate) => {
  return {
    type: 'CHOOSE_DATE',
    searchDate
  }
}

export const chooseFromStation = (fromStation) => ({
    type: 'CHOOSE_FROM_STATION',
    fromStation
})

export const chooseToStation = (toStation) => ({
    type: 'CHOOSE_TO_STATION',
    toStation
})

export const swapSearchStation = (fromStation, toStation) => ({
    type: 'SWAP_SEARCH_STATION',
    fromStation,
    toStation
})

export const fetchStationsText = (stationsText) => ({
    type: 'FETCH_STATIONS_TEXT',
    stationsText
})