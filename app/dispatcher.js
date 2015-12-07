var listeners = {};
let guid = require('guid');

var dispatcher = {
	register(callback){
		var id = guid.raw();
		listeners[id] = callback;
		return id;
	},
	dispatch(payload){
		console.info('Dispatching...',payload.type);
		for (var id in listeners){
			var listener = listeners[id];
			listener(payload);
		}
	}
};
module.exports = dispatcher;
