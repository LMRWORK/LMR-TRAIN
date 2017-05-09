import store from '../store/Trains'

const trainReducer = (state=store, action) => {
    switch(action.type) {
        case 'FETCH_STATIONS_TEXT':
            return state.set('stationsText', action.payload)
        default:
            return state;
    }
}

export default trainReducer