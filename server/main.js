//"use strict";

import express from 'express';
import cors from 'cors';
var parser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require('connect-mongo')({
  session: session
});
var path = require('path');

var db = require('./database.js');

require('./models/ShowPiece.js');
require('./models/User.js');
// Bootstrap passport config
require('./passport')();


var app = new express();

app.set('port', (process.env.PORT || 7777));

// serve static assets normally
app.use('/static', express.static(path.join(__dirname, '/../.tmp'), {
  maxAge: 86400000
}));

app.use(function(req, res, next) {
  GLOBAL.navigator = {
    userAgent: req.headers['user-agent']
  }
  next();
});

require('./routes/react-router-render.js')(app);

app.use(cors())
  .use(parser.urlencoded({
    extended: false
  }))
  .use(parser.json())
  .listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });

// CookieParser should be above session
app.use(cookieParser());

// Express MongoDB session storage
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'eparts',
  store: new mongoStore({
    mongooseConnection: db.connection
      // collection: 'sessions'
  })
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/users.server.routes.js')(app);
require('./routes/showpieces.server.routes.js')(app);


app.use(function(req, res, next) {
  if (req.url.match(/.+\/static/)) {
    var url = req.url.match(/\/static.*/);
    res.redirect(url[0]);
  } else
    res.status(404).send('Sorry cant find that!');
});


module.exports = app;
