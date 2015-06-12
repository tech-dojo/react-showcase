let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/grocery',function(){
	require('./seed.js');
});
