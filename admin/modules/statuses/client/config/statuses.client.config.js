'use strict';

// Configuring the Statuses module
angular.module('statuses').run(['Menus',
	function(Menus) {
		// Add the Statuses dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Statuses',
			state: 'statuses',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'statuses', {
			title: 'List Statuses',
			state: 'statuses.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'statuses', {
			title: 'Create Status',
			state: 'statuses.create'
		});
	}
]);