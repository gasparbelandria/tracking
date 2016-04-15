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
	name: {
		type: String,
		default: '',
		required: 'Please fill Ticket name',
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




