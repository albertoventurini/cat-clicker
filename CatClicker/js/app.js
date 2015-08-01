var Cat = function(name) {
	this.name = name;
	this.img = name + ".jpg";
	this.clicks = 0;
};

var model = (function() {
	var cats;

	return {
		init: function() {
			cats = [new Cat('cat1'), new Cat('cat2'), new Cat('cat3'), new Cat('cat4'), new Cat('cat5')];
		},
		getCats: function() {
			return cats;
		}
	}
})();

var octopus = (function() {

	var observers = [];
	var viewAdminHidden = true;
	var selectedCat = {};

	var updateViews = function() {
		observers.forEach(function(observer) { observer.render(selectedCat); });
	};

	return {
		init: function() {
			viewAdminHidden = true;

			model.init();

			viewMain.init();
			viewLinks.init();
			viewCat.init();
			
			viewAdmin.init(viewAdminHidden);		
		},
		registerObserver: function(observer) {
			observers.push(observer);
		},
		getCats: function() {
			return model.getCats();
		},
		catSelected: function(cat) {
			selectedCat = cat;
			updateViews();
		},
		catClicked: function() {
			selectedCat.clicks++;
			updateViews();
		},
		getSelectedCat: function() {
			return selectedCat;
		},
		toggleAdminView: function() {
			viewAdminHidden = !viewAdminHidden;
			if(viewAdminHidden)
				viewAdmin.hide();
			else
				viewAdmin.show();
		},
		saveCat: function(name, img, clicks) {
			selectedCat.name = name;
			selectedCat.img = img;
			selectedCat.clicks = clicks;
			updateViews();
		}
	}
})();



var viewMain = {
	init: function() {
		$('#adminButton').click(function () {
			octopus.toggleAdminView();
		});
	}
};

var viewLinks = {
	init: function() {
		octopus.registerObserver(this);
		this.render();		
	},
	render: function() {
		$('#catList').html('');

		octopus.getCats().forEach(function(cat) {
			var link = $("<a href='#'></a").append(cat.name);
			var li = $("<li></li>").append(link);
			$('#catList').append(li);

			link.click(function() {
				octopus.catSelected(this)
			}.bind(cat));
		});
	}
};

var viewCat = (function() {
	var catImg = $('#catImg');
	var catCounter = $('#catCounter');

	return {
		init: function() {
			octopus.registerObserver(this);
			catImg.click(function() {
				octopus.catClicked();
			});
		},

		render: function(cat) {
			catImg.prop("src", cat.img);
			catCounter.text(cat.clicks);
		}
	}
})();

var viewAdmin = (function() {

	adminArea = $('#adminArea');
	adminCatName = $('#adminCatName');
	adminCatImg = $('#adminCatImg');
	adminCatClicks = $('#adminCatClicks');
	adminCancel = $('#adminCancel');
	adminSave = $('#adminSave');

	var save = function() {
		var newName = adminCatName.val();
		var newImg = adminCatImg.val();
		var newClicks = adminCatClicks.val();
		octopus.saveCat(newName, newImg, newClicks);
	}

	var cancel = function() {
		var cat = octopus.getSelectedCat();
		render(cat);
	}

	return {
		init: function(shouldHide) {
			octopus.registerObserver(this);

			if(shouldHide)
				adminArea.hide();
			else
				adminArea.show();

			adminSave.click(save);
			adminCancel.click(cancel);
		},
		show: function() {
			adminArea.show();
		},
		hide: function() {
			adminArea.hide();
		},
		render: function(cat) {
			adminCatName.val(cat.name);
			adminCatImg.val(cat.img);
			adminCatClicks.val(cat.clicks);
		}
	}
})();

$(function() {
	octopus.init();
});