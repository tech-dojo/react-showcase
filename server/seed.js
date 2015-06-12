let mongoose = require('mongoose');
let GroceryItem = require('./models/GroceryItem.js');

mongoose.connection.db.dropDatabase();

var initial = [{
	name:"Ice Cream"
},{
	name:"Waffles"
},{
	name:"Candy",
	purchased:true
},{
	name:"Snarks"
}];

initial.forEach(function(item){
	new GroceryItem(item).save();
});
