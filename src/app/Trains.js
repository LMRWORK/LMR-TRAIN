import React from 'react';
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { routes } from '../routes/Trains';

//静态资源
import '../resources/css/TrainIndex.css';
import '../resources/css/Motion.css';
import '../resources/png/city.png';
import '../resources/png/date.png';
//车站名文本：Acheng|Acheng|阿城|ACB|3141@Acheng|Acheng|阿城|ACB|3141
import '../resources/data/stations.txt';

class Trains extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    //console.log('TrainsApp =>');
    //console.log(props);
  }

  render() {
    return (
      <Router>
        <Route render={routes} />
      </Router>
    );
  }

}

export default Trains;