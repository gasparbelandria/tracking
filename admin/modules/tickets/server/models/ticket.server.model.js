'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ticket Schema
 */
var TicketSchema = new Schema({
	number: {
		type: String,
		default: '',
		required: 'Please fill Number',
		trim: true
	},
	address: {
		type: String,
		default: '',
		required: 'Please fill Address',
		trim: true
	},
	items: {
		type: String,
		default: '',
		required: 'Please fill Items',
		trim: true
	},
	price: {
		type: String,
		default: '',
		required: 'Please fill Items',
		trim: true
	},
	tax: {
		type: String,
		default: '',
		required: 'Please fill Items',
		trim: true
	},
	discount: {
		type: String,
		default: '',
		required: 'Please fill Items',
		trim: true
	},
	eta: {
		type: String,
		default: '',
		required: 'Please fill Items',
		trim: true
	},
	percent: {
		type: String,
		default: '',
		required: 'Please fill Items',
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

mongoose.model('Ticket', TicketSchema);

//title
//description
//addressId
//carId or packageId
//rate
//status (open, close, re-open)
//transport (aerea, terrestre, maritima)
//eta
//percent
//fragile




