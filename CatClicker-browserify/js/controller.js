var broker = require('./broker')
var catRepository = require('./catRepository');
var catListView = require('./catListView');
var catMainView = require('./catMainView');


var selectedCat = {};

var init = function() {
	broker.register('catSelected', onCatSelected);
	broker.register('catClicked', onCatClicked);

	var cats = catRepository.getCats();
	catListView.render(cats);
};

var onCatSelected = function(cat) {
	selectedCat = cat;
	catMainView.render(cat);
};

var onCatClicked = function() {
	selectedCat.clicks++;
	catMainView.render(selectedCat);	
};

module.exports = {
	init: init
};
