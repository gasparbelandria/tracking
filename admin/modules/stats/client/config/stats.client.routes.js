'use strict';

//Setting up route
angular.module('stats').config(['$stateProvider',
	function($stateProvider) {
		// Stats state routing
		$stateProvider.
		state('stats', {
			abstract: true,
			url: '/stats',
			template: '<ui-view/>'
		}).
		state('stats.sessions', {
			url: '/sessions',
			templateUrl: 'modules/stats/views/sessions-stats.client.view.html'
		}).
		state('stats.dashboard', {
			url: '/dashboard',
			templateUrl: 'modules/stats/views/dashboard-stat.client.view.html'
		}).
		state('stats.view', {
			url: '/:statId',
			templateUrl: 'modules/stats/views/view-stat.client.view.html'
		}).
		state('stats.edit', {
			url: '/:statId/edit',
			templateUrl: 'modules/stats/views/edit-stat.client.view.html'
		});
	}
]);
