var broker = require('./broker');

var catList = $('#catList');

var render = function(cats) {
	catList.html('');

	cats.forEach(function(cat) {
		var link = $("<a href='#'></a").append(cat.name);
		var li = $("<li></li>").append(link);
		catList.append(li);

	 	link.click(function() {
	 		broker.send('catSelected', this);
		 }.bind(cat));
	});
};

module.exports = {
	render: render
};

