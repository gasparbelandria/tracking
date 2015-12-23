'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Tracking users Permissions
 */
exports.invokeRolesPolicies = function() {
	acl.allow([{
		roles: ['admin'],
		allows: [{
			resources: '/api/tracking-users',
			permissions: '*'
		}, {
			resources: '/api/tracking-users/:trackingUserId',
			permissions: '*'
		}]
	}, {
		roles: ['user'],
		allows: [{
			resources: '/api/tracking-users',
			permissions: ['get', 'post']
		}, {
			resources: '/api/tracking-users/:trackingUserId',
			permissions: ['get']
		}]
	}, {
		roles: ['guest'],
		allows: [{
			resources: '/api/tracking-users',
			permissions: ['get']
		}, {
			resources: '/api/tracking-users/:trackingUserId',
			permissions: ['get']
		}]
	}]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function(req, res, next) {
	var roles = (req.user) ? req.user.roles : ['guest'];

	// If an trackingUser is being processed and the current user created it then allow any manipulation
	// TODO it posibble that when a module is generated do this conditional, but, I think is not neccesary now.
	//if (req.trackingUser && req.user && req.trackingUser.user.id === req.user.id) {
	//	return next();
	//}

	// Check for user roles
	acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function(err, isAllowed) {
		if (err) {
			// An authorization error occurred.
			return res.status(500).send('Unexpected authorization error');
		} else {
			if (isAllowed) {
				// Access granted! Invoke next middleware
				return next();
			} else {
				return res.status(403).json({
					message: 'User is not authorized'
				});
			}
		}
	});
};
