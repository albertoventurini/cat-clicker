var broker = require('./broker');

var adminButton = $('#adminButton'),
	adminArea = $('#adminArea'),
	adminCatName = $('#adminCatName'),
	adminCatImg = $('#adminCatImg'),
	adminCatClicks = $('#adminCatClicks'),
	adminCancel = $('#adminCancel'),
	adminSave = $('#adminSave'),
	hidden = true,
	originalCat = {};

init();

function init() {
	adminArea.hide();
	adminButton.click(toggleVisibility);
	adminSave.click(save);
	adminCancel.click(cancel);
};

function toggleVisibility() {
	hidden = !hidden;
	if(hidden)
		adminArea.hide();
	else
		adminArea.show();
};

function render(cat) {
	originalCat = cat;
	updateFields(cat);
};

function save() {
	broker.send('catChanged', {
		name: adminCatName.val(),
		img: adminCatImg.val(),
		clicks: adminCatClicks.val()
	});
};

function cancel() {
	updateFields(originalCat);
};

function updateFields(cat) {
	adminCatName.val(cat.name);
	adminCatImg.val(cat.img);
	adminCatClicks.val(cat.clicks);
};

module.exports = {
	render: render
};