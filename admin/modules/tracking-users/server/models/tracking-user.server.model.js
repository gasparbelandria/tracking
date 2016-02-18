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
	firstname: {
		type: String,
		default: '',
		required: 'Please fill Tracking user firstname',
		trim: true
	},
	lastname: {
		type: String,
		default: '',
		required: 'Please fill Tracking user lastname',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill Tracking user email',
		trim: true
	},
	phone: {
		type: String,
		default: '',
		required: 'Please fill Tracking user phone',
		trim: true
	},
	cellphone: {
		type: String,
		default: '',
		required: 'Please fill Tracking user firstname',
		trim: true
	},
	fax: {
		type: String,
		default: '',
		required: 'Please fill Tracking user fax',
		trim: true
	},
	address:{
		street: {
			type: String,
			default: '',
			required: 'Please fill Tracking user street',
			trim: true
		},
		city: {
			type: String,
			default: '',
			required: 'Please fill Tracking user city',
			trim: true
		},
		state: {
			type: String,
			default: '',
			required: 'Please fill Tracking user state',
			trim: true
		},
		zip: {
			type: String,
			default: '',
			required: 'Please fill Tracking user zip',
			trim: true
		},
		country: {
			type: String,
			default: '',
			required: 'Please fill Tracking user country',
			trim: true
		}
	}
});

mongoose.model('User', TrackingUserSchema);
