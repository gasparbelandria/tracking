'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tracking user Schema
 */
var TrackingUserSchema = new Schema({
	_id: {
		type: String,
		default: '',
		trim: true
	},
	className: {
		type: String,
		default: 'com.solidworks.launchpad.mongo.schema.User',
		trim: true
	},
	login: {
		loginId: {
			type: String,
			default: '',
			required: 'Please fill Tracking user email',
			trim: true
		},
		password: {
			type: String,
			default: '',
			required: 'Please fill Tracking user password',
			trim: true
		},
		type: {
			type: String,
			default: 'email',
			required: 'Please fill Tracking user email',
			trim: true
		},
		varCode: {
			type: String,
			default: '',
			trim: true
		}
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill Tracking user name',
		trim: true
	}
});

mongoose.model('User', TrackingUserSchema);
