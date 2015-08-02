var adminButton = $('#adminButton'),
	adminArea = $('#adminArea'),
	adminCatName = $('#adminCatName'),
	adminCatImg = $('#adminCatImg'),
	adminCatClicks = $('#adminCatClicks'),
	adminCancel = $('#adminCancel'),
	adminSave = $('#adminSave'),
	hidden = true;

init();

function init() {
	updateVisibility();

	adminButton.click(function() {
		hidden = !hidden;
		updateVisibility();
	});
};

function updateVisibility() {
	if(hidden)
		adminArea.hide();
	else
		adminArea.show();
};

function render(cat) {
	adminCatName.val(cat.name);
	adminCatImg.val(cat.img);
	adminCatClicks.val(cat.clicks);
};

module.exports = {
	render: render
};