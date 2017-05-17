import React from 'react';
import { NavBar, WhiteSpace, WingBlank, Toast, ListView } from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchTrains } from '../actions/Trains';

const MyBody = (props) => {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

//测试数据
let data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒1',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒2',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒3',
  },
];

let index = 0;
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

class TrainSearch extends React.PureComponent {

  constructor(props) {
    super(props);

    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.genData = (pIndex = 0) => {
      for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        this.sectionIDs.push(sectionName);
        this.dataBlob[sectionName] = sectionName;
        this.rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
          const rowName = `S${ii}, R${jj}`;
          this.rowIDs[ii].push(rowName);
          this.dataBlob[rowName] = rowName;
        }
      }
      // new object ref
      this.sectionIDs = [].concat(this.sectionIDs);
      this.rowIDs = [].concat(this.rowIDs);
      console.log('sectionIDs 👇');
      console.log(this.sectionIDs);
      console.log('rowIDs 👇');
      console.log(this.rowIDs);
      console.log('dataBlob 👇');
      console.log(this.dataBlob);
    };

    this.state = {
      searchNavibarTitle: this.props.lang.searchNavibarTitle,
      NavibarLeftBack: this.props.lang.NavibarLeftBack,
      loadingText: this.props.lang.loadingText,
      cityIcon: this.props.lang.cityIcon,
      fromStation: this.props.fromStation,
      toStation: this.props.toStation,
      startDate: this.props.startDate,
      fetchTrainsUrl: this.props.lang.fetchTrainsUrl,
      trainsResult: this.props.trainsResult,
      dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: true,
    };
    console.log('TrainSearch 👇');
    console.log(props);
  }

  componentDidMount = () => {
    this.setState({
      searchNavibarTitle: this.props.fromStation.en + ' ⇀ ' + this.props.toStation.en
    });
    //显示轻提示
    Toast.info(this.state.loadingText, 0);
    //抓取车站文本
    this.props.fetchTrains(this.state.fetchTrainsUrl);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('TrainSearch.componentWillReceiveProps 👇');
    console.log(nextProps);
    //隐藏新提示
    //Toast.hide();
    //开发中延时一下，发布时取消。
    setTimeout(() => Toast.hide(), 1000);
    //列表init：simulate initial Ajax
    setTimeout(() => {
      this.genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        isLoading: false,
      });
    }, 600);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('TrainSearch.shouldComponentUpdate 👇');
    return this.state.fromStation.code != nextState.fromStation.code || 
           this.state.toStation.code != nextState.toStation.code ||
           this.state.startDate != nextState.startDate ||
           this.state.searchNavibarTitle != nextState.searchNavibarTitle ||
           this.state.dataSource != nextState.dataSource;
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    console.log("render()");

    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`}
        style={{
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} className="row">
          <div className="row-title">{obj.title}</div>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
            <img style={{ height: '1.28rem', marginRight: '0.3rem' }} src={obj.img} alt="icon" />
            <div className="row-text">
              <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' }}>{obj.des}</div>
              <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>35</span>¥</div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        <NavBar iconName={null} leftContent={this.state.NavibarLeftBack} mode="light" onLeftClick={() => this.props.history.goBack()}>
          <h1 id="TrainIndex-h1">{this.state.searchNavibarTitle}</h1>
        </NavBar>
        <ListView ref="lv"
          dataSource={this.state.dataSource}
          renderHeader={() => <span>header</span>}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          renderSectionHeader={sectionData => (
            <div>{`Task ${sectionData.split(' ')[1]}`}</div>
          )}
          renderBodyComponent={() => <MyBody />}
          renderRow={row}
          renderSeparator={separator}
          className="fortest"
          style={{
            height: document.documentElement.clientHeight,
            overflow: 'auto',
            border: '1px solid #ddd',
            margin: '0.1rem 0',
          }}
          pageSize={4}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          //onScroll={() => { console.log('scroll'); }}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  lang: store.get('lang'),
  fromStation: store.get('fromStation'),
  toStation: store.get('toStation'),
  startDate: store.get('startDate'),
  trainsResult: store.get('trainsResult'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrains: (url) => dispatch(fetchTrains(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainSearch);
