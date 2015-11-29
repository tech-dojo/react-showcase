//"use strict";
var mongoose = require('mongoose');

var ShowPieceSchema = {
	title:String,
    artist:String,
    url:String,
    pending: Boolean,
	likes:{
		type: Number,
		default: 0
	},
    contributor: String,
    medium: String
};

var ShowPiece = mongoose.model('ShowPiece',ShowPieceSchema,'showPieces');

module.exports = ShowPiece;
