var callbacks = {};

var register = function(message, callback) {
	if(!callbacks[message]) {
		callbacks[message] = [];
	}

	callbacks[message].push(callback);
};

var send = function(event, payload) {
	if(callbacks[event]) {
		callbacks[event].forEach(function(callback) {
			callback(payload);
		});
	}
};

module.exports = {
	register: register,
	send: send
};