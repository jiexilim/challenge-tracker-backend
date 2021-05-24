const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const targetSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		endDate: {
            type: Date,
            default: Date.now,
            min: Date.now,
        },
		goalId: {
			type: String,
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
		collection: 'targets'
	}
);

const Target = mongoose.model('Target', targetSchema);

module.exports = Target;