import React, {PropTypes} from 'react';
import {Framework7App} from 'framework7-react';
import {routes} from '../routes/Trains';

export const App = () => (	
	<Framework7App themeType="ios" routes={routes}>
		<div>
			hi wind.....
		</div>
	</Framework7App>  
);
