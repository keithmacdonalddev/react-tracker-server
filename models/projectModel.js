import mongoose from 'mongoose';

console.log('accessing ticketModel.js file'.file);

const projectSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
		},
		assignee: {
			type: Array,
		},
		owner: {
			id: { type: mongoose.Schema.Types.ObjectId },
			firstName: { type: String },
			lastName: { type: String },
		},
		tickets: {
			type: Array,
		},
	},
	{
		timestamps: true, // mongoose allows a second argument of options, 'timestamps' auto populates fields: 'created at' & 'updated at'
	},
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
