'use strict';

// Configuring the Tickets module
angular.module('tickets').run(['Menus',
	function(Menus) {
		// Add the Tickets dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Tickets',
			state: 'tickets',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'tickets', {
			title: 'List Tickets',
			state: 'tickets.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'tickets', {
			title: 'Create Ticket',
			state: 'tickets.create'
		});
	}
]);