'use strict';

//Tickets service used to communicate Tickets REST endpoints
angular.module('tickets').factory('Tickets', ['$resource',
	function($resource) {
		return $resource('api/tickets/:ticketId', { ticketId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);