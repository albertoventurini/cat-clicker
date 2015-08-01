(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Cat = function(name) {
	this.name = name;
	this.img = name + ".jpg";
	this.clicks = 0;
}

module.exports = Cat;
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
var broker = require('./broker');

var render = function(cats) {
	$('#catList').html('');

	cats.forEach(function(cat) {
		var link = $("<a href='#'></a").append(cat.name);
		var li = $("<li></li>").append(link);
		$('#catList').append(li);

	 	link.click(function() {
	 		broker.send('catSelected', this);
		 }.bind(cat));
	});
};

module.exports = {
	render: render
};


},{"./broker":2}],4:[function(require,module,exports){
var broker = require('./broker.js');

var catCounter = $('#catCounter');
var catImg = $('#catImg');

catImg.click(function() {
	broker.send('catClicked');
});

var render = function(cat) {
	catImg.prop("src", cat.img);
	catCounter.text(cat.clicks);
};

module.exports = {
	render: render
};

},{"./broker.js":2}],5:[function(require,module,exports){
var Cat = require('./Cat.js');

var getCats = function() {
	return [new Cat('cat1'), new Cat('cat2'), new Cat('cat3'), new Cat('cat4'), new Cat('cat5')];
};

module.exports = {
	getCats: getCats
};
},{"./Cat.js":1}],6:[function(require,module,exports){
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

},{"./broker":2,"./catListView":3,"./catMainView":4,"./catRepository":5}],7:[function(require,module,exports){
var controller = require('./controller.js');

controller.init();

},{"./controller.js":6}]},{},[7]);
