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
