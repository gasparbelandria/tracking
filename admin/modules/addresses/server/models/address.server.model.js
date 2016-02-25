'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Address Schema
 */
var AddressSchema = new Schema({
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
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId
		//,
		//ref: 'User'
	}
});

mongoose.model('Address', AddressSchema);
