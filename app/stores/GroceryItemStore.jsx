"use strict";
let dispatcher = require("./../dispatcher.js");
let {get,post,del,patch} = require("./../RestHelper.js");

function GroceryItemStore(){

	let groceryItems = [],
		changeListeners = [];

	function triggerListeners(){
		changeListeners.forEach(function(listener){
			listener(groceryItems)	;
		})
	};

	get("api/items")
	.then((data)=>{
		groceryItems = data;
		triggerListeners();
	});


	function removeGroceryItem(item){
		var index = groceryItems.findIndex(x => x._id===item._id);
		var removed = groceryItems.splice(index,1)[0];
		triggerListeners();

		del(`api/items/${item._id}`)
		.catch(()=>{
			groceryItems.splice(index,0,removed);
			triggerListeners();
		})
	}

	function addGroceryItem(item){
		var i = groceryItems.push(item);
		triggerListeners();

		post("/api/items",item)
		.then((g)=>{
			item._id = g._id;
		})
		.catch(()=>{
			groceryItems.splice(i,1);
		})
	}

	function setGroceryItemBought(item, isPurchased){
		var item = groceryItems.find(function(i){return i._id===item._id});
		item.purchased = isPurchased || false;;
		triggerListeners();

		patch(`api/items/${item._id}`,item);
	}

	function getGroceryItems(){
		return groceryItems;
	};

	function onChange(listener){
		changeListeners.push(listener);
	}

	dispatcher.register(function(event){
		var split = event.type.split(':');
		if (split[0]==='grocery-item'){
			switch(split[1]) {
				case "add":
					addGroceryItem(event.payload);
					break;
				case "delete":
					removeGroceryItem(event.payload);
					break;
				case "buy":
					setGroceryItemBought(event.payload, true);
					break;
				case "unbuy":
					setGroceryItemBought(event.payload, false);
					break;
			}
		}
	})


	return {
		getGroceryItems:getGroceryItems,
		onChange:onChange
	}
}

module.exports = new GroceryItemStore();
