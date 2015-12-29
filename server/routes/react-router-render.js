
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import createLocation from 'history/lib/createLocation';
import ShowCase from './../../app/components/ShowCase';
import DataWrapper from './../../app/components/DataWrapper';
var ShowPiece = require('./../models/ShowPiece.js');

module.exports = function(app){

    const routes = {
        path: '/',
        component: require('./../../app/components/Header'),
        indexRoute: {
            component: ShowCase
        },
        childRoutes: [
                {
                path: 'signin',
                component: require('./../../app/components/Signin')
            },{
                path: 'about',
                component: require('./../../app/components/About')
            }, {
                path: 'showpiece/:id',
                component: require('./../../app/components/ShowPiece')
            }]
    };

    app.use((req, res, next) =>{
     const location = createLocation(req.path);

      // Note that req.url here should be the full URL path from
      // the original request, including the query string.
          match({ routes, location}, (error, redirectLocation, renderProps) => {
            if (error) {
              res.status(500).send(error.message)
            } else if (redirectLocation) {
              res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
               renderWithData(req,res, renderProps);

            } else {
                next();
            }
          })
    })
}

function renderWithData(req,res, renderProps){
    if(req.url == "/"){
           ShowPiece.find(function(error,doc){
               var data = doc;
               renderIsoOutput(data, renderProps, res);
           });
       }else if(req.url.match(/\/showpiece\/.*/)){
           var id = req.url.split(/\/showpiece\//)[1];
           ShowPiece.find({_id:id},function(error,doc){
            var data = doc;
            renderIsoOutput(data, renderProps, res);
		})

       }else{
             renderIsoOutput([], renderProps, res);
       }
}

function renderIsoOutput(data, renderProps, res){
    var generated = renderToString(<DataWrapper data={ data }><RoutingContext {...renderProps} /></DataWrapper>);
    res.render('./../app/index.ejs',{reactOutput:generated});
}
