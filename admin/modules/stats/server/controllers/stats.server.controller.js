'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Stat = mongoose.model('Stat'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Stat
 */
exports.create = function(req, res) {
	var stat = new Stat(req.body);
	stat.user = req.user;

	stat.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stat);
		}
	});
};

/**
 * Show the current Stat
 */
exports.read = function(req, res) {
	res.jsonp(req.stat);
};

/**
 * Update a Stat
 */
exports.update = function(req, res) {
	var stat = req.stat ;

	stat = _.extend(stat , req.body);

	stat.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stat);
		}
	});
};

/**
 * Delete an Stat
 */
exports.delete = function(req, res) {
	var stat = req.stat ;

	stat.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stat);
		}
	});
};

/**
 * List of Stats
 */
exports.list = function(req, res) { Stat.find().sort('-created').populate('user', 'displayName').exec(function(err, stats) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stats);
		}
	});
};

/**
 * Stat middleware
 */
exports.statByID = function(req, res, next, id) { Stat.findById(id).populate('user', 'displayName').exec(function(err, stat) {
		if (err) return next(err);
		if (! stat) return next(new Error('Failed to load Stat ' + id));
		req.stat = stat ;
		next();
	});
};