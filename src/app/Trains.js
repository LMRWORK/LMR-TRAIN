import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { routes } from '../routes/Trains';

//静态资源
import '../assets/css/TrainIndex.css';
import '../assets/css/Motion.css';
import '../assets/png/city.png';
import '../assets/png/date.png';

//插入测试数据
//车站名文本：Acheng|Acheng|阿城|ACB|3141@Acheng|Acheng|阿城|ACB|3141
import '../assets/data/stations.txt';
import '../assets/data/fetchTrain.txt';

class Trains extends React.PureComponent {

  constructor(props) {
    super(props);
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