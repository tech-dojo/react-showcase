"use strict";

import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import App from './components/App.jsx';
import DataWrapper from './components/DataWrapper.jsx';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
var data= {'pieces': []};

ReactDom.render(<DataWrapper data={data}><App/></DataWrapper>,document.getElementById('mount'));
