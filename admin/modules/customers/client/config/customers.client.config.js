'use strict';

// Configuring the Customers module
angular.module('customers').run(['Menus',
	function(Menus) {
		// Add the Customers dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Customers',
			state: 'customers',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'customers', {
			title: 'List Customers',
			state: 'customers.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'customers', {
			title: 'Create Customer',
			state: 'customers.create'
		});
	}
]);