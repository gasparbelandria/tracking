'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	category: {
		type: String,
		default: '',
		required: 'Please fill Category',
		trim: true
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill Product name',
		trim: true
	},
	image: {
		type: String,
		default: '',
		required: 'Please fill Image',
		trim: true
	},
	url: {
		type: String,
		default: '',
		required: 'Please fill Url',
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

mongoose.model('Product', ProductSchema);
