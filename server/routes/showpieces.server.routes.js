
module.exports = function(app){

	var showpieces = require('./../controllers/showpieces.server.controller.js');
	var users = require('./../controllers/users.server.controller.js');

	app.route('/api/pieces')
	.get(showpieces.list)
	.post(showpieces.create);

	app.route('/showpiece/api/pieces/:id')
	.get(showpieces.read)
	.delete(users.requiresLogin, showpieces.delete)
	.put(showpieces.update);

}
