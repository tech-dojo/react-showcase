//"use strict";

import express from 'express';
var cors = require('cors');
var parser = require('body-parser');
var ShowPiece = require('./models/ShowPiece.js');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import createLocation from 'history/lib/createLocation';
import ShowCase from './../app/components/ShowCase';
import DataWrapper from './../app/components/DataWrapper';
const path = require('path');
    
var data= {};    
const routes = {
path: '/',
component: require('./../app/components/Header'),
indexRoute: {
    component: ShowCase
},
childRoutes: [{
    path: 'about',
    component: require('./../app/components/About')
}, {
    path: 'showpiece/:id',
    component: require('./../app/components/ShowPiece')
}]
};


require('./database.js');

var app = new express();

// serve static assets normally
app.use('/static', express.static(__dirname + '/../.tmp'));

app.use(function(req, res, next) {
    GLOBAL.navigator = {
        userAgent: req.headers['user-agent']
    }
    next();
});

app.use(cors())
.use(parser.urlencoded({ extended: false }))
.use(parser.json())
.use((req, res, next) =>{ 
     const location = createLocation(req.path);
    
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes, location}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
       if(req.url == "/"){
           ShowPiece.find(function(error,doc){
               data = {pieces: doc};
               var generated = renderToString(<DataWrapper data={ data }><RoutingContext {...renderProps} /></DataWrapper>);
                res.render('./../app/index.ejs',{reactOutput:generated});
           });
       }else if(req.url.match(/\/showpiece\/.*/)){
           var id = req.url.split(/\/showpiece\//)[1];
           ShowPiece.find({_id:id},function(error,doc){
			data = {pieces: doc[0]};
               var generated = renderToString(<DataWrapper data={ data }><RoutingContext {...renderProps} /></DataWrapper>);
                res.render('./../app/index.ejs',{reactOutput:generated});
		})
               
       }
        
      
    } else {
        next();
//      res.status(404).send('Not found')
    }
  })
})
.listen(7777);

//		var app = React.createFactory(require('./../app/components/ShowCase.jsx'));
//		ShowPiece.find(function(error,doc){
//			var generated = ReactDOMServer.renderToString(app({
//				pieces:doc
//			}));
//			res.render('./../app/index.ejs',{reactOutput:generated});
//		})
//    res.render('./../app/index.ejs',{reactOutput:''});
//})
require('./routes/pieces.js')(app);
module.exports = app;



app.use(function(req, res, next) {
    if(req.url.match(/.+\/static/)){
        var url = req.url.match(/\/static.*/);
        res.redirect(url[0]);
    }else
        res.status(404).send('Sorry cant find that!');
});



