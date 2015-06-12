//"use strict";
var mongoose = require('mongoose');

var GroceryItemSchema = {
	name:String,
	id:String,
	cost:Number,
	purchased:Boolean
};

var GroceryItem = mongoose.model('GroceryItem',GroceryItemSchema,'groceryItems');

module.exports = GroceryItem;
