var broker = require('./broker')
var catRepository = require('./catRepository');
var listView = require('./listView');
var mainView = require('./mainView');


var selectedCat = {};

var init = function() {
	broker.register('catSelected', onCatSelected);
	broker.register('catClicked', onCatClicked);

	var cats = catRepository.getCats();
	listView.render(cats);
};

var onCatSelected = function(cat) {
	selectedCat = cat;
	mainView.render(cat);
};

var onCatClicked = function() {
	selectedCat.clicks++;
	mainView.render(selectedCat);	
};

module.exports = {
	init: init
};
