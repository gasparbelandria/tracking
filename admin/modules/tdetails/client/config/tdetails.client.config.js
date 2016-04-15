'use strict';

// Configuring the Tdetails module
angular.module('tdetails').run(['Menus',
	function(Menus) {
		// Add the Tdetails dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Tdetails',
			state: 'tdetails',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'tdetails', {
			title: 'List Tdetails',
			state: 'tdetails.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'tdetails', {
			title: 'Create Tdetail',
			state: 'tdetails.create'
		});
	}
]);