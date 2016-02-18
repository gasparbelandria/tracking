'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
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
	password: {
		type: String,
		default: '',
		required: 'Please fill Tracking user password',
		trim: true
	},
	phone: {
		type: String,
		default: '',
		required: false,
		trim: true
	},
	cellphone: {
		type: String,
		default: '',
		required: false,
		trim: true
	},
	fax: {
		type: String,
		default: '',
		required: false,
		trim: true
	},
	address:{
		street: {
			type: String,
			default: '',
			required: false,
			trim: true
		},
		city: {
			type: String,
			default: '',
			required: false,
			trim: true
		},
		state: {
			type: String,
			default: '',
			required: false,
			trim: true
		},
		zip: {
			type: String,
			default: '',
			required: false,
			trim: true
		},
		country: {
			type: String,
			default: '',
			required: false,
			trim: true
		}
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Customer', CustomerSchema);
