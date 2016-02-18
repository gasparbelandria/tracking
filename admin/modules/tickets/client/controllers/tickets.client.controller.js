'use strict';

// Tickets controller
angular.module('tickets').controller('TicketsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tickets',
	function($scope, $stateParams, $location, Authentication, Tickets ) {
		$scope.authentication = Authentication;

		// Create new Ticket
		$scope.create = function() {
			// Create new Ticket object
			var ticket = new Tickets ({
				name: this.name
			});

			// Redirect after save
			ticket.$save(function(response) {
				$location.path('tickets/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ticket
		$scope.remove = function( ticket ) {
			if ( ticket ) { ticket.$remove();

				for (var i in $scope.tickets ) {
					if ($scope.tickets [i] === ticket ) {
						$scope.tickets.splice(i, 1);
					}
				}
			} else {
				$scope.ticket.$remove(function() {
					$location.path('tickets');
				});
			}
		};

		// Update existing Ticket
		$scope.update = function() {
			var ticket = $scope.ticket ;

			ticket.$update(function() {
				$location.path('tickets/' + ticket._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tickets
		$scope.find = function() {
			$scope.tickets = Tickets.query();
		};

		// Find existing Ticket
		$scope.findOne = function() {
			$scope.ticket = Tickets.get({ 
				ticketId: $stateParams.ticketId
			});
		};
	}
]);