const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actionSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
        dueDate: {
            type: Date,
            default: Date.now,
            min: Date.now,
        },
		description: {
			type: String,
		},
        toAchieve: {
            type: String,
        }
	},
	{
		timestamps: true,
	},
);

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;