var dispatcher = require("./../dispatcher.js");

module.exports = {
	add:function(item){
		dispatcher.dispatch({
			type:"grocery-item:add",
			payload:item
		})
	},
	buy:function(item){
		dispatcher.dispatch({
			type:"grocery-item:buy",
			payload:item
		})
	},
	unbuy:function(item){
		dispatcher.dispatch({
			type:"grocery-item:unbuy",
			payload:item
		})
	},
	delete:function(item){
		dispatcher.dispatch({
			type:"grocery-item:delete",
			payload:item
		});
	}

}
