'use strict';

// Configuring the Stats module
angular.module('stats').run(['Menus',
	function(Menus) {
		// Add the Stats dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Stats',
			state: 'stats',
			type: 'dropdown'
		});

		// Dashboard
		Menus.addSubMenuItem('topbar', 'stats', {
			title: 'Dashboard',
			state: 'stats.dashboard'
		});

		// Number of user sessions per day
		Menus.addSubMenuItem('topbar', 'stats', {
			title: 'Number of user sessions per day',
			state: 'stats.sessions'
		});

		// Number of Comments
		Menus.addSubMenuItem('topbar', 'stats', {
			title: 'Number of Comments',
			state: 'stats.create'
		});

		// Number of Shares
		Menus.addSubMenuItem('topbar', 'stats', {
			title: 'Number of Shares',
			state: 'stats.create2'
		});

		// Commands used by each user
		Menus.addSubMenuItem('topbar', 'stats', {
			title: 'Commands used by each user',
			state: 'stats.create3'
		});

		// Load on Servers
		Menus.addSubMenuItem('topbar', 'stats', {
			title: 'Load on Servers',
			state: 'stats.create4'
		});

		// Average time spent by user on site
		Menus.addSubMenuItem('topbar', 'stats', {
			title: 'Average time spent by user on site',
			state: 'stats.create5'
		});

	}
]);
