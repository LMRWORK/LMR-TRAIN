import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchStationsText} from '../actions/Trains';
import {
  Views, View, Pages, Page, Navbar, Toolbar, Link, ContentBlockTitle, ContentBlock,
  List, ListItem, FormLabel, FormInput, Button, GridRow, GridCol
} from 'framework7-react';

class Main extends React.Component {

  constructor(props, context) {
      super(props, context);
      console.log(props);
      console.log(context);        
  }

  render() {
    return (
      <Views>
        <View id="main-view" main url="/">
          <Pages navbarFixed toolbarFixed>
            <Page>  
              <Navbar title="中国火车预定"/>
              <ContentBlock>
                <p>* 购票、改签和退票须不晚于开车前30分钟，办理“变更到站”业务时，请不晚于开车前48小时。</p>
              </ContentBlock>
              <List form>
                <ListItem>
                  <FormLabel>出发地</FormLabel>
                  <FormInput type="text" placeholder="北京" readonly />
                </ListItem>
                <ListItem>
                  <FormLabel>目的地</FormLabel>
                  <FormInput type="text" placeholder="上海"/>
                </ListItem>
                <ListItem>
                  <FormLabel>出发日</FormLabel>
                  <FormInput type="date" value="2017-05-30"/>
                </ListItem>
              </List>
              <GridRow>
                <GridCol width="20"></GridCol>
                <GridCol width="60"><Button href="#search" color="lightblue" fill big>查询</Button></GridCol>
                <GridCol width="20"></GridCol>
              </GridRow>
              <Toolbar>
                <Link>车票预定</Link>
                <Link>使用须知</Link>
                <Link>关于我们</Link>
              </Toolbar>
            </Page>
          </Pages>
        </View>
      </Views>
    );
  }

}

Main.contextTypes = {
  framework7AppContext: PropTypes.object
};

const mapStateToProps = (state) => ({
  stationsText: state.get('stationsText')
});

const mapDispatchToProps = (dispatch) => ({
  fetchStationsText: (stationsText) => dispatch(fetchStationsText(stationsText))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);