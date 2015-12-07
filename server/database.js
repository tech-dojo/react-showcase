let mongoose = require('mongoose');
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/showcase';
mongoose.connect(uri,function(){
	require('./seed.js');
});
