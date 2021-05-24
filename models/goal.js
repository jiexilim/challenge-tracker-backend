const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
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

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;