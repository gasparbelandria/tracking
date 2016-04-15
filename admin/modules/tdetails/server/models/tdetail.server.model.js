'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tdetail Schema
 */
var TdetailSchema = new Schema({
	ticket: {
		type: String,
		default: '',
		required: 'Please fill Ticket',
		trim: true
	},
	note: {
		type: String,
		default: '',
		required: 'Please fill Note',
		trim: true
	},
	status: {
		type: String,
		default: '',
		required: 'Please fill Status',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId
	}
});

mongoose.model('Tdetail', TdetailSchema);
