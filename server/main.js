//"use strict";

var express = require('express');
var cors = require('cors');
var parser = require('body-parser');
var ShowPiece = require('./models/ShowPiece.js');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
require('babel/register');

require('./database.js');

var app = new express();

app.use(cors())
.use(parser.urlencoded({ extended: false }))
.use(parser.json())
.get('/',function(req,res){

//		var app = React.createFactory(require('./../app/components/ShowCase.jsx'));
//		ShowPiece.find(function(error,doc){
//			var generated = ReactDOMServer.renderToString(app({
//				pieces:doc
//			}));
//			res.render('./../app/index.ejs',{reactOutput:generated});
//		})
    res.render('./../app/index.ejs',{reactOutput:''});
})
.use(express.static(__dirname + '/../.tmp'))
.listen(7777);

require('./routes/pieces.js')(app);
module.exports = app;
