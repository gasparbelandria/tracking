'use strict';

// Configuring the Addresses module
angular.module('addresses').run(['Menus',
	function(Menus) {
		// Add the Addresses dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Addresses',
			state: 'addresses',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'addresses', {
			title: 'List Addresses',
			state: 'addresses.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'addresses', {
			title: 'Create Address',
			state: 'addresses.create'
		});
	}
]);