var dispatcher = require("./../dispatcher.js");

module.exports = {
	add:function(piece){
		dispatcher.dispatch({
			type:"show-piece:add",
			payload:piece
		})
	},
	buy:function(piece){
		dispatcher.dispatch({
			type:"show-piece:buy",
			payload:piece
		})
	},
	unbuy:function(piece){
		dispatcher.dispatch({
			type:"show-piece:unbuy",
			payload:piece
		})
	},
	delete:function(piece){
		dispatcher.dispatch({
			type:"show-piece:delete",
			payload:piece
		});
	}

}
