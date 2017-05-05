import React from 'react';
import {Framework7App, Statusbar} from 'framework7-react';
import {routes} from '../routes/Trains';

import Main from '../layouts/Main';

export const App = () => (	
	<Framework7App themeType="ios" routes={routes}>
		<Statusbar />
    <Main />
	</Framework7App>  
);
