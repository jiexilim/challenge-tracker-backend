const mongoose = require('mongoose')

const Schema = mongoose.Schema

const goalSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		benefit: {
			type: String,
			trim: true,
		},
		endDate: {
			type: Date,
			default: Date.now,
			min: Date.now,
		},
		notes: {
			type: String,
			trim: true,
		},
		tags: {
			type: Array
		},
		userId: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
	},
	{
		collection: 'goals'
	}
);

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal