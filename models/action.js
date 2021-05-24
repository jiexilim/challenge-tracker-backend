const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actionSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		date: {
            type: String,
            // default: Date.now,
            // min: Date.now,
        },
		targetId: {
			type: String,
			required: true
		},
		index: {
			type: Number,
			required: true
		},
        isCompleted: {
            type: Boolean,
            default: false,
        }
	},
	{
		timestamps: true,
	},
	{
		collection: 'actions'
	}
);

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;