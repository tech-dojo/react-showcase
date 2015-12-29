var dispatcher = require("./../dispatcher.js");

module.exports = {
    list:function(){
		dispatcher.dispatch({
			type:"show-piece:list",
			payload:""
		})
	},
    get:function(pieceId){
		dispatcher.dispatch({
			type:"show-piece:get",
			payload:pieceId
		})
	},
	add:function(piece){
		dispatcher.dispatch({
			type:"show-piece:add",
			payload:piece
		})
	},
	like:function(piece){
		dispatcher.dispatch({
			type:"show-piece:like",
			payload:piece
		})
	},
	unlike:function(piece){
		dispatcher.dispatch({
			type:"show-piece:unlike",
			payload:piece
		})
	},
	delete:function(piece, history){
		dispatcher.dispatch({
			type:"show-piece:delete",
			payload:{data:piece, history: history}
		});
	}

}
