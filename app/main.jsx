"use strict";

import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import App from './components/App.jsx';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDom.render(<App/>,document.getElementById('mount'));
