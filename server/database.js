let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/showcase',function(){
	require('./seed.js');
});
