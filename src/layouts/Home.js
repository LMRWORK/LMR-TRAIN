import React from 'react';
import {connect} from 'react-redux';
import {fetchStationsText} from '../actions/Trains';

class Home extends React.Component {

    constructor(props, context) {
        super(props, context);
        console.log(props);
        console.log(context);
    }

    render() {
        return (
            <div>Home</div>
        );
    }

}

const mapStateToProps = (state) => ({
    stationsText: state.get('stationsText')
});

const mapDispatchToProps = (dispatch) => ({
    fetchStationsText: (stationsText) => dispatch(fetchStationsText(stationsText))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);