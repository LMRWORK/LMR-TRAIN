import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchStationsText } from '../actions/Trains';

class Home extends React.Component {

    constructor(props, context) {
        super(props, context);
        console.log(props);
        console.log(context);
    }

    render() {
        return (
            <div>
                <NavBar 
                    leftContent="back" 
                    mode="light" 
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}>
                NavBar
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