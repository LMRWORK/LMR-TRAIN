import React from 'react';
import { NavBar, WhiteSpace, WingBlank, Toast, List} from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchStationsTxt, setFromStation, setToStation } from '../actions/Trains';

class TrainSearch extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      searchNavibarTitle: this.props.lang.searchNavibarTitle,
      NavibarLeftBack: this.props.lang.NavibarLeftBack,
      loadingText: this.props.lang.loadingText,
      cityIcon: this.props.lang.cityIcon,
      fromStation: this.props.fromStation,
      toStation: this.props.toStation,
      startDate: this.props.startDate,
      fetchTrainsUrl: this.props.lang.fetchTrainsUrl,
      trainsArr: [],
    };
    console.log('TrainSearch 👇');
    console.log(props);
  }

  componentDidMount = () => {
    if (!this.state.stationsTxt) {
      //显示轻提示
      //Toast.info(this.state.loadingText, 0);
      //抓取车站文本
      //this.props.fetchStationsTxt(this.state.stationsUrl);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    //this.setState({trainsArr: nextProps.stationsTxt});
    //隐藏新提示
    Toast.hide();
  }

  render() {
    return (
      <div>
        <NavBar iconName={null} leftContent={this.state.NavibarLeftBack} mode="light" onLeftClick={() => this.props.history.goBack()}>
          <h1 id="TrainIndex-h1">{this.state.cityNavibarTitle}</h1>
        </NavBar>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  lang: store.get('lang'),
  fromStation: store.get('fromStation'),
  toStation: store.get('toStation'),
  startDate: store.get('startDate'),
});

const mapDispatchToProps = (dispatch) => ({
  //setFromStation: (station) => dispatch(setFromStation(station)),
  //setToStation: (station) => dispatch(setToStation(station)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainSearch);
