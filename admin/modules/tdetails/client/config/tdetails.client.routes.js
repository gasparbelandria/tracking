'use strict';

//Setting up route
angular.module('tdetails').config(['$stateProvider',
	function($stateProvider) {
		// Tdetails state routing
		$stateProvider.
		state('tdetails', {
			abstract: true,
			url: '/tdetails',
			template: '<ui-view/>'
		}).
		state('tdetails.list', {
			url: '',
			templateUrl: 'modules/tdetails/views/list-tdetails.client.view.html'
		}).
		state('tdetails.create', {
			url: '/create',
			templateUrl: 'modules/tdetails/views/create-tdetail.client.view.html'
		}).
		state('tdetails.view', {
			url: '/:tdetailId',
			templateUrl: 'modules/tdetails/views/view-tdetail.client.view.html'
		}).
		state('tdetails.edit', {
			url: '/:tdetailId/edit',
			templateUrl: 'modules/tdetails/views/edit-tdetail.client.view.html'
		});
	}
]);