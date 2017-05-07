import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchStationsText } from '../actions/Trains';

const seo_h1_style = {fontSize:'inherit', fontWeight:'inherit', margin:'inherit'};

class Home extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div>
                <NavBar 
                    iconName={null}
                    leftContent="首页"
                    mode="light"
                >
                    <h1 style={seo_h1_style}>中国火车票预定</h1>
                </NavBar>
            </div>
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