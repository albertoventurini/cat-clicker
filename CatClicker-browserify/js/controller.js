var broker = require('./broker')
var catRepository = require('./catRepository');
var listView = require('./listView');
var mainView = require('./mainView');
var adminView = require('./adminView');

var selectedCat = {};

var init = function() {
	broker.register('catSelected', onCatSelected);
	broker.register('catClicked', onCatClicked);

	var cats = catRepository.getCats();
	listView.render(cats);
};

var onCatSelected = function(cat) {
	selectedCat = cat;
	renderViews();
};

var onCatClicked = function() {
	selectedCat.clicks++;
	renderViews();
};

var renderViews = function() {
	mainView.render(selectedCat);
	adminView.render(selectedCat);
};

module.exports = {
	init: init
};
