'use strict';

// Tracking users controller
angular.module('tracking-users').controller('TrackingUsersController', ['$scope', '$stateParams', '$location', 'Authentication', 'TrackingUsers',
	function($scope, $stateParams, $location, Authentication, TrackingUsers ) {
		$scope.authentication = Authentication;

		// Create new Tracking user
		$scope.create = function() {
			// Create new Tracking user object
			var trackingUser = new TrackingUsers ({
				name: this.name
			});

			// Redirect after save
			trackingUser.$save(function(response) {
				$location.path('tracking-users/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Tracking user
		$scope.remove = function( trackingUser ) {
			if ( trackingUser ) { trackingUser.$remove();

				for (var i in $scope.trackingUsers ) {
					if ($scope.trackingUsers [i] === trackingUser ) {
						$scope.trackingUsers.splice(i, 1);
					}
				}
			} else {
				$scope.trackingUser.$remove(function() {
					$location.path('tracking-users');
				});
			}
		};

		// Update existing Tracking user
		$scope.update = function() {
			var trackingUser = $scope.trackingUser ;

			trackingUser.$update(function() {
				$location.path('tracking-users/' + trackingUser._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tracking users
		$scope.find = function() {
			$scope.trackingUsers = TrackingUsers.query();
		};

		// Find existing Tracking user
		$scope.findOne = function() {
			$scope.trackingUser = TrackingUsers.get({
				trackingUserId: $stateParams.trackingUserId
			});
		};
	}
]);
