'use strict';

(function() {
	// Tracking users Controller Spec
	describe('Tracking users Controller Tests', function() {
		// Initialize global variables
		var TrackingUsersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Tracking users controller.
			TrackingUsersController = $controller('TrackingUsersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Tracking user object fetched from XHR', inject(function(TrackingUsers) {
			// Create sample Tracking user using the Tracking users service
			var sampleTrackingUser = new TrackingUsers({
				name: 'New Tracking user'
			});

			// Create a sample Tracking users array that includes the new Tracking user
			var sampleTrackingUsers = [sampleTrackingUser];

			// Set GET response
			$httpBackend.expectGET('api/tracking-users').respond(sampleTrackingUsers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.trackingUsers).toEqualData(sampleTrackingUsers);
		}));

		it('$scope.findOne() should create an array with one Tracking user object fetched from XHR using a trackingUserId URL parameter', inject(function(TrackingUsers) {
			// Define a sample Tracking user object
			var sampleTrackingUser = new TrackingUsers({
				name: 'New Tracking user'
			});

			// Set the URL parameter
			$stateParams.trackingUserId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/tracking-users\/([0-9a-fA-F]{24})$/).respond(sampleTrackingUser);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.trackingUser).toEqualData(sampleTrackingUser);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(TrackingUsers) {
			// Create a sample Tracking user object
			var sampleTrackingUserPostData = new TrackingUsers({
				name: 'New Tracking user'
			});

			// Create a sample Tracking user response
			var sampleTrackingUserResponse = new TrackingUsers({
				_id: '525cf20451979dea2c000001',
				name: 'New Tracking user'
			});

			// Fixture mock form input values
			scope.name = 'New Tracking user';

			// Set POST response
			$httpBackend.expectPOST('api/tracking-users', sampleTrackingUserPostData).respond(sampleTrackingUserResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Tracking user was created
			expect($location.path()).toBe('/tracking-users/' + sampleTrackingUserResponse._id);
		}));

		it('$scope.update() should update a valid Tracking user', inject(function(TrackingUsers) {
			// Define a sample Tracking user put data
			var sampleTrackingUserPutData = new TrackingUsers({
				_id: '525cf20451979dea2c000001',
				name: 'New Tracking user'
			});

			// Mock Tracking user in scope
			scope.trackingUser = sampleTrackingUserPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/tracking-users\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/tracking-users/' + sampleTrackingUserPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid trackingUserId and remove the Tracking user from the scope', inject(function(TrackingUsers) {
			// Create new Tracking user object
			var sampleTrackingUser = new TrackingUsers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Tracking users array and include the Tracking user
			scope.trackingUsers = [sampleTrackingUser];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/tracking-users\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTrackingUser);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.trackingUsers.length).toBe(0);
		}));
	});
}());
