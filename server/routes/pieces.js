
module.exports = function(app){

	var ShowPiece = require('./../models/ShowPiece.js');

	app.route('/api/pieces')
	.get(function(req,res){
		ShowPiece.find(function(error,doc){
			res.send(doc);
		})
	})
	.post(function(req,res){
		var showPiece = new ShowPiece(req.body);
		showPiece.save(function(err,data){
			if (err) {
				res.status(501).send();
			} else {
				res.status(200).send(data);
			}
		});
		;
	});

	app.route('/showpiece/api/pieces/:id')
	.get(function(req,res){
		ShowPiece.find({_id:req.params.id},function(error,doc){
			if (error){
				return res.status(404).send();
			}

			res.status(200)
				.send(doc);
		})
	})
	.delete(function(req,res){
		ShowPiece.find({_id:req.params.id})
		.remove(function(){
		res.status(202)
			.send();
		})
	})
	.patch(function(req,res){
		ShowPiece.findOne({
			_id:req.body._id
		},function(err,doc){
			if (!doc){
				return res.status(404).send();
			}

			for (var key in req.body){
				doc[key] = req.body[key];
			};
			doc.save();
			res.status(200).send(doc);
		})

	});

}
