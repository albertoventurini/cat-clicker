var Cat = require('./Cat.js');

var getCats = function() {
	return [new Cat('cat1'), new Cat('cat2'), new Cat('cat3'), new Cat('cat4'), new Cat('cat5')];
};

module.exports = {
	getCats: getCats
};