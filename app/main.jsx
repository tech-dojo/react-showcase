"use strict";

let dispatcher = require('./dispatcher.js');
let ShowCase = require('./components/ShowCase.jsx');
let React = require('react');
let ReactDom = require('react-dom');
let ShowPieceStore = require('./stores/ShowPieceStore.jsx');
let injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


var pieces = ShowPieceStore.getShowPieces();

ShowPieceStore.onChange(()=>{
	pieces = ShowPieceStore.getShowPieces();
	render();
})
function render(){
	ReactDom.render(<ShowCase pieces={pieces}/>,mount);
}
