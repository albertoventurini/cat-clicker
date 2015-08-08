(function() {

	angular
		.module('catClicker')
		.factory('catService', catService);

	function catService() {
		var catSelectedHandlers = [];

		return {
			registerOnCatSelected: registerOnCatSelected,
			catSelected: catSelected
		};	

		function registerOnCatSelected(handler) {
			catSelectedHandlers.push(handler);
		};

		function catSelected(cat) {
			catSelectedHandlers.forEach(function(handler) { handler(cat); });
		};
	};

}());