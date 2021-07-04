import mongoose from 'mongoose';

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
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			firstName: {
				type: String,
				ref: 'User',
			},
			lastName: {
				type: String,
				ref: 'User',
			},
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
