"use strict";
let dispatcher = require("./../dispatcher.js");
let {get,post,del,patch} = require("./../RestHelper.js");

function ShowPieceStore(){

	let showPieces = [],
		changeListeners = [];

	function triggerListeners(){
		changeListeners.forEach(function(listener){
			listener(showPieces)	;
		})
	};

	get("api/pieces")
	.then((data)=>{
		showPieces = data;
		triggerListeners();
	});


	function removeShowPiece(piece){
		var index = showPieces.findIndex(x => x._id===piece._id);
		var removed = showPieces.splice(index,1)[0];
		triggerListeners();

		del(`api/pieces/${piece._id}`)
		.catch(()=>{
			showPieces.splice(index,0,removed);
			triggerListeners();
		})
	}

	function addShowPiece(piece){
		var i = showPieces.push(piece);
		triggerListeners();

		post("/api/pieces",piece)
		.then((g)=>{
			piece._id = g._id;
		})
		.catch(()=>{
			showPieces.splice(i,1);
		})
	}

	function setShowPieceBought(piece, isPurchased){
		var piece = showPieces.find(function(i){return i._id===piece._id});
		piece.purchased = isPurchased || false;;
		triggerListeners();

		patch(`api/pieces/${piece._id}`,piece);
	}

	function getShowPieces(){
		return showPieces;
	};

	function onChange(listener){
		changeListeners.push(listener);
	}

	dispatcher.register(function(event){
		var split = event.type.split(':');
		if (split[0]==='show-piece'){
			switch(split[1]) {
				case "add":
					addShowPiece(event.payload);
					break;
				case "delete":
					removeShowPiece(event.payload);
					break;
				case "buy":
					setShowPieceBought(event.payload, true);
					break;
				case "unbuy":
					setShowPieceBought(event.payload, false);
					break;
			}
		}
	})


	return {
		getShowPieces:getShowPieces,
		onChange:onChange
	}
}

module.exports = new ShowPieceStore();
