var broker = require('./broker')
var catRepository = require('./catRepository');
var listView = require('./listView');
var mainView = require('./mainView');
var adminView = require('./adminView');

var cats = [];
var selectedCat = {};

var init = function() {
	broker.register('catSelected', onCatSelected);
	broker.register('catClicked', onCatClicked);
	broker.register('catChanged', onCatChanged);

	cats = catRepository.getCats();
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

var onCatChanged = function(catData) {
	selectedCat.name = catData.name;
	selectedCat.img = catData.img;
	selectedCat.clicks = catData.clicks;
	renderViews();
};

var renderViews = function() {
	listView.render(cats);
	mainView.render(selectedCat);
	adminView.render(selectedCat);
};

module.exports = {
	init: init
};
