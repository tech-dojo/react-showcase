"use strict";
let dispatcher = require("./../dispatcher.js");
let {get,post,del,put} = require("./../RestHelper.js");

function ShowPieceStore(){

	let showPieces = [],
		changeListeners = [],
        piece = {};

	function triggerListeners(){
        console.log(changeListeners);
		changeListeners.forEach(function(listener){
            
			listener(showPieces)	;
		})
	};

	function fetchShowcase(){
        get("api/pieces")
        .then((data)=>{
            showPieces = data;
            triggerListeners();
        });
    };
    
    function fetchShowPiece(id){

        get(`api/pieces/${id}`)
        .then((data)=>{
            piece = data[0];
            triggerListeners();
        });
    };
    


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

	function likeShowPiece(piece){
//		var piece = showPieces.find(function(i){return i._id===piece._id});
		piece.likes = piece.likes + 1;
		triggerListeners();

		put(`api/pieces/${piece._id}`,piece);
	}

    function unlikeShowPiece(piece){
//		var piece = showPieces.find(function(i){return i._id===piece._id});
		piece.likes = piece.likes - 1;
		triggerListeners();

		put(`api/pieces/${piece._id}`,piece);
	}
	function getShowPieces(){
		return showPieces;
	};
    function getShowPiece(){
		return piece;
	};

	function onChange(listener){
		changeListeners.push(listener);
	}
    
    function removeChangeListener(listener){
        var index = changeListeners.findIndex(i => i === listener);
		changeListeners.splice(index, 1);
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
				case "like":
					likeShowPiece(event.payload, true);
					break;
				case "unlike":
					unlikeShowPiece(event.payload, false);
					break;
			}
		}
	})


	return {
		getShowPieces:getShowPieces,
		onChange:onChange,
        fetchShowcase: fetchShowcase,
        fetchShowPiece: fetchShowPiece,
        getShowPiece: getShowPiece,
        removeChangeListener: removeChangeListener
	}
}

module.exports = new ShowPieceStore();


