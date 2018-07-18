const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

// Create Schema
const TrackingSchema = new Schema({
	trackingNumber: {
		type: String,
		required: true,
		unique: true
	},
	data: {
		type: Object,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});
TrackingSchema.plugin(mongoosePaginate);

module.exports = Tracking = mongoose.model('tracking', TrackingSchema);
