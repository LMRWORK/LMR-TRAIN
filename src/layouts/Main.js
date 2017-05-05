import React, {PropTypes} from 'react';
import {Views, View, Pages, Page, Navbar, Toolbar, Link} from 'framework7-react';

const Main = (props, context) => {
  //console.log(props);
  //console.log(context);
  return (
    <Views>
      <View main url="/">
        <Pages navbarFixed toolbarFixed>
          <Page>  
            <Navbar title="China Train Ticket Service" />
            <Toolbar>
              <Link>Link 1</Link>
              <Link>Link 2</Link>
            </Toolbar>
            <p>China Train Ticket Service</p>
            <Link href="/about/">About App</Link>
          </Page>
        </Pages>
      </View>
    </Views>
  );
};

Main.contextTypes = {
  framework7AppContext: PropTypes.object
};

export default Main;