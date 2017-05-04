import React, {PropTypes} from 'react';
import {Framework7App, Statusbar} from 'framework7-react';
import {routes} from '../routes/Trains';

export const App = () => (	
	<Framework7App themeType="ios" routes={routes}>
		<Statusbar />
		<div>test2</div>
	</Framework7App>  
);
