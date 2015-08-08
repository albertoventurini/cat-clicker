(function() {

	angular
		.module('catClicker')
		.controller('adminAreaCtrl', ['$scope', 'catService', adminAreaCtrl]);

	function adminAreaCtrl($scope, catService) {

		$scope.cat = {};
		$scope.toggleVisibility = toggleVisibility;
		$scope.visible = false;

		catService.registerOnCatSelected(onCatSelected);

		function onCatSelected(cat) {
			$scope.cat = cat;
		};

		function toggleVisibility() {
			$scope.visible = !$scope.visible;
		};

	};

}());