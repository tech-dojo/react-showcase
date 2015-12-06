//"use strict";

import express from 'express';
var cors = require('cors');
var parser = require('body-parser');
const path = require('path');

require('./database.js');

var app = new express();

app.set('port', (process.env.PORT || 7777));

// serve static assets normally
app.use('/static', express.static(path.join(__dirname, '/../.tmp'), { maxAge: 86400000 }));

app.use(function(req, res, next) {
    GLOBAL.navigator = {
        userAgent: req.headers['user-agent']
    }
    next();
});

require('./routes/react-router-render.js')(app);

app.use(cors())
.use(parser.urlencoded({ extended: false }))
.use(parser.json())
.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

require('./routes/pieces.js')(app);


app.use(function(req, res, next) {
    if(req.url.match(/.+\/static/)){
        var url = req.url.match(/\/static.*/);
        res.redirect(url[0]);
    }else
        res.status(404).send('Sorry cant find that!');
});


module.exports = app;
