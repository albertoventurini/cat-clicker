(function() {

	angular
		.module('catClicker')
		.controller('catListCtrl', ['$scope', 'catService', catListCtrl]);

	function catListCtrl($scope, catService) {

		$scope.cats = getCats();
		$scope.catSelected = onCatSelected;

		function getCats() {
			return [new Cat('cat1'), new Cat('cat2'), new Cat('cat3'), new Cat('cat4'), new Cat('cat5')];
		};

		function onCatSelected(cat) {
			catService.catSelected(cat);
		};

	};

}());