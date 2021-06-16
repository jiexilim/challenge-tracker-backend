const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			required: true
		},
		notes: {
			type: String,
			trim: true,
		},
		isCompleted: {
			type: Boolean,
			default: false,
			require: true,
		},
		goalId: {
			type: String,
			required: true
		},

		// field for single task
		endDate: {
			type: Date,
			default: Date.now,
		},
		subtasks: {
			type: Array
		},

		//field for recurring task
		dates: {
			type: [Date]
		},
		numCompleted: {
			type: Number,
			default: 0
		},
		computeRecurDatesInfo: {
			type: Map
		}
	},
	{
		timestamps: true,
	},
	{
		collection: 'tasks'
	}
);

const Task = mongoose.model('Task', taskSchema)

module.exports = Task