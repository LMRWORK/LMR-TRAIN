import React from 'react';
import { connect } from 'react-redux';
import { fetchStationsText } from '../actions/Trains';

class MatchCity extends React.PureComponent  {

  state = {
    filterStation: [],
    searchText: ''
  }

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    //异步获取火车数据
    if (!this.props.stationsText) {
      const _props = this.props;
      fetch('/data/stations.txt')
      .then((response) => response.text())
      .then((text) => {
        _props.fetchStationsText(text)
      })
      .catch((error) => {
        log('fetchStationsText failed', error)
      });
    }
  }

  handleUpdateInput = (e) => {
    let _filterStation = [];
    console.log(e.target.value)
    if (e.target.value) {
      //用正则匹配车站字符串
      let reg = new RegExp('[@\|]'+e.target.value+'.+?@', 'gi');
      let result = [];
      while ((result = reg.exec(this.props.stationsText)) != null) {

        let txt = result[0];
        let f = txt.charAt(0);
        let fl = false;
        if (f == '@') {

          txt = txt.replace('@', '');
          let tf = txt.split('|');
          let rs_en = tf[0];
          let rs_lgc = tf[2];
          _filterStation.push(rs_en);

        } else if (f == '|') {

          txt = txt.replace('@', '');
          let tf = txt.split('|');
          if (tf.length != 5) 
            continue;
          let rs_en = tf[1];
          let rs_lgc = tf[2];
          fl = true;
          _filterStation.push(rs_en);

        }

        if (_filterStation.length>4) 
          break;
      }
    }

    this.setState({
      searchText: e.target.value,
      filterStation: _filterStation
    })

  }

  render() {
    return (
      <div>
        <input onChange={this.handleUpdateInput}/>
        <div>{this.state.filterStation.join(' # ')}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stationsText: state.get('stationsText')
});

const mapDispatchToProps = (dispatch) => ({
  fetchStationsText: (stationsText) => dispatch(fetchStationsText(stationsText))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchCity);

