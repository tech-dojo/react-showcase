//"use strict";
var mongoose = require('mongoose');

var ShowPieceSchema = {
	title:String,
    author:String,
    url:String,
    pending: Boolean,
	id:String,
	likes:{
		type: Number,
		default: 0
	},
    contributor: String,
    medium: String
};

var ShowPiece = mongoose.model('ShowPiece',ShowPieceSchema,'showPieces');

module.exports = ShowPiece;
