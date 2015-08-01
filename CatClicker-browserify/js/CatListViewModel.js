var catRepository = require('./catRepository.js');

var CatListViewModel = function() {
	this.cats = catRepository.getCats();
};

module.exports = CatListViewModel;
