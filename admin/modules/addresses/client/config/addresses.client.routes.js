'use strict';

//Setting up route
angular.module('addresses').config(['$stateProvider',
	function($stateProvider) {
		// Addresses state routing
		$stateProvider.
		state('addresses', {
			abstract: true,
			url: '/addresses',
			template: '<ui-view/>'
		}).
		state('addresses.list', {
			url: '',
			templateUrl: 'modules/addresses/views/list-addresses.client.view.html'
		}).
		state('addresses.create', {
			url: '/create',
			templateUrl: 'modules/addresses/views/create-address.client.view.html'
		}).
		state('addresses.view', {
			url: '/:addressId',
			templateUrl: 'modules/addresses/views/view-address.client.view.html'
		}).
		state('addresses.edit', {
			url: '/:addressId/edit',
			templateUrl: 'modules/addresses/views/edit-address.client.view.html'
		});
	}
]);