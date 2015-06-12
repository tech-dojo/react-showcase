"use strict";

let dispatcher = require('./dispatcher.js');
let GroceryItemList = require('./components/GroceryItemList.jsx');
let React = require('react/addons');
let GroceryItemStore = require('./stores/GroceryItemStore.jsx');

var items = GroceryItemStore.getGroceryItems();

GroceryItemStore.onChange(()=>{
	items = GroceryItemStore.getGroceryItems();
	render();
})
function render(){
	React.render(<GroceryItemList items={items}/>,mount);
}
