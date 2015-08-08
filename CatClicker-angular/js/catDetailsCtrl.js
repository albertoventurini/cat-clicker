(function() {

	angular
		.module('catClicker')
		.controller('catDetailsCtrl', ['$scope', 'catService', catDetailsCtrl]);

	function catDetailsCtrl($scope, catService) {

		$scope.cat = {};
		$scope.catClicked = catClicked;

		catService.registerOnCatSelected(onCatSelected);

		function onCatSelected(cat) {
			$scope.cat = cat;
		};

		function catClicked() {
			$scope.cat.clicks++;
		};

	};

}());