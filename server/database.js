let mongoose = require('mongoose');
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/showcase';
var db = mongoose.connect(uri,function(){
	require('./seed.js');
});

module.exports = db;
