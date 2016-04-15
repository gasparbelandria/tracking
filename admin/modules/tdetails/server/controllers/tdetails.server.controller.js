'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Tdetail = mongoose.model('Tdetail'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Tdetail
 */
exports.create = function(req, res) {
	var tdetail = new Tdetail(req.body);
	tdetail.user = req.user;

	tdetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tdetail);
		}
	});
};

/**
 * Show the current Tdetail
 */
exports.read = function(req, res) {
	res.jsonp(req.tdetail);
};

/**
 * Update a Tdetail
 */
exports.update = function(req, res) {
	var tdetail = req.tdetail ;

	tdetail = _.extend(tdetail , req.body);

	tdetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tdetail);
		}
	});
};

/**
 * Delete an Tdetail
 */
exports.delete = function(req, res) {
	var tdetail = req.tdetail ;

	tdetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tdetail);
		}
	});
};

/**
 * List of Tdetails
 */
exports.list = function(req, res) { Tdetail.find().sort('-created').populate('user', 'displayName').exec(function(err, tdetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tdetails);
		}
	});
};

/**
 * Tdetail middleware
 */
exports.tdetailByID = function(req, res, next, id) { Tdetail.findById(id).populate('user', 'displayName').exec(function(err, tdetail) {
		if (err) return next(err);
		if (! tdetail) return next(new Error('Failed to load Tdetail ' + id));
		req.tdetail = tdetail ;
		next();
	});
};