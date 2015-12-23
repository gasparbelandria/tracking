'use strict';

// Configuring the Tracking users module
angular.module('tracking-users').run(['Menus',
	function(Menus) {
		// Add the Tracking users dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Tracking users',
			state: 'tracking-users',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'tracking-users', {
			title: 'List Tracking users',
			state: 'tracking-users.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'tracking-users', {
			title: 'Graph by region',
			state: 'tracking-users.region'
		});
	}
]);
