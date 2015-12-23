'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	TrackingUser = mongoose.model('User'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Tracking user
 */
exports.create = function(req, res) {
	var trackingUser = new TrackingUser(req.body);
	trackingUser.user = req.user;

	trackingUser.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trackingUser);
		}
	});
};

/**
 * Show the current Tracking user
 */
exports.read = function(req, res) {
	res.jsonp(req.trackingUser);
};

/**
 * Update a Tracking user
 */
exports.update = function(req, res) {
	var trackingUser = req.trackingUser ;

	trackingUser = _.extend(trackingUser , req.body);

	trackingUser.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trackingUser);
		}
	});
};

/**
 * Delete an Tracking user
 */
exports.delete = function(req, res) {
	var trackingUser = req.trackingUser ;

	trackingUser.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trackingUser);
		}
	});
};

/**
 * List of Tracking users
 */
exports.list = function(req, res) { TrackingUser.find().sort('-created').populate('user', 'displayName').exec(function(err, trackingUsers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trackingUsers);
		}
	});
};

/**
 * Tracking user middleware
 */
exports.trackingUserByID = function(req, res, next, _id) { TrackingUser.findById(_id).populate('user', 'displayName').exec(function(err, trackingUser) {
		if (err) return next(err);
		if (! trackingUser) return next(new Error('Failed to load Tracking user ' + _id));
		req.trackingUser = trackingUser ;
		next();
	});
};
